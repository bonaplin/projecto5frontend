import React from "react";
import "./App.css";
import { BrowserRouter as Router, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Singup from "./pages/Singup";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Categories from "./pages/Categories";
import Users from "./pages/Users";
import EditProfile from "./pages/EditProfile";
import DeletedTasks from "./pages/DeletedTasks";
import ScrumBoard from "./pages/ScrumBoard";
import ResetPassword from "./pages/ResetPassword";
import ConfirmAccount from "./pages/ConfirmAccount";
import Profile from "./pages/Profile";
import Forbidden from "./pages/Forbiden";

import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import PrivateRoute from "./PrivateRoute";

import { userStore } from "./stores/UserStore";
import WebSocketProvider from "./WebSocketProvider";

function App() {
  const token = userStore((state) => state.token);
  return (
    <WebSocketProvider token={token}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/singup" element={<Singup />} />
          <Route path="/forbidden" element={<Forbidden />} />
          <Route
            path="/header"
            element={
              <PrivateRoute>
                <Header />
              </PrivateRoute>
            }
          />
          <Route
            path="/scrum-board"
            element={
              <PrivateRoute>
                <ScrumBoard />
              </PrivateRoute>
            }
          />
          <Route
            path="/users"
            element={
              <PrivateRoute>
                <Users />
              </PrivateRoute>
            }
          />
          <Route path="/users/:selectedUser" element={<Profile />} />
          <Route
            path="/edit-profile"
            element={
              <PrivateRoute>
                <EditProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/categories"
            element={
              <PrivateRoute>
                <Categories />
              </PrivateRoute>
            }
          />
          <Route
            path="/deletedtasks"
            element={
              <PrivateRoute>
                <DeletedTasks />
              </PrivateRoute>
            }
          />
          <Route path="/footer" element={<Footer />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/confirm-account/:token" element={<ConfirmAccount />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <ToastContainer />
      </Router>
    </WebSocketProvider>
  );
}

export default App;
