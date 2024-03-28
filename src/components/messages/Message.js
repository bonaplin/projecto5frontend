import React from "react";
import { ToastContainer, toast, Slide } from "react-toastify";

const tsuccess = (message) => {
  toast.success(message, {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: 0,
    theme: "light",
    transition: Slide,
  });
};
const terror = (message) => {
  toast.error(message, {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: 0,
    theme: "light",
    transition: Slide,
  });
};
const twarn = (message) => {
  toast.error(message, {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: 0,
    theme: "light",
    transition: Slide,
  });
};

export { tsuccess, terror, twarn };
