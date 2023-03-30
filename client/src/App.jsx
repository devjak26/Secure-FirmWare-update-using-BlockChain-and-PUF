import React from "react";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages";
import SignInPage from "./pages/signin";
import FileUpload from "./components/FileUpload/FileUpload";
 const App = () => {
  
  return (
    <div>
          <NavBar />
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signin" element={<SignInPage />} 
            />
             <Route path="/FileUpload" element={<FileUpload />} 
            />
          </Routes>
        </Router>
      </div>
      
      

    </div>
  );
};

export default App;
