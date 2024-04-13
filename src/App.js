import React, { useState } from "react";
import "./App.css";
import Login from "./pages/Login";
import WebSocketProvider from "./WebSocketProvider";
import { userStore } from "./stores/UserStore";
function App() {
  const token = userStore((state) => state.token);

  return (
    <>
      <div className="App">
        <Login data-testid="login" />
      </div>
    </>
  );
}

export default App;
