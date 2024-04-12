import { v2 as cloudinary } from "cloudinary";
import { CLOUDNAME, CLOUDAPIKEY, CLOUDAPISECRET } from "../config/config.js";
import fs from "fs";

cloudinary.config({
  cloud_name: CLOUDNAME,
  api_key: CLOUDAPIKEY,
  api_secret: CLOUDAPISECRET,
});

export const fileUpload = async (localfilepath) => {
  try {
    if (!localfilepath) return null;
    const res = await cloudinary.uploader.upload(localfilepath, {
      resource_type: "auto",
    });
    fs.unlinkSync(localfilepath);
    return res;
  } catch (error) {
    fs.unlinkSync(localfilepath);
    return null;
  }
};

export const fileDestroy = async (localfilepath) => {
  return await cloudinary.uploader.destroy(localfilepath, {
    resource_type: "auto",
  });
};
