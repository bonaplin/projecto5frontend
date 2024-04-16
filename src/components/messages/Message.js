import React from "react";
import { toast, Slide } from "react-toastify";

const timerAutoClose = 1000;
const tsuccess = (message) => {
  toast.success(message, {
    position: "top-center",
    autoClose: timerAutoClose,
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
    autoClose: timerAutoClose,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: 0,
    pauseOnFocusLoss: false,
    theme: "light",
    transition: Slide,
  });
};
const twarn = (message) => {
  toast.warn(message, {
    position: "top-center",
    autoClose: timerAutoClose,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: 0,
    pauseOnFocusLoss: false,
    theme: "light",
    transition: Slide,
  });
};
const tinfo = (message) => {
  toast.info(message, {
    position: "top-center",
    autoClose: timerAutoClose,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: 0,
    pauseOnFocusLoss: false,
    theme: "light",
    transition: Slide,
  });
};
const tdefault = (message) => {
  toast(message, {
    position: "top-center",
    autoClose: timerAutoClose,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: 0,
    pauseOnFocusLoss: false,
    theme: "light",
    transition: Slide,
  });
};
export { tsuccess, terror, twarn, tinfo, tdefault };
