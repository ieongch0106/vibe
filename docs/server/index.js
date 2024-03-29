import 'dotenv/config';
import express from 'express';
import expressSession from 'express-session';
import users from './users.js';
import auth from './auth.js';
import logger from 'morgan';
import { fileURLToPath } from 'url';
import { VibeDatabase } from './user-db.js';
import { VibeDatabaseParty } from './party-db.js';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(dirname(__filename));

const sessionConfig = {
  secret: process.env.SECRET || 'SECRET',
  resave: false,
  saveUninitialized: false,
};


function checkLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/client/index.html');
  }
}

class VibeServer {
  constructor(dburl) {
    this.dburl = dburl;
    this.app = express();
    this.app.use(logger('dev'));
    this.app.use(express.static('client'));
    this.app.use(expressSession(sessionConfig));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    auth.configure(this.app);
  }

  async initRoutes() {
    // Note: when using arrow functions, the "this" binding is lost.
    const self = this;

    this.app.get('/', checkLoggedIn, (req, res) => {
      res.send('hello world');
    });

    this.app.get('/login', (req, res) => {
      res.sendFile('/client/index.html', { root: __dirname })
    });

    this.app.post(
      '/login',
      auth.authenticate('local', {
        successRedirect: '/private',
        failureRedirect: '/login',
      })
    );

    this.app.post('/register', (req, res) => {
      const { username, password } = req.body;
      if (users.addUser(username, password)) {
        this.db.addUser(username, password);
        res.redirect('html/location.html');
      } else {
        res.redirect('/register');
      }
    });

    this.app.get('/register', (req, res) => {
      res.sendFile('client/html/signup.html', { root: __dirname })
    });
  
    this.app.get(
      '/private',
      checkLoggedIn,
      (req, res) => {
        res.redirect('html/home.html');
      }
    );

    this.app.post('/user/profile/zipcode/new', async (req, res) => {
      const data = req.query;
      console.log(data)
      await this.db.addZipCode(data.username, data.zipcode)
      res.status(200).json({ 'Status': 'Success' })
    });
    
    this.app.get('/home', async (req, res) => {
      const parties = await this.dbParty.readParties();
      res.status(200).json(parties);
    });
    
    this.app.get('/myinfo', async (req, res) => {
      // let un = window.localStorage.getItem('username');
      const user = await this.db.readUser();
      res.status(200).json(user);

    });
    
    this.app.get('/search', async (req, res) => {
      const data = req.query;
      const parties = await this.dbParty.searchParties(data.name);
      res.status(200).json(parties);
    });
    
    this.app.post('/user/host', async (req, res) => {
      const data = req.query;
      await this.dbParty.addParty(data.name, data.zip, data.description);
      res.status(200).json({ 'Status': 'Success' });
    });

    this.app.post('/songRequest', async (req, res) => {
      try {
        const { name, likes } = req.query;
        const newSong = await this.db.addSong(name, likes);
        res.status(200).send(newSong);
      } catch (err) {
        res.status(500).send(err);
      }
    });

    this.app.post('/UpdateLikes', async (req, res) => {
      try {
        const { name, likes } = req.query;
        const newSong = await this.db.update(name, likes);
        res.status(200).send(newSong);
      } catch (err) {
        res.status(500).send(err);
      }
    });

    this.app.get('/song', async (req, res) => {
      try {
        const { username, password } = req.query;
        const result = await self.db.verifyUser(username, password);
        const data = await this.db.addSong(result);
        if (result === '200') {
            // res.status(200).json({ 'Status': 'Success' });
            result.status(200).send(data);

        } else if (result === 401) {
            res.status(401).json({ 'Error': 'Unauthorized' });
        } else {
            res.status(404).json({ 'Error': 'User Not Found' });
        }
      } catch (err) {
        res.status(500).send(err);
      }
    });
    
    // This matches all routes that are not defined.
    this.app.all('*', async (request, response) => {
      response.status(404).send(`Not found: ${request.path}`);
    });
  }

  async initDb() {
    this.db = new VibeDatabase(this.dburl);
    await this.db.connect();
    this.dbParty = new VibeDatabaseParty(this.dburl);
    await this.dbParty.connect();
  }

  async start() {
    await this.initRoutes();
    await this.initDb();
    const port = process.env.PORT || 3000;
    this.app.listen(port, () => {
      console.log(`VibeServer listening on port ${port}!`);
    });
  }
}

const server = new VibeServer(process.env.DATABASE_URL);
server.start();

