import fs from "fs-extra";
import Photo from "../models/Photo";

import { NextFunction, Request, Response } from "express";
import { imageService } from "../service/image.service";

const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const photos = await Photo.find().lean();
    res.render("images", { photos });
  } catch (error) {
    if (!(error instanceof Error)) return;
    console.log(error);
    res.status(500).json({ message: error.message })
  }
};

const getAllForm = async (req: Request, res: Response): Promise<void> => {
  try {
    const photos = await Photo.find().lean();
    res.render("imageform", { photos });
  } catch (error) {
    if (!(error instanceof Error)) return;
    console.log(error);
    res.status(500).json({ message: error.message })
  }
};

const create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

  try {
    const { title, description } = req.body;

    if (!req.file) throw Error('You must upload a image file to create a Book');

    const { path } = req.file;
    const result = await imageService.uploadImage(path);
    const photoData = {
      title,
      description,
      imgUrl: result.secure_url,
      public_id: result.public_id,
    };
    // console.log(result);

    const newPhoto = new Photo(photoData);
    await newPhoto.save();
    await fs.unlink(req.file.path); // remove tmp photo
    next();
  } catch (error) {
    if (!(error instanceof Error)) return;
    console.log(error);
    res.status(500).json({ message: error.message })
  }

};

const deleteById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const photo = await Photo.findByIdAndDelete(id);

    const photoId = photo?.public_id;
    const result = await imageService.deleteImage(photoId);
    console.log(result);
    next();
  } catch (error) {
    if (!(error instanceof Error)) return;
    console.log(error);
    res.status(500).json({ message: error.message })
  }
};

export default { getAll, getAllForm, create, deleteById };
