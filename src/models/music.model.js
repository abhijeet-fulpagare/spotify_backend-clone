const mongoose = require("mongoose")

const musicSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        
    },
    uri: {
        type: String,
        required:true
    },
    artist: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "users",
        required:true
    }
})

const musicModel = mongoose.model("spotify_music", musicSchema);

module.exports = musicModel;