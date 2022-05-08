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

    async addUser(username, password) {
        const check = await this.findUser(username);
        if (!check) {
            await this.user.insertOne({username, password});
            return true;
        } else {
            return false;
        }
    }

    async validatePassword(name, pwd) {
        const res = await this.user.find({username: name, password: pwd}).toArray();
        if (res.length !== 0) {
            return true;
        }
        return false;
    }

    async findUser(name) {
        const res = await this.user.find({username: name}).toArray();
        if (res.length !== 0) {
            return true;
        } else {
            return false;
        }
    }

    async addZipCode(name, zipCode) {
        console.log('hi')
        console.log(name, zipCode)
        const user = await this.user.find({username: name}).toArray();
        console.log(user)
        this.user.update({_id: user[0]._id}, {$set: {'zipcode': zipCode}});
        return user
    }

    async readUser() {
        return await this.user.find({}).toArray();
    }

    async close() {
        this.client.close();
    }
    async readProfile(name){
        return await this.user.find({username : name}).toArray();
    }
}