const mongoose = require('mongoose');
async function clearDB() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/hastmilap');
        const db = mongoose.connection.db;
        await db.collection('contents').deleteOne({ section: 'news' });
        await db.collection('contents').deleteOne({ section: 'sustainability' });
        console.log('Cleared news and sustainability from DB');
        mongoose.disconnect();
    } catch (e) {
        console.error('DB Error:', e);
    }
}
clearDB();
