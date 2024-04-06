import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "./pages/Login";
import Singup from "./pages/Singup";
import { Route, Routes } from "react-router-dom";

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
import { ToastContainer } from "react-toastify";
import Forbidden from "./pages/Forbiden";
import PrivateRoute from "./PrivateRoute";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      <Route index element={<App />} />
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
    </Routes>
    <ToastContainer />
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
