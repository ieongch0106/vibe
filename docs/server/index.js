import 'dotenv/config';
import express from 'express';
import expressSession from 'express-session';
import users from './users.js';
import auth from './auth.js';
import logger from 'morgan';
import { fileURLToPath } from 'url';
import { VibeDatabase } from './user-db.js';
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
        res.redirect('html/location.html');
      } else {
        res.redirect('/register');
      }
    });

    this.app.post('/register', (req, res) => {
      const { username, password } = req.body;
      if (users.addUser(username, password)) {
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

    this.app.get('*', (req, res) => {
      res.send('Error');
    });
  }

  async initDb() {
    this.db = new VibeDatabase(this.dburl);
    await this.db.connect();
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