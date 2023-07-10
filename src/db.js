import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const url = process.env.DATABASE_URL;

const mongoClient = new MongoClient(url);

await mongoClient.connect();
const db = mongoClient.db();

export default db;

