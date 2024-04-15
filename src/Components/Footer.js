import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Contact Support</h3>
            <p>Contact us for any assistance or queries:</p>
            <ul>
              <li>Email: support@example.com</li>
              <li>Phone: 123-456-7890</li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>About</h3>
            <p>Learn more about our company:</p>
            <ul>
              <li>About Us</li>
              <li>Our Team</li>
              <li>Our Mission</li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Latest Updates</h3>
            <p>Stay informed about air pollution:</p>
            <ul>
              <li>Recent News</li>
              <li>Research Findings</li>
              <li>Tips for Prevention</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
