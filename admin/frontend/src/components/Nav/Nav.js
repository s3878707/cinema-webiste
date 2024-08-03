import React, { useState, useEffect, useRef } from "react";
import "./Nav.css";
import { Link } from "react-router-dom";


const NavigationBar = () => {
  
  
  return (
    <nav className="navigation-bar">
      <a href="/dashboard" className="logo">
        Dashboard
      </a>
      
    </nav>
  );
};

export default NavigationBar;
