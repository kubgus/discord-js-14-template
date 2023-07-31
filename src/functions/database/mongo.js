require("dotenv").config();
const mongoURI = process.env.MONGO_URI;

const { connect } = require("mongoose");

module.exports = async (client) => {
    client.connectMongo = async () => {
        (async () => {
            await connect(mongoURI).catch(error => { console.error(`🌋 Error occurred while connecting to MongoDB: ${error}.`); });
        })();
    }
}