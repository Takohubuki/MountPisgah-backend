const MongoClient = require('mongodb');

class MongoUtils {
  constructor() {
    this.uri = uri;
    this.dbname = dbname;
    this.client = new MongoClient(this.uri, { useNewUrlParser: true, useUnifiedTopology: true })
  }

  async getCollection(collection_name) {
    try {
        const collection = this.db.collection(collection_name);
        console.log(`Retrieved collection: ${collection}`);
        return collection;
    } catch (e) {
        console.error(`Failed to retrieve collection: ${e}`);
        throw e;
    }
  }

  async connect() {
    try {
        await this.client.connect();
        console.log('Connected to MongoDB');
        this.db = this.client.db(this.dbname);
    } catch (e) {
        console.error('Failed to connect MongoDB', e);
        throw e;
    }
  }

  async close() {
    try {
        await this.client.close();
        console.log('Closed MongoDB connection');
    } catch (e) {
        console.error('Failed to close MongoDB connection', e);
        throw e
    }
  }

  async insertOne(collection_name, document) {
    try {
        const collection = this.getCollection(collection_name);
        const result = await collection.insertOne(document);
        console.log(`Inserted document with _id: ${result.insertedId}`);
        return result.insertedId;
    } catch (e) {
        console.error(`Failed to insert document: ${e}`);
        throw e;
    }
  }

  async find(collection_name, query, options = {}) {
    try {
        const collection = this.getCollection(collection_name);
        const result = await collection.find(query, options).toArray();
        console.log(`Found documents: ${result}`);
        return result;
    } catch (e) {
        console.error(`Failed to find documents: ${e}`);
        throw e;
    }
  }

  async updateOne(collection_name, filter, updateDoc, options = {}) {
    try {
        const collection = this.getCollection(collection_name);
        const result = await collection.updateOne(filter, updateDoc, options);
        console.log(`Updated document: ${result}`);
        return result.modifiedCount;
    } catch (e) {
        console.error(`Failed to update document: ${e}`);
        throw e;
    }
  }

  async deleteOne(collection_name, filter, options = {}) {
    try {
        const collection = this.getCollection(collection_name);
        const result = await collection.deleteOne(filter, options);
        console.log(`Deleted document: ${result}`);
        return result.deletedCount;
    } catch (e) {
        console.error(`Failed to delete document: ${e}`);
        throw e;
    }
  }
}

export default MongoUtils;