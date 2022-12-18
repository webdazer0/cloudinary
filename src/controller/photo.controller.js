const Photo = require("../models/Photo");
const fs = require("fs-extra");
const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getAll = async (req, res) => {
  const photos = await Photo.find().lean();
  res.render("images", { photos });
};

const getAllForm = async (req, res) => {
  const photos = await Photo.find().lean();
  res.render("imageform", { photos });
};

const create = async (req, res, next) => {
  const { title, description } = req.body;
  // console.log(req.file);
  const result = await cloudinary.v2.uploader.upload(req.file.path);
  // console.log(result);
  const photoWithCloudinary = {
    title,
    description,
    imgUrl: result.secure_url,
    public_id: result.public_id,
  };
  const newPhoto = new Photo(photoWithCloudinary);
  await newPhoto.save();
  await fs.unlink(req.file.path); // remove tmp photo
  next();
};

const deleteById = async (req, res, next) => {
  const { id } = req.params;
  const photo = await Photo.findByIdAndDelete(id);
  const result = await cloudinary.v2.uploader.destroy(photo.public_id);
  console.log(result);
  next();
};

module.exports = { getAll, getAllForm, create, deleteById };
