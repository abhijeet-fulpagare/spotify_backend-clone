const {uploadImage} = require("../services/storage.service")
const musicModel = require("../models/music.model")
const albumModel = require("../models/album.model");

const uploadMusic = async (req, res) => {


    const { title } = req.body;
    const file = req.file;
    const user = req.user.id;

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
            artist: user
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

const CreateAlbum = async (req, res) => {
    const user = req.user.id;
    const { title, musics } = req.body;

    if (!title) {
        return res.status(400).json({
            message: "Title is required"
        });
    }

    try {
        const album = await albumModel.create({
            title,
            musics,
            artist: user
        });

        return res.status(201).json({
            message: "Album created successfully",
            album
        });
    } catch (e) {
        console.error(e);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

module.exports = { uploadMusic, CreateAlbum }