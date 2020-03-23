import React, { Component } from "react";
import "./App.css";
import SideMenu from "./components/SideMenu";
import Main from "./components/Main";

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <SideMenu />
          <Main />
        </div>
      </div>
    );
  }
}

export default App;
