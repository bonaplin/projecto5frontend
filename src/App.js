import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Navigate } from "react-router-dom";
import Login from "./pages/Login";
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
import Dashboard from "./pages/Dashboard";
import "./translations/i18n"; // importa o arquivo i18n que você acabou de criar

function App() {
  const token = userStore((state) => state.token);
  return (
    <WebSocketProvider token={token}>
      <Router>
        {token && <Header />}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forbidden" element={<Forbidden />} />
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
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/confirm-account/:token" element={<ConfirmAccount />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <ToastContainer />
      </Router>
      <Footer />
    </WebSocketProvider>
  );
}

export default App;
