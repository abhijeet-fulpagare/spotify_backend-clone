const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URL}\Spotify`);
        console.log("Database Connected Successfully")
    } catch (e)
    {
        console.log(e)
    }
}

module.exports = connectDB;