const mongoose = require('mongoose');
async function removeStylesFromDB() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/hastmilap');
        const db = mongoose.connection.db;
        await db.collection('contents').deleteOne({ section: 'styles' });
        console.log('Styles removed from database');
        mongoose.disconnect();
    } catch (e) {
        console.error('DB Error:', e);
    }
}
removeStylesFromDB();
