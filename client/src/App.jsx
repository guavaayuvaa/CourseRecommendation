/*import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpPage from "./components/SignUpPage";
import LoginPage from "./components/LoginPage";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import CourseDetails from "./pages/CourseDetails";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path ="/test" element={<CourseDetails/>} />
      </Routes>
    </Router>
  );
}

export default App;*/
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignUpPage from "./components/SignUpPage";
import LoginPage from "./components/LoginPage";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import CourseDetails from "./pages/CourseDetails";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route
          path="/landing"
          element={
            <ProtectedRoute>
              <LandingPage />
            </ProtectedRoute>
          }
        />
        {/* Add dynamic route for course details */}
        <Route
          path="/course/:courseTitle"
          element={
            <ProtectedRoute>
              <CourseDetails />
            </ProtectedRoute>
          }
        />
        {/* Redirect unknown routes */}
        <Route
          path="*"
          element={<Navigate to={token ? "/landing" : "/login"} replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;

