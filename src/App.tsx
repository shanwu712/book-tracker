import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Homepage from "./pages/Homepage";
import FormPage from "./pages/FormPage";
import FavPage from "./pages/FavPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="form" element={<FormPage />} />
        <Route path="favorite" element={<FavPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
