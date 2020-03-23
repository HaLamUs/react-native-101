import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import NewsHead from "./NewsHead/NewsHead.js";
import "./NewsHead/NewsHead.css";
import NewsNavBar from "./NavBar/NewsNavBar";
import News from "./News/News";

class App extends Component {
  render() {
    return (
      <div>
        <NewsNavBar />
        <div className="container-fluid NewsHeadBody">
          <div className="row">
            <div className="col-lg-5">
              <NewsHead />
            </div>
            <div className="col-sm-3">
              <ul className="list-group ">
                <li className="list-group-item NewsListBorder">
                  <News />
                </li>
                <li className="list-group-item NewsListBorder">
                  <News />
                </li>
              </ul>
            </div>
            <div className="col-sm-4 HeadRowPurle">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec
              hendrerit tempor tellus. Donec pretium posuere tellus. Proin quam
              nisl, tincidunt et, mattis eget, convallis nec, purus. Cum sociis
              natoque penatibus et magnis dis parturient montes, nascetur
              ridiculus mus. Nulla posuere.
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
