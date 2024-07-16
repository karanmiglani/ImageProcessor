const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Mongo db connecte at ${conn.connection.host}`);
    }catch(err){
        console.log(`Error connection mongo db: ${err.message}`);
        process.exit(1);
    }
}


module.exports = connectDB;