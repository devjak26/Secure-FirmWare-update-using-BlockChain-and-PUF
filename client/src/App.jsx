import React from "react";
import FileUpload from "./components/FileUpload/FileUpload";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages";
import SignInPage from "./pages/signin";

const App = () => {
  return (
    <div>
      <div>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signin" element={<SignInPage />} 
            
            />
          </Routes>
        </Router>
      </div>
      <div className="App">
        <FileUpload />
      </div>
    </div>
  );
};

export default App;
