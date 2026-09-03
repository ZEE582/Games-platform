import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { auth } from "./lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Login from "./login";
import Dashbord from "./components/dashboard/Dashboard";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoggedIn(!!user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={loggedIn ? <Navigate to="/dashbord" replace /> : <Login setLoggedIn={setLoggedIn} />}
        />

        <Route
          path="/dashbord"
          element={
            <ProtectedRoute isAllowed={loggedIn}>
              <Dashbord setLoggedIn={setLoggedIn} />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to={loggedIn ? "/dashbord" : "/login"} replace />} />
      </Routes>
    </BrowserRouter>
  );
}
