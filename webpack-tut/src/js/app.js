import React, { Component } from "react";
import { render } from "react-dom";
import "../css/style.css";
import nony from "../assets/cute.jpg";
// import nony from "../assets/keen.png";

export default class Hello extends Component {
  render() {
    return (
      <div>
        Hello from react
        <img src={nony} alt="lamha" />
      </div>
    );
  }
}

render(<Hello />, document.getElementById("app"));
