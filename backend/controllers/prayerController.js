import {createPrayer, fetchPrayers} from '../models/prayers.js';
import getMissedPrayers from '../models/missed.js';

export const savePrayers = async (req, res) => {
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

export const getPrayers = async (req, res) => {
    const { userId } = req.params; // Get userId from the request params
    console.log("Fetching prayers for userId:", userId);
    try {
        const prayerData = await fetchPrayers(userId); // Fetch the prayer data
        console.log("Fetched Prayer Data:", prayerData);
        res.status(200).json(prayerData); // Send the prayer data back to the client
    } catch (err) {
        console.error("Error fetching prayers:", err);
        res.status(500).json({ error: 'Failed to fetch prayer data' });
    }
};

export const getPrayersMissed = async (req, res) => {
    const { userId } = req.params;
    console.log("Fetching missed prayers for userId:", userId);
    try {
        const missedPrayers = await getMissedPrayers(userId); 
        console.log("loggon in controller",missedPrayers)
        res.status(200).json(missedPrayers);
    } catch (err) {
        console.error("Error fetching missed prayers:", err); 
        res.status(500).json({ error: 'Failed to fetch missed prayer data' });
    }
};
