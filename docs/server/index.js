import express from 'express';
import { VibeDatabase } from './user-db.js';
import { VibeDatabaseParty } from './party-db.js';

class VibeServer {
  constructor(dburl) {
    this.dburl = dburl;
    this.app = express();
    this.app.use('/client/index.html', express.static('client'));
  }

  async initRoutes() {
    // Note: when using arrow functions, the "this" binding is lost.
    const self = this;

    this.app.post('/user/register', async (req, res) => {
      try {
        const { id, username, password } = req.query;
        const user = await self.db.addUser(id, username, password);
        res.status(200).json(user);
      } catch (err) {
        res.status(500).send(err);
      }
    });

    this.app.get('/login', async (req, res) => {
      try {
        const { username, password } = req.query;
        const result = await self.db.verifyUser(username, password);
        if (result === '200') {
            res.status(200).json({ 'Status': 'Success' });
        } else if (result === 401) {
            res.status(401).json({ 'Error': 'Unauthorized' });
        } else {
            res.status(404).json({ 'Error': 'User Not Found' });
        }
      } catch (err) {
        res.status(500).send(err);
      }
    });

    app.post('/user/profile/zipcode/new', async (req, res) => {
      const data = req.query;
      await this.db.addZipCode(data.id, data.zipcode)
      res.status(200).json({ 'Status': 'Success' })
    });
    
    app.get('/home', async (req, res) => {
      const parties = await this.dbParty.readParties();
      res.status(200).json(parties);
    });
    
    app.get('/myinfo', async (req, res) => {
      const user = await this.db.readUser();
      res.status(200).json(user);
    });
    
    app.get('/search', async (req, res) => {
      const parties = await this.dbParty.readParties();
      res.status(200).json(parties);
    });
    app.post('/user/host', async (req, res) => {
      const data = req.query;
      await this.dbParty.addParty(data.name, data.zip, data.description);
      res.status(200).json({ 'Status': 'Success' });
    });
    
    // This matches all routes that are not defined.
    app.all('*', async (request, response) => {
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