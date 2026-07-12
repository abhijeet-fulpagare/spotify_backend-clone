const express = require('express')
const { uploadMusic, CreateAlbum, getMusic } = require("../controllers/music.controller")
const validUser = require('../middlewares/authUser.middleware')
const multer = require('multer');
const ckeckUserRole= require("../middlewares/auth.middleware")
const upload = multer({storage:multer.memoryStorage()})


const router = express.Router();



router.post("/upload", ckeckUserRole, upload.single("Music_file"), uploadMusic)
router.post("/create-album", ckeckUserRole, CreateAlbum);
router.get("/", validUser, getMusic);

module.exports = router;