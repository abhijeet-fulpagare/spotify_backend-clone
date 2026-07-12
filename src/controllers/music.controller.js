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


const getMusic = async (req, res) => {
    const data = await musicModel
        .find()
        .limit(10)
        .populate("artist");

    res.status(200).json({
        message: "Music data",
        data,
    });
};

const getAlbumTitle = async (req, res) => {
    const data = await albumModel
        .find()
        .select("title")
        .populate("musics");

    res.status(200).json({
        message: "Album data",
        data,
    });
};

const getAlbumById = async (req, res) => {
    try {
        const id = req.params.id;

        const data = await albumModel
            .findById(id)
            .populate("musics")
            .populate("artist");

        if (!data) {
            return res.status(404).json({
                message: "Album not found",
            });
        }

        res.status(200).json({
            message: "Album fetched successfully",
            data,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = { uploadMusic, CreateAlbum, getMusic, getAlbumTitle, getAlbumById }