import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return(
        <div>
          <footer className="footer">
            <span className="footer-text">
              Created by Nhu Trinh &copy; {new Date().getFullYear()}
            </span>
          </footer>
        </div>
      );
  }
}

export default Footer;
