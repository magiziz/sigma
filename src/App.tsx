import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";

function App() {
  return (
    <div className={"min-h-screen bg-pink"}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<h1>Hey</h1>} />
        <Route
          path="*"
          element={
            <h1 className={"w-full text-center mt-3"}>Page not found sorry</h1>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
