/*import React from "react"
import { useNavigate } from "react-router-dom"
import { ImageWithFallback } from "./ImageWithFallback"

const Course = ({ courses = [], onSave, onRecommend }) => {
  const navigate = useNavigate()

  if (!courses || courses.length === 0) {
    return <p className="text-gray-500">No courses available.</p>
  }

  const handleCourseClick = (course) => {
    navigate(`/course/${encodeURIComponent(course.title)}`, { state: { course } })
  }

  return (
    <>
      {courses.map((course, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div
            className="cursor-pointer transition-transform hover:scale-[1.02]"
            onClick={() => handleCourseClick(course)}
          >
            <div className="h-48 relative">
              <ImageWithFallback
                src={course.course_cover_image || "/placeholder.svg"}
                alt={course.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">{course.title}</h3>
              <p className="text-sm mb-2">{course.headline}</p>
              <p className="text-sm mb-2">Instructor: {course.instructor}</p>
              <p className="text-sm mb-2">Rating: {course.ratings}</p>
              <p className="text-sm mb-4">{course.is_paid ? `$${course.price}` : "Free"}</p>
            </div>
          </div>
          <div className="px-4 pb-4 flex justify-between items-center gap-2">
            {onSave && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onSave(course)
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Save Course
              </button>
            )}
            {onRecommend && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onRecommend(course.title)
                }}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
              >
                Recommend Similar
              </button>
            )}
          </div>
        </div>
      ))}
    </>
  )
}

export default Course*/

import React from "react";
import { useNavigate } from "react-router-dom";
import { ImageWithFallback } from "./ImageWithFallback";

const Course = ({ courses = [], onSave, onRecommend }) => {
  const navigate = useNavigate();

  if (!courses || courses.length === 0) {
    return <p className="text-gray-500">No courses available.</p>;
  }

  const handleCourseClick = (course) => {
    navigate(`/course/${encodeURIComponent(course.title)}`, { state: { course } });
  };

  return (
    <>
      {courses.map((course, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]"
        >
          <div
            className="cursor-pointer"
            onClick={() => handleCourseClick(course)}
          >
            <div className="relative">
              <ImageWithFallback
                src={course.course_cover_image || "/placeholder.svg"}
                alt={course.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3
                className="font-bold text-lg mb-2 cursor-pointer"
                onClick={() => handleCourseClick(course)}
              >
                {course.title}
              </h3>
              <p className="text-sm mb-2">{course.headline}</p>
              <p className="text-sm mb-2">Instructor: {course.instructor}</p>
              <p className="text-sm mb-2">Rating: {course.ratings}</p>
              <p className="text-sm mb-4">
                {course.is_paid ? `$${course.price}` : "Free"}
              </p>
            </div>
          </div>
          <div className="px-4 pb-4 flex justify-between items-center gap-2">
            {onSave && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSave(course);
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                {onSave.name === "handleUnsaveCourse" ? "Unsave Course" : "Save Course"}
              </button>
            )}
            {onRecommend && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRecommend(course.title);
                }}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
              >
                Recommend Similar
              </button>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default Course;
