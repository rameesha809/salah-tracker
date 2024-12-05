import pool from '../config/db.js'; // Import your database pool
import bcrypt from 'bcryptjs'
class User {
  static async create(username, email, password) {
    const client = await pool.connect();
    try {
      const result = await client.query(
        'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
        [username, email, password]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error('Error creating user: ' + error.message);
    } finally {
      client.release();
    }
  }

  static async findByEmail(email) {
    const client = await pool.connect();
    try {
      const result = await client.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
      );
      return result.rows[0]; // Return the found user
    } catch (error) {
      throw new Error('Error finding user: ' + error.message);
    } finally {
      client.release();
    }
  }
}

export default User;
