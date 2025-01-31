/*import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import courseRoutes from './routes/courseRoutes.js';
import authRoute from "./routes/auth.js";
import jwt from 'jsonwebtoken';
import authenticateToken from './middleware/authenticateToken.js';

dotenv.config();
const connection_url = "mongodb+srv://user:acer@cluster0.0nvn2.mongodb.net/";

const app = express();

// Configure CORS
const corsOptions = {
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());


app.use("/auth", authRoute);
app.use('/courses', courseRoutes);

app.use('/auth/current-user', authenticateToken, (req, res) => {
  res.json({ email: req.user.email });
});

const PORT = 3000;

mongoose
  .connect(connection_url)
  .then(() => {
    app.listen(PORT, () => console.log(`Server started in port:${PORT}`));
  })
  .catch((error) => {
    console.log(error);
  });
*/
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import courseRoutes from "./routes/courseRoutes.js";
import authRoute from "./routes/auth.js";
import jwt from "jsonwebtoken";
import authenticateToken from "./middleware/authenticateToken.js";

dotenv.config();
const connection_url = "mongodb+srv://user:acer@cluster0.0nvn2.mongodb.net/";

const app = express();

// Configure CORS
const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/auth", authRoute);
app.use("/courses", courseRoutes);

app.use("/auth/current-user", authenticateToken, (req, res) => {
  res.json({ email: req.user.email });
});

// for course title
app.get("/courses/:courseTitle", async (req, res) => {
  const { courseTitle } = req.params;
  try {
    // Retrieve the course from your database
    const course = await findCourseByTitle(courseTitle);
    if (course) {
      res.json({ course });
    } else {
      res.status(404).json({ message: "Course not found." });
    }
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({ message: "Error fetching course details." });
  }
});

const PORT = 3000;

mongoose
  .connect(connection_url)
  .then(() => {
    app.listen(PORT, () => console.log(`Server started in port:${PORT}`));
  })
  .catch((error) => {
    console.log(error);
  });