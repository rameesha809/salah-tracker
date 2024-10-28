import express from 'express';
import { savePrayers, getPrayersMissed, getPrayers } from '../controllers/prayerController.js';
const router = express.Router();

router.post('/', savePrayers);

router.get('/getMissedPrayers/:userId', getPrayersMissed);

router.get('/getPrayers/:userId', getPrayers);

export default router;
