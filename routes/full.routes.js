import express from 'express';
import FullController from '../controllers/full.controller.js';

const router = express.Router();

router.get('/:id', FullController.getFullUser);

export default router;