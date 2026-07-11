const express = require('express')
const { uploadMusic, CreateAlbum } = require("../controllers/music.controller")
const multer = require('multer');
const ckeckUserRole= require("../middlewares/auth.middleware")
const upload = multer({storage:multer.memoryStorage()})


const router = express.Router();



router.post("/upload", ckeckUserRole, upload.single("Music_file"), uploadMusic)
router.post("/create-album", ckeckUserRole, CreateAlbum);

module.exports = router;