import { v2 as cloudinary } from "cloudinary";
import { cloudinaryConfig } from "../config";

cloudinary.config(cloudinaryConfig);

const uploadImage = (path: string) => {
    return cloudinary.uploader.upload(path);
}

const deleteImage = (id: string) => {
    return cloudinary.uploader.destroy(id);
}

export const imageService = {
    uploadImage, deleteImage
}
