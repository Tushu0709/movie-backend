import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
 try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "user"
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, role: newUser.role, name: newUser.name, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "10h" }
    );

    res.status(201).json({ success: true, message: "User registered successfully", token, user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role } });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "10h" }
    );

    res.json({ success: true, message: "Login successful", token, user: { id: user._id, name: user.name, email: user.email, role: user.role }  });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
