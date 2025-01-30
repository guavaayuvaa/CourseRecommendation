import express from "express"
import {
  saveUserCourse,
  getSavedCourses,
  getRecommendedCourses,
  getTopRatedCourses,
  saveTopCourses,
} from "../controllers/CourseController.js"
import authenticateToken from "../middleware/authenticateToken.js"

const router = express.Router()

// Existing routes
router.post("/save", authenticateToken, async (req, res) => {
  const { course } = req.body
  const result = await saveUserCourse(course, req.user.email)
  res.json(result)
})

router.get("/saved", authenticateToken, async (req, res) => {
  const result = await getSavedCourses(req.user.email)
  res.json(result)
})

// New routes
router.get("/recommended/:courseTitle", async (req, res) => {
  const { courseTitle } = req.params
  const result = await getRecommendedCourses(courseTitle)
  res.json(result)
})

router.get("/top-rated", async (req, res) => {
  const limit = req.query.limit ? Number.parseInt(req.query.limit) : 10
  const result = await getTopRatedCourses(limit)
  res.json(result)
})

// Admin route for saving top courses (you might want to add admin authentication here)
router.post("/save-top-courses", async (req, res) => {
  const { courses } = req.body
  const result = await saveTopCourses(courses)
  res.json(result)
})

export default router

