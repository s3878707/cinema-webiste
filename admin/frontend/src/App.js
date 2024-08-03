import logo from "./logo.svg";
import "./App.css";
import Login from "./pages/Login/login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Footer from "./components/Footer/Footer";
import AdminReviews from "./pages/Reviews/AdminReviews";
import AdminUsers from "./pages/Users/AdminUsers";
import Films from "./pages/Films/Films";
import MovieDescription from "./pages/Films/MovieDescriptions";
import { useState } from "react";
import NewFilm from "./pages/Films/NewFilm";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/adminreviews" element={<AdminReviews />} />
          <Route path="/adminusers" element={<AdminUsers />} />
          <Route path="/films" element={<Films />} />
          <Route path="/film/:film_id" element={<MovieDescription />} />
          <Route path="/newfilm" element={<NewFilm />} />

        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
