// WARNING: This file is essential to the bot's functionality. Do not modify it unless you know what you're doing.

require("dotenv").config();
const mongoURI = process.env.MONGO_URI;

const { connect } = require("mongoose");

// Defines the connectMongo function
module.exports = async (client) => {
    // Connects to MongoDB using the MONGO_URI environment variable
    client.connectMongo = async () => {
        (async () => await connect(mongoURI).catch(error => { console.error(`🌋 Error occurred while connecting to MongoDB: ${error}.`); }))();
    }
}