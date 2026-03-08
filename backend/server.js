const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const connectDB = require("./config/db");

dotenv.config();

// Connect Database
connectDB();

// Load Passport Config
require("./config/passport");

const app = express();

// Trust proxy (required for Render / HTTPS)
app.set("trust proxy", 1);

// CORS configuration
app.use(
  cors({
    origin: "https://auth-frontend-project-y98r.onrender.com",
    credentials: true,
  })
);

// Middleware
app.use(express.json());

// Session configuration (important for Google OAuth)
app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecretkey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true, // Required for HTTPS (Render)
      sameSite: "none", // Required for cross-site cookies
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/user", require("./routes/user"));

// Test Routes
app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});

app.get("/test", (req, res) => {
  res.send("Backend is working ✅");
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
