import 'dotenv/config';
import { MongoClient, ServerApiVersion } from 'mongodb';

export class VibeDatabase {
    constructor(dburl) {
        this.dburl = dburl;
    }

    async connect() {
        this.client = await MongoClient.connect(this.dburl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverApi: ServerApiVersion.v1,
        });

        this.db = this.client.db('Vibe');

        await this.init();
    }

    async init() {
        this.user = this.db.collection('user');
    }

    async close() {
        this.client.close();
    }

    async addUser(id, username, password) {
        if (!this.userExist(username)) {
            await this.user.insertOne({_id: id, username, password});
            return '200';
        } else {
            return '409';
        }
    }

    async verifyUser(name, password) {
        const res = await this.user.find().sort({username: name}).toArray();
        if (res.length == 0) {
            return '404';
        } else {
            if (res.password == password) {
                return '200';
            } else {
                return '401';
            }
        }
    }

    async userExist(name) {
        const res = await this.user.find().sort({username: name}).toArray();
        if (res.length != 0) {
            return false;
        } else {
            return true;
        }
    }
}