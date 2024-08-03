import React from 'react';
import './Footer.css'; // You can create a separate CSS file for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Loop Cinemas. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;