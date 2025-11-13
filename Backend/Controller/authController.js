const User = require("../Model/User");
const jwt = require("jsonwebtoken");
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "365d" });
};

exports.registerUser = async (req, res) => {
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({ fullName, email, password });
    await user.save();
    const userWithoutPassword = await User.findById(user._id).select(
      "-password"
    );
    res.status(200).json({
      id: user._id,
      userWithoutPassword,
      token: generateToken(user._id),
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error registering user", error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      res.status(400).json({ message: "Invalid credentials" });
    }

    const userWithoutPassword = await User.findById(user._id).select(
      "-password"
    );
    res.status(200).json({
      id: user._id,
      userWithoutPassword,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: "Error logging user", error: err });
  }
};

exports.getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error while fetching user info", error: err });
  }
};
