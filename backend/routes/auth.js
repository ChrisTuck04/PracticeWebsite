import express from 'express';
import Users from '../models/Users.js';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post("/register", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const existingUser = await Users.findOne({ email });
      if (existingUser) {
        res.status(409).json({ error: "Email already registered" });
        return;
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const verificationToken = randomUUID();
      const verificationTokenExpires = Date.now() + 1000 * 60 * 60 * 24;
  
      const newUser = new Users({
        firstName,
        lastName,
        email,
        passwordHash: hashedPassword,
        isVerified: false,
        verificationToken: verificationToken,
        verificationTokenExpires: verificationTokenExpires,
      });
  
      const savedUser = await newUser.save();
      
      await sendVerificationEmail(savedUser.email, verificationToken);
  
      res.status(201).json({ message: `User ${savedUser.email} registered successfully` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to register user" });
    }
  });

  export default router;