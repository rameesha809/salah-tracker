import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://api.aladhan.com/v1/gToH?19-10-2024');
    res.json(response.data.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching Islamic date and time' });
  }
});

export default router;
