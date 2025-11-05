import express from 'express';
import ProfileController from '../controllers/profile.controller.js';

const router = express.Router();

router.get('/:_id', ProfileController.getProfile);
router.post('/', ProfileController.createProfile);
router.put('/:_id', ProfileController.updateProfile);

export default router;
