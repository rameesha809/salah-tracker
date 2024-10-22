import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/', async (req, res) => {
    const page = req.query.page || 1;
    const book = req.query.book || 'sahih-bukhari';
  try {
    const response = await axios.get(`https://hadithapi.com/api/hadiths/?apiKey=$2y$10$YewqWF7k6a03Rqw4N588qOjPyx53nIbx8O3peo9by25Bnhgo7P6&book=${book}&paginate=10&page=${page}`);
    res.json(response.data.hadiths);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching Hadith' });
  }
});

export default router;