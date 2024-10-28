import pool from '../config/db.js';

const createPrayer = async (userId, prayersDone) => {
    const { fajr, dhuhr, asr, maghrib, isha, prayerDate } = prayersDone;

    const newPrayerData = {
        [prayerDate]: {
            fajr: { done: fajr },
            dhuhr: { done: dhuhr },
            asr: { done: asr },
            maghrib: { done: maghrib },
            isha: { done: isha }
        }
    };

    try {
        const query = `
            INSERT INTO salah (user_id, prayer_data)
            VALUES ($1, $2::JSONB)
            ON CONFLICT (user_id)
            DO UPDATE SET prayer_data = jsonb_set(
                salah.prayer_data,
                '{${prayerDate}}',
                $2::JSONB -> '${prayerDate}',
                true
            )
                RETURNING prayer_data;
        `;
        
        const result = await pool.query(query, [userId, JSON.stringify(newPrayerData)]);
        console.log("Inserted/Updated Data:", result.rows[0]);
        return result.rows[0];
    } catch (error) {
        console.error("Error inserting/updating prayer data from controller:", error.message);
        throw error;
    }
};

const fetchPrayers = async (userId) => {
    try {
        const query = 'SELECT prayer_data FROM salah WHERE user_id = $1';
        const result = await pool.query(query, [userId]);

        if (result.rows.length > 0) {
            return result.rows[0].prayer_data; 
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching prayer data:", error.message);
        throw error;
    }
};


export { createPrayer, fetchPrayers };

