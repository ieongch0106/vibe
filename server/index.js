import express from 'express';
import { readFile, writeFile } from 'fs/promises';
import logger from 'morgan';

const USER_FILE = './database/user.json';

// Returns a function that will read an user file.
function readUserFile(path) {
  return async () => {
    try {
      const userFile = await readFile(path, 'utf8');
      const users = JSON.parse(userFile);
      return users;
    } catch (error) {
      // Likely the file doesn't exist
      return [];
    }
  };
}

// Create functions for reading from files.
const readUser = readUserFile(USER_FILE);

//check if an user has already existed
async function userExist(Username) {
    const users = await readUser();
    for (const user of users) {
        if (user.id === Username) {
            return true
        }
    }
    return false
}

// a function that will save the current user file.
function saveCurrentFile(path, file) {
    writeFile(path, JSON.stringify(file), 'utf8');
}

// Returns a function that will save and add a profile to an user file.
function saveToUserFile(path) {
  return async (id, password ) => {
    const data = { id, password };
    const users = await readUser();
    users.push(data);
    writeFile(path, JSON.stringify(users), 'utf8');
  };
}

// Create functions for saving to user file.
const saveUser = saveToUserFile(USER_FILE);

async function verifyUser(Username, Password) {
    const users = await readUser()
    for (const user of users) {
        if (user.id === Username) {
            if (user.password === Password) {
                return 200
            } else {
              return 401
            }
        }
    }
    return 404
}

async function addZipCode(Username, zipcode) {
  let index = 0
  const users = await readUser()
  for (const user of users) {
    if (user.id === Username) {
      users[index]['zipcode'] = zipcode
    }
    ++index
  }
  saveCurrentFile(USER_FILE, users)
}

// Create the Express app and set the port number.
const app = express();
const port = 5000;

// Add Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(logger('dev'));
app.use('/client', express.static('client'));

app.post('/user/register', async (req, res) => {
  const data = req.query;
  const check = await userExist(data.id);
  if (!check) {
      await saveUser(data.id, data.password);
      res.status(200).json({'Status': 'Success'});
  } else {
      res.status(409).json({'Error': 'Conflict'});
  }
});

app.get('/login', async (req, res) => {
  const data = req.query;
  const result = await verifyUser(data.id, data.password)
  if (result === 200) {
    res.status(200).json({'Status': 'Success'})
  } else if (result === 401) {
      res.status(401).json({'Error': 'Unauthorized'})
  } else {
      res.status(404).json({'Error': 'User Not Found'})
  }
});

app.post('/user/profile/zipcode/new', async (req, res) => {
  const data = req.query;
  await addZipCode(data.id, data.zipcode)
  res.status(200).json({'Status': 'Success'})
});

// This matches all routes that are not defined.
app.all('*', async (request, response) => {
  response.status(404).send(`Not found: ${request.path}`);
});

// Start the server.
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});