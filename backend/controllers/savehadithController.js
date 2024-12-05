// backend/controllers/savehadithController.js
import pool from '../config/db.js';

export const toggleSaveHadith = async (req, res) => {
    const { userId, hadithId, hadithData } = req.body;
    // console.log("ids: ",userId, hadithId, hadithData)
    try {
        const existingEntry = await pool.query(
            'SELECT * FROM saved_hadith WHERE user_id = $1 AND hadith_id = $2',
            [userId, hadithId]
        );

        if (existingEntry.rowCount > 0) {
            await pool.query('DELETE FROM saved_hadith WHERE user_id = $1 AND hadith_id = $2', [userId, hadithId]);
            res.json({ message: 'Hadith removed from saved items' });
        } else {
            await pool.query(
                'INSERT INTO saved_hadith (user_id, hadith_id, hadith_data) VALUES ($1, $2, $3)',
                [userId, hadithId, hadithData]
            );
            res.json({ message: 'Hadith saved successfully' });
        }
    } catch (error) {
        console.error('Error in toggleSaveHadith:', error);
        res.status(500).json({ error: 'An error occurred while saving the hadith.' });
    }
};


export const getSavedHadith = async (req, res) => {
    const userId = req.params.userId;
    try {
        const result = await pool.query('SELECT * FROM saved_hadith WHERE user_id = $1', [userId]);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
