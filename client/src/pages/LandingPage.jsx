import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import Navbar from "../components/Navbar"
import Course from "../components/Course"
import { useCurrentUser } from "../utils/getCurrentUser"
import "./landing-page.css"

const LandingPage = () => {
  const [topCourses, setTopCourses] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [error, setError] = useState("")
  const [search, setSearch] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [savedCourses, setSavedCourses] = useState([])
  const [activeTab, setActiveTab] = useState("courses")
  const [recommendedCourses, setRecommendedCourses] = useState([])
  const navigate = useNavigate()
  const { currentUser, loading, error: currentUserError } = useCurrentUser()

  const API = "http://127.0.0.1:5000"
  const nodeAPI = "http://localhost:3000"

  const saveCourse = async (course) => {
    if (!currentUser) {
      setError("Please log in to save courses")
      return
    }
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${nodeAPI}/courses/save`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        body: JSON.stringify({ course }),
      })
      const data = await response.json()
      if (data.success) {
        console.log("Course saved successfully")
        fetchSavedCourses()
      } else {
        setError(data.message || "Failed to save course")
      }
    } catch (error) {
      console.error("Error saving course:", error)
      setError("Error saving course")
    }
  }

  const fetchSavedCourses = async () => {
    if (!currentUser) {
      setSavedCourses([])
      return
    }
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${nodeAPI}/courses/saved`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      })
      const data = await response.json()
      if (data.success) {
        setSavedCourses(data.courses)
      } else {
        console.error("Failed to fetch saved courses:", data.message)
        setError("Failed to fetch saved courses")
      }
    } catch (error) {
      console.error("Error fetching saved courses:", error)
      setError("Error fetching saved courses")
    }
  }

  const fetchRecommendedCourses = async (courseTitle) => {
    try {
      const response = await fetch(`${API}/recommend`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ course: courseTitle }),
      })
      const data = await response.json()
      if (data.success) {
        setRecommendedCourses(data.data)
      } else {
        setError(data.message || "Failed to fetch recommendations")
      }
    } catch (error) {
      console.error("Error fetching recommended courses:", error)
      setError("Error fetching recommendations")
    }
  }

  useEffect(() => {
    fetch(`${API}/courses`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setTopCourses(data.data)
        } else {
          setError(data.message || "Failed to fetch top courses")
        }
      })
      .catch((err) => {
        console.error("Error fetching the top courses:", err)
        setError("Error fetching the top courses")
      })
  }, [])

  useEffect(() => {
    if (currentUser) {
      fetchSavedCourses()
    }
  }, [currentUser, fetchSavedCourses]) // Added fetchSavedCourses to dependencies

  const handleSearch = (e) => {
    e.preventDefault()
    setSearchTerm(search)

    fetch(`${API}/search`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ term: search }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setSearchResults(data.data)
          setError("")
        } else {
          setSearchResults([])
          setError(data.message || "No matching courses found.")
        }
      })
      .catch((err) => {
        console.error("Error searching for courses:", err)
        setError("Error searching for courses.")
      })
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex justify-between items-center px-6 bg-blue-800 py-6 fixed top-0 left-0 right-0 z-10">
        <Navbar isLogin={true} />
        {loading ? (
          <p className="text-white">Loading user...</p>
        ) : currentUserError ? (
          <p className="text-white">Error: {currentUserError}</p>
        ) : currentUser ? (
          <p className="text-white">Welcome, {currentUser}!</p>
        ) : (
          <p className="text-white">Please log in to save courses</p>
        )}
      </div>

      <div className="flex-grow mt-28 px-6">
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <div className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 mb-6">
            <button
              className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 ${
                activeTab === "courses"
                  ? "bg-white shadow text-blue-700"
                  : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
              }`}
              onClick={() => setActiveTab("courses")}
            >
              Courses
            </button>
            <button
              className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 ${
                activeTab === "saved"
                  ? "bg-white shadow text-blue-700"
                  : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
              }`}
              onClick={() => setActiveTab("saved")}
              disabled={!currentUser}
            >
              Saved Courses
            </button>
          </div>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          {activeTab === "courses" && (
            <>
              <form onSubmit={handleSearch} className="flex gap-3 mb-6">
                <input
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-lg pl-6 pr-4 border border-gray-400"
                  placeholder="Search for courses"
                />
                <button className="bg-green-400 text-white font-semibold rounded-lg px-4 py-2" type="submit">
                  Search
                </button>
              </form>

              {searchTerm !== "" && (
                <p className="text-center mt-4 mb-6 font-semibold text-lg">
                  Search results for <span className="text-green-500">"{searchTerm}"</span>
                </p>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-gray-100 p-4 rounded-lg">
                <Course
                  courses={searchResults.length > 0 ? searchResults : topCourses}
                  onSave={saveCourse}
                  onRecommend={fetchRecommendedCourses}
                />
              </div>

              {recommendedCourses.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-2xl font-bold mb-4">Recommended Courses</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-gray-100 p-4 rounded-lg">
                    <Course courses={recommendedCourses} onSave={saveCourse} onRecommend={fetchRecommendedCourses} />
                  </div>
                </div>
              )}
            </>
          )}

          {activeTab === "saved" && currentUser && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-gray-100 p-4 rounded-lg">
              {savedCourses.length > 0 ? <Course courses={savedCourses} /> : <p>You haven't saved any courses yet.</p>}
            </div>
          )}

          {activeTab === "saved" && !currentUser && <p>Please log in to view your saved courses.</p>}
        </div>
      </div>

      <footer className="bg-blue-800 text-white py-4 mt-8">
        <div className="container mx-auto text-center">
          <p>© 2024 Course Recommendation System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage

