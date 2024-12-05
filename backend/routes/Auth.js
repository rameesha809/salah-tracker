import express from 'express';
const router = express.Router();
import authController from '../controllers/authController.js';

router.post('/', authController.signInOrRegister);

export default router;
