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
        this.collection = this.db.collection('songList');
    }

    async close() {
        this.client.close();
    }

    async addUser(id, username, password) {
        if (!this.songExist(username)) {
            await this.collection.insertOne({_id: id, username, password});
            return '200';
        } else {
            return '409';
        }
    }

    async songExist(name) {
        const res = await this.collection.find().sort({_id: id, name: name}).toArray();
        if (res.length != 0) {
            return false;
        } else {
            return true;
        }
    }

    async addSong(name, likes) {
        if (!this.songExist(name)) {
            await this.collection.insertOne({_id: id, name: name, likes: likes});
            return '200';
        } else {
            return '409';
        }
    }

    async update(name, likes){
        if (!this.songExist(name)) {
            await this.collection.updateOne({id: id, likes: likes});
            return '200';
        } else {
            return '409';
        }
    }

}