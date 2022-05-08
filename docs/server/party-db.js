import 'dotenv/config';
import { MongoClient, ServerApiVersion } from 'mongodb';

export class VibeDatabaseParty {
    constructor(dburl) {
        this.dburl = dburl;
    }

    async connect() {
        this.client = await MongoClient.connect(this.dburl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverApi: ServerApiVersion.v1,
        });

        this.db = await this.client.db('Vibe');

        await this.init();
    }

    async init() {
        this.party = await this.db.collection('party');
    }

    async close() {
        await this.client.close();
    }

    async addParty(name, zip, description) {
        await this.party.insertOne({ "name": name, "zip": zip, "description": description });
        return '200';
    }

    async readParties() {
        return await this.party.find({}).toArray();
    }

    async searchParties(name) {
        return await this.party.find({"name": name}).toArray();
    }
}