import { Course } from "../models/Course.js"

export const saveTopCourses = async (courses) => {
  try {
    for (const course of courses) {
      // Adjust the fields based on the structure of your incoming data
      const courseData = {
        title: course.title,
        description: course.headline || course.description,
        instructor: course.instructor,
        url: course.url || `https://example.com/course/${course.title.replace(/\s+/g, "-").toLowerCase()}`,
        is_paid: course.is_paid,
        price: course.price,
        course_cover_image: course.course_cover_image,
        ratings: course.ratings,
      }

      await Course.findOneAndUpdate(
        { title: courseData.title }, // Use title as a unique identifier
        courseData,
        { upsert: true, new: true },
      )
    }
    return { success: true, message: "Courses saved successfully" }
  } catch (error) {
    console.error("Error saving courses:", error)
    return { success: false, message: "Failed to save courses" }
  }
}

export const saveUserCourse = async (course, userEmail) => {
  try {
    if (!userEmail) {
      return { success: false, message: "User must be authenticated to save courses" }
    }

    const courseData = {
      ...course,
      userId: userEmail,
    }
    console.log(courseData)

    const savedCourse = await Course.findOneAndUpdate({ title: courseData.title, userId: userEmail }, courseData, {
      upsert: true,
      new: true,
    })

    console.log(savedCourse)

    return { success: true, message: "Course saved successfully", course: savedCourse }
  } catch (error) {
    console.error("Error saving course:", error)
    return { success: false, message: "Failed to save course" }
  }
}

export const getSavedCourses = async (userEmail) => {
  try {
    const savedCourses = await Course.find({ userId: userEmail })
    return { success: true, courses: savedCourses }
  } catch (error) {
    console.error("Error fetching saved courses:", error)
    return { success: false, message: "Failed to fetch saved courses" }
  }
}

export const getRecommendedCourses = async (courseTitle) => {
  try {
    // This is a simple recommendation system based on matching tags or categories
    // You might want to implement a more sophisticated recommendation algorithm
    const course = await Course.findOne({ title: courseTitle })
    if (!course) {
      return { success: false, message: "Course not found" }
    }

    const recommendedCourses = await Course.find({
      $or: [{ tags: { $in: course.tags } }, { category: course.category }],
      title: { $ne: courseTitle },
    }).limit(6)

    return { success: true, courses: recommendedCourses }
  } catch (error) {
    console.error("Error fetching recommended courses:", error)
    return { success: false, message: "Failed to fetch recommended courses" }
  }
}

export const getTopRatedCourses = async (limit = 10) => {
  try {
    const topCourses = await Course.find({}).sort({ ratings: -1 }).limit(limit)
    return { success: true, courses: topCourses }
  } catch (error) {
    console.error("Error fetching top-rated courses:", error)
    return { success: false, message: "Failed to fetch top-rated courses" }
  }
}

