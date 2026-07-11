const express = require('express')
const { uploadMusic } = require("../controllers/music.controller")
const multer = require('multer');
const ckeckUserRole= require("../middlewares/auth.middleware")
const upload = multer({storage:multer.memoryStorage()})


const router = express.Router();



router.post("/upload",ckeckUserRole,upload.single("Music_file") ,uploadMusic)

module.exports = router;