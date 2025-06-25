import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { MongoClient } from 'mongodb';
import { movies } from '../utils/data';

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('❌ MONGODB_URI is not defined in .env.local');
}

const client = new MongoClient(uri);

async function seed() {
  try {
    await client.connect();
    const db = client.db('movie-app');
    const collection = db.collection('movies');

    await collection.deleteMany({});
    const result = await collection.insertMany(movies);

    console.log(`✅ Seeded ${result.insertedCount} movies.`);
  } catch (err) {
    console.error('❌ Failed to seed movies:', err);
  } finally {
    await client.close();
  }
}

seed();
