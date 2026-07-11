const jwt = require("jsonwebtoken")
const {uploadImage} = require("../services/storage.service")
const musicModel = require("../models/music.model")


const uploadMusic = async (req, res) => {

    const token = req.cookies.token;
    let user_id;
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized. Token not found."
        });
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        if (decode.role !== "artist")
        {
            return res.status(403).json({
                message:"Forbidden"
            })
        }
        user_id = decode.id;
    }
    catch (e) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }


    const { title } = req.body;
    const file = req.file;

    if (!file) {
        return res.status(400).json({
            message: "Music file is required"
        });
    }


    try {
        const uploadResult = await uploadImage(file);

        const music = await musicModel.create({
            title,
            uri: uploadResult.url,
            artist: user_id
        });

        return res.status(201).json({
            message: "Music uploaded successfully",
            music: {
                title: title,
                uri:music.uri
            }
        });
    } catch (e) {
        console.error(e);

        return res.status(500).json({
            message: "Failed to upload music"
        });
    }
}

module.exports = {uploadMusic}