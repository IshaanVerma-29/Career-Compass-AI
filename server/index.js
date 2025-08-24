const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectMongoDB = require("./DataBase/ConnectMongoDB");

dotenv.config();
const app = express();

// CORS Configuration
app.use(cors({
    origin: ['https://myai-portfolio.vercel.app','http://localhost:3000', 'https://career-craft-ai.vercel.app', 'http://localhost:5173'],
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
}));

// Middleware
app.use(express.json({ limit: '10mb' })); // Increased limit for file uploads
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
const UserRouter = require("./routes/User");
const AuthRouter = require("./routes/Auth");
const TestResultRouter = require("./routes/TestResult");

app.use('/user', UserRouter);
app.use('/api/auth', AuthRouter);
app.use('/api/academic', AuthRouter); // Academic routes are in Auth.js
app.use('/api/test-results', TestResultRouter);

const PORT = process.env.PORT || 5000;

// Connect to MongoDB and Start Server
connectMongoDB()
    .then(() => {
        app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
    })
    .catch((error) => {
        console.error("❌ MongoDB Connection Failed:", error);
        process.exit(1);
    });

// Default Route
app.get("/", (req, res) => {
    res.send("🚀 Welcome to Career Compass Backend");
});
