import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./css/index.css";
import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import { VideoProvider } from "./context/VideoContext";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* <Route path="/login" element={<PublicRoute children={<Login />} />} />
        <Route
          path="/register"
          element={<PublicRoute children={<Register />} />}
        /> */}
        {/* 
        <Route
          path="/dashboard"
          element={
            <PrivateRoute
              children={
                <VideoProvider>
                  <Dashboard />
                </VideoProvider>
              }
            />
          }
        /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
