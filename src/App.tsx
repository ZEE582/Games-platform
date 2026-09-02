import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { supabase } from "./lib/supabase";
import type { AuthChangeEvent, Session } from "@supabase/supabase-js";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Login from "./login";
import Dashbord from "./components/dashboard/Dashboard";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setLoggedIn(!!data.session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setLoggedIn(!!session);
    });

    return () => {
      listener.subscription.unsubscribe();
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
