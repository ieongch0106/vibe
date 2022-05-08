import express from 'express';
import { VibeDatabase } from './song-db.js';

class VibeServer {
  constructor(dburl) {
    this.dburl = dburl;
    this.app = express();
    this.app.use('/', express.static('client'));
  }

  async initRoutes() {
    // Note: when using arrow functions, the "this" binding is lost.
    const self = this;
    
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
<<<<<<< HEAD
    
    this.app.get('/myinfo', async (req, res) => {
      // let un = window.localStorage.getItem('username');
      const user = await this.db.readUser();
      res.status(200).json(user);
=======
>>>>>>> 77fcb66be917e7697b676eb43928af95fc8701f5

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