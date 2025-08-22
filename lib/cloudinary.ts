import { v2 as cloudinary } from "cloudinary";
import { Readable } from 'stream';
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;


export async function uploadToCloudinary(file: File): Promise<string> {
  return new Promise(async (resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'avatars' },
      (error, result) => {
        if (error) return reject(error);
        resolve(result?.secure_url || '');
      }
    );

    const bufferStream = new Readable();
    bufferStream.push(Buffer.from(await file.arrayBuffer()));
    bufferStream.push(null);
    bufferStream.pipe(stream);
  });
}
