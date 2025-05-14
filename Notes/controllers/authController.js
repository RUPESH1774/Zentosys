const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

exports.register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "Email already in use" });

    const user = await User.create({ email, password });
    res.status(201).json({ token: generateToken(user._id) });
  } catch (err) {
    console.error("Register Error:", err); // <- Add this line
    res.status(500).json({ message: "Registration failed" });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password)))
      return res.status(400).json({ message: "Invalid credentials" });

    res.json({ token: generateToken(user._id) });
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
};
