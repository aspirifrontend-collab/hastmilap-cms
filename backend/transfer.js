const { MongoClient } = require('mongodb');

async function transferData() {
  const localUri = 'mongodb://127.0.0.1:27017/hastmilap-cms';
  const atlasUri = 'mongodb+srv://aspirifrontend_db_user:yY1isqSWBzVURgiN@hastmilapcluster.dapbqo0.mongodb.net/hastmilap-cms?appName=HastmilapCluster';

  console.log('Connecting to Local MongoDB...');
  const localClient = new MongoClient(localUri);
  await localClient.connect();
  const localDb = localClient.db();

  console.log('Connecting to Atlas MongoDB...');
  const atlasClient = new MongoClient(atlasUri);
  await atlasClient.connect();
  const atlasDb = atlasClient.db();

  // Get all collections from local DB
  const collections = await localDb.listCollections().toArray();
  
  for (let collInfo of collections) {
    const collName = collInfo.name;
    if (collName === 'system.profile') continue; // Skip system collections
    
    console.log(`Processing collection: ${collName}`);
    const localCollection = localDb.collection(collName);
    const atlasCollection = atlasDb.collection(collName);

    // Fetch all documents from local
    const documents = await localCollection.find({}).toArray();
    console.log(`  Found ${documents.length} documents.`);

    if (documents.length > 0) {
      // Clear existing data in Atlas for this collection to avoid duplicates?
      // Or just insert avoiding duplicate _id?
      // Let's clear it first so it's a clean transfer
      console.log(`  Clearing Atlas collection ${collName}...`);
      await atlasCollection.deleteMany({});
      
      console.log(`  Inserting to Atlas...`);
      await atlasCollection.insertMany(documents);
      console.log(`  Successfully transferred ${documents.length} documents into ${collName}.`);
    } else {
      console.log(`  Skipping empty collection ${collName}.`);
    }
  }

  console.log('Transfer complete!');
  await localClient.close();
  await atlasClient.close();
}

transferData().catch(console.error);
