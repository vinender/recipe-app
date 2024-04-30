import express, { Request, Response } from 'express';
import * as uploaderController from '../controllers/uploaderController';

const router = express.Router();

router.post('/upload', (req: Request, res: Response) => {
  uploaderController.uploadImage(req, res);
});

export default router;
