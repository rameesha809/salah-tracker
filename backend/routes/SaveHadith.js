// backend/routes/SaveHadith.js
import express from 'express';
import { toggleSaveHadith, getSavedHadith } from '../controllers/savehadithController.js';

const router = express.Router();

router.post('/saved-hadith', toggleSaveHadith);
router.get('/saved-hadith/:userId', getSavedHadith);

export default router;
