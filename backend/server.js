import express from 'express'
import cors from 'cors';
import dotenv from 'dotenv';
import prayerRoutes from './routes/Prayer.js'
import authRoutes from './routes/Auth.js'
import islamicDateTimeRoute from './routes/IslamicDateTime.js';
import AdhkarRoute from './routes/Adhkar.js';
import bodyParser from 'body-parser';
import savedHadithRoutes from './routes/SaveHadith.js'
import authMiddleware from './middleware/AuthMiddleware.js';
const app = express();
const port = 5000
dotenv.config();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/api/islamicDateTime', islamicDateTimeRoute); 
app.use('/api/adhkar', AdhkarRoute); 
app.use('/api/postPrayer', prayerRoutes);
app.use('/api/prayers', prayerRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', savedHadithRoutes);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})