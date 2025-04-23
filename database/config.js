const mongoose = require('mongoose');

// const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function dbConnection() {
    try {
        // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
        await mongoose.connect(process.env.DB_CONNECT);
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (error) {
        console.log(error);
        throw mongoose.Error;
    }
}
dbConnection().catch(console.dir);

module.exports = {
    dbConnection
}