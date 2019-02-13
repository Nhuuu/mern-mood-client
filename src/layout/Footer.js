import React from 'react';

const Footer = () => {
  return(
    <div>
      <footer className="footer">
        <span className="footer-text">
          Created by Doug Klemp, Kelly Park, Nhu Trinh, and Paolo Chidrome &copy; {new Date().getFullYear()}
        </span>
      </footer>
    </div>
  );
}

export default Footer;