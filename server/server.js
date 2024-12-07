const cors = require("cors");
const port = 3000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const secretKey = 'secretkey'
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      `mongodb+srv://doadmin:974HsRyco8D235x1@db-mongodb-nyc1-94866-1ec5486a.mongo.ondigitalocean.com/admin`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log(`MongoDB Connected: {conn.connection.host}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

app.use(cors());
app.use(express.json());
connectDB();

// Define a schema and model (if needed)
const UserSchema = new mongoose.Schema({
  username: String,
  password: String
});
const User = mongoose.model("User", UserSchema);

const GreenEnergySchema = new mongoose.Schema({
  country: String,
  expense: String
});
const GreenEnergy = mongoose.model("GreenEnergy", GreenEnergySchema);

const RecentInnovationSchema = new mongoose.Schema({
  tech: String,
  expense: Number
});
const RecentInnovation = mongoose.model(
  "RecentInnovation",
  RecentInnovationSchema
);

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  // Find user in database (replace with your DB logic)
  console.log(username);
  const user = await User.findOne({
    username: username
});
  if (!user) {
    return res.status(401).json({ message: "Invalid username" });
  }
  // Compare password
  const isPasswordValid = user.password == 'ramnarayanan';
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid password" });
  }
//   Generate JWT token
  const token = jwt.sign({ userId: user._id }, secretKey);
  res.json({ token });
});

// GET route to fetch data from MongoDB
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
    console.log(res);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET route to fetch data from MongoDB
app.get("/api/greenenergy", async (req, res) => {
  try {
    const greenenergy = await GreenEnergy.find();
    res.json(greenenergy);
    console.log(res);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET route to fetch data from MongoDB
app.get("/api/recentinnovations", async (req, res) => {
  try {
    const recentInnovation = await RecentInnovation.find();
    res.json(recentInnovation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(port, () => {
  console.log(`App Served at http://localhost:${port}`);
});
