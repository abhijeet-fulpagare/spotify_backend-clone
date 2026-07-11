const express = require('express')
const { uploadMusic } = require("../controllers/music.controller")
const multer = require('multer');

const upload = multer({storage:multer.memoryStorage()})


const router = express.Router();



router.post("/upload",upload.single("Music_file") ,uploadMusic)

module.exports = router;