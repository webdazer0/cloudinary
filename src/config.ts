import { config } from "dotenv";
if (process.env.NODE_ENV !== "production") config();

export const dbConfig = {
  MONGODB_URI: process.env.MONGODB_URI ?? '',
};

export const cloudinaryConfig = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME ?? '',
  api_key: process.env.CLOUDINARY_API_KEY ?? '',
  api_secret: process.env.CLOUDINARY_API_SECRET ?? '',
};
