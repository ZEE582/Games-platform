import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./login";
import Dashboard from "./components/dashboard/Dashboard";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { useAuth } from "./components/hoks/useAuth";

export default function App() {
  const { loggedIn, setLoggedIn, loading } = useAuth();

  if (loading) return null;

  return (
    <Router>
      <Routes>
        <Route
          path="/"

        />

        <Route
          path="/login"
          element={loggedIn ? <Navigate to="/dashbord" replace /> : <Login setLoggedIn={setLoggedIn} />}
        />

        <Route
          path="/dashbord"
          element={
            <ProtectedRoute isAllowed={loggedIn}>
              <Dashboard setLoggedIn={setLoggedIn} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
