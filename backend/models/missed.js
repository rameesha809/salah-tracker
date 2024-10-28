import pool from '../config/db.js';

const getMissedPrayers = async (userId) => {
    try {
        const query = `
            SELECT prayer_data
            FROM salah
            WHERE user_id = $1;
        `;

        const result = await pool.query(query, [userId]);
        if (result.rows.length === 0) {
            return { missedPrayers: {}, offeredPrayers: {} };
        }

        const prayerData = result.rows[0].prayer_data;
        const missedPrayers = {
            fajr: 0,
            dhuhr: 0,
            asr: 0,
            maghrib: 0,
            isha: 0
        };

        const offeredPrayers = {
            fajr: 0,
            dhuhr: 0,
            asr: 0,
            maghrib: 0,
            isha: 0
        };

        for (const date in prayerData) {
            for (const prayer in prayerData[date]) {
                if (prayerData[date][prayer].done) {
                    offeredPrayers[prayer]++;
                } else {
                    missedPrayers[prayer]++;
                }
            }
        }

        return { missedPrayers, offeredPrayers };
    } catch (error) {
        console.error("Error fetching missed and offered prayers:", error.message);
        throw error;
    }
};

export default getMissedPrayers;
