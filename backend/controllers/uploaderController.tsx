import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import multer from 'multer';
import path from 'path';
import { ParsedQs } from 'qs';

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

export const uploadImage = async (req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>) => {
  // Use the `upload` middleware to handle the file upload
  upload.single('image')(req, res, function (err: any) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      console.error('Multer error:', err);
      return res.status(500).json({ error: 'Multer error' });
    } else if (err) {
      // An unknown error occurred when uploading.
      console.error('Unknown error:', err);
      return res.status(500).json({ error: 'Unknown error' });
    }

    // If file was successfully uploaded, send the URL of the uploaded image
    const imageUrl = `http://localhost:5000/` + req?.file?.path;
    res.json({ imageUrl: imageUrl });
  });
};
