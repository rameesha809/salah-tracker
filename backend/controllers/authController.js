import pool from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js'; 

const SECRET_KEY = "secretkey";

const signInOrRegister = async (req, res) => {
  const { username, email, password } = req.body;
  console.log("Request Body:", req.body);
  try {
    const user = await User.findByEmail(email);
    console.log("Fetched User:", user);

    if (user) {

      const isPasswordValid = await bcrypt.compare(password, user.password);
      console.log("Password is valid:", isPasswordValid);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password' });
      }
      const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
      return res.json({ token, user: { id: user.id, email: user.email } });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password (Test):", hashedPassword);
    try {
        const newUser = await User.create(username, email, hashedPassword);
        const token = jwt.sign({ id: newUser.id, email: newUser.email }, SECRET_KEY, { expiresIn: '1h' });

  res.status(201).json({ token, user: { id: newUser.id, email: newUser.email } });
      } catch (error) {
        console.error("Error creating new user:", error);
        throw error; 
      }
  } catch (error) {
    console.error('Auth Error:', error);
    res.status(500).json({ error: 'Authentication error' });
  }
};

export default { signInOrRegister };
