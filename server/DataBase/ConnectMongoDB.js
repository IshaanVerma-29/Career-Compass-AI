const mongoose = require('mongoose')
require("dotenv").config()

async function connectMongoDB() {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log("Connected to MongoDB🚀")
    }
    catch {
        (err => {
            console.log("Connection to MongoDB Failed😵", err)
        })
    }
}

module.exports = connectMongoDB