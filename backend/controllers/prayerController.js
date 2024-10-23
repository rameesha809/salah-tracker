import createPrayer from '../models/prayers.js';

const savePrayers = async (req, res) => {
    const { userId, prayersDone } = req.body;
    console.log("Received userId:", userId);
    console.log("Received prayersDone:", prayersDone);
    try {
        const prayerData = await createPrayer(userId, prayersDone);
        res.status(201).json(prayerData);
    } catch (err) {
        res.status(500).json({ error: 'Failed to save prayer data' });
    }
};
export default savePrayers;