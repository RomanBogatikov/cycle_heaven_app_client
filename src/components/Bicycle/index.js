import React, {Component} from 'react';

class BicyclePage extends Component {
  render() {
    return (
      <div className="wheel_container">
        <div>Loading...</div>
        <svg
          height="106px"
          width="106px"
        >
          <g className="wheel">
            <line x1="53" y1="0" x2="53" y2="103" stroke="black"/>

            <line x1="0" y1="53" x2="103" y2="53" stroke="black" />

            <line x1="18" y1="15" x2="85" y2="88" stroke="black" />

            <line x1="88" y1="15" x2="18" y2="88" stroke="black" />

            <circle cx="53" cy="53" r="50" stroke="RGBA(232, 152, 13, 1)" strokeWidth="6" fill="RGBA(0, 0, 0, 0)"/>
          </g>

        </svg>
      </div>
    )
  }
}


export default BicyclePage;
