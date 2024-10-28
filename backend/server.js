import express from 'express'
import cors from 'cors';
import dotenv from 'dotenv';
import prayerRoutes from './routes/Prayer.js'
import islamicDateTimeRoute from './routes/IslamicDateTime.js';
import AdhkarRoute from './routes/Adhkar.js';
const app = express();
const port = 5000
dotenv.config();
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/api/islamicDateTime', islamicDateTimeRoute); 
app.use('/api/adhkar', AdhkarRoute); 
app.use('/api/postPrayer', prayerRoutes);
app.use('/api/prayers', prayerRoutes);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})