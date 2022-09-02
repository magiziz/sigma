import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Asset from "./components/Asset";

function App() {
  return (
    <div className={"min-h-screen bg-pink flex flex-col"}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path=":id" element={<Asset />} />
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
