import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { ImageWithFallback } from "../components/ImageWithFallback";
import Navbar from "../components/Navbar";

const CourseDetails = () => {
  const { state } = useLocation();
  const { courseTitle } = useParams();

  const token = localStorage.getItem("token");

  // If the course data is passed via state, use it; otherwise, fetch it based on the title.
  const course = state?.course;

  if (!course) {
    // Optionally, fetch the course data from the backend using courseTitle
    // For now, display a message
    return (
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Course Details</h2>
        <p>Loading course details for "{decodeURIComponent(courseTitle)}"...</p>
        {/* Implement fetch logic here if desired */}
      </div>
    );
  }

  return (
    <>
      <Navbar isLogin={!!token} />

      <div className="container mx-auto p-6 mt-24">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="">
            <ImageWithFallback
              src={course.course_cover_image || "/placeholder.svg"}
              alt={course.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6">
            <h2 className="text-3xl font-bold mb-4">{course.title}</h2>
            <p className="text-lg mb-4">{course.headline}</p>
            <p className="text-md mb-4">Instructor: {course.instructor}</p>
            <p className="text-md mb-4">Rating: {course.ratings}</p>
            <p className="text-md mb-4">
              {course.is_paid ? `$${course.price}` : "Free"}
            </p>
            {/* Add more detailed information about the course */}
            <div className="mt-6">
              <button
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
                onClick={() => window.open(course.url, "_blank")}
              >
                Go to Course
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetails;
