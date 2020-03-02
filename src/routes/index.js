const { Router } = require('express');
const router = Router();

const Photo = require('../models/Photo');
const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
const fs = require('fs-extra');

router.get('/', async (req, res) => {
    // res.send({ hakuna: 'matata' })
    const photos = await Photo.find();
    res.render('images', {photos});    
});

router.get('/images/add', async (req, res) => {
    const photos = await Photo.find();
    res.render('imageform', {photos});  
});

router.post('/images/add', async (req, res) => {
    const { title, description } = req.body;
    // console.log(req.file);
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    // console.log(result);
    const newPhoto = new Photo({
        title,
        description,
        imgUrl: result.secure_url,
        public_id: result.public_id
    });
    await newPhoto.save();
    await fs.unlink(req.file.path);
    // res.send('Received');
    res.redirect('/');
});

router.get('/images/delete/:yenka', async (req, res) => {
    const { yenka } = req.params;
    const photo = await Photo.findByIdAndDelete(yenka);
    const result = await cloudinary.v2.uploader.destroy(photo.public_id);
    console.log(result);    
    res.redirect('/images/add');
});

module.exports = router;