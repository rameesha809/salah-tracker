import express from 'express';
import savePrayers  from '../controllers/prayerController.js';
const router = express.Router();

router.post('/', savePrayers);

export default router;
