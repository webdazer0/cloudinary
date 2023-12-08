import { Schema, model } from "mongoose";

export interface PhotoDoc {
  title: string,
  description: string,
  imgUrl: string,
  public_id: string,
}

const Photo = new Schema<PhotoDoc>({
  title: String,
  description: String,
  imgUrl: String,
  public_id: String,
});

export default model<PhotoDoc>("Photo", Photo);