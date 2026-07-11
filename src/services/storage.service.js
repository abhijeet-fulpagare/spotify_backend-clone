const ImageKit = require("@imagekit/nodejs");

const client = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

const uploadImage = async (file) => {
    const result = await client.files.upload({
        file: file.buffer.toString("base64"),
        fileName: file.originalname,
        folder: "/songs",
    });

    return result;
};

module.exports = { uploadImage };