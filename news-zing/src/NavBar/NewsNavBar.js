import React, { Component } from "react";
import "./NewsNavBar.css";
/* <img
    src={require("../images/home_icon.png")}
    alt="lala"
    className="NavBarLogo"
/> */

class NewsNavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-default navbar-fixed-top NavBarBody hidden-md hidden-sm hidden-xs">
        <ul className="nav navbar-nav tbl1">
          <li>
            <a href="#">
              <span className="NavBarLogo" />
            </a>
          </li>
          <li>
            <a href="#">Thời sự</a>
          </li>
          <li>
            <a href="#">Thế giới</a>
          </li>
          <li>
            <a href="#">Kinh doanh</a>
          </li>
          <li>
            <a href="#">Pháp luật</a>
          </li>
        </ul>
        <ul className="nav navbar-nav tbl2">
          <li>
            <a href="#">Xuất bản</a>
          </li>
          <li>
            <a href="#">Thể thao</a>
          </li>
          <li>
            <a href="#">Công nghệ</a>
          </li>
          <li>
            <a href="#">Xe 360</a>
          </li>
        </ul>
        <ul className="nav navbar-nav tbl3">
          <li>
            <a href="#">Giải trí</a>
          </li>
          <li>
            <a href="#">Âm nhạc</a>
          </li>
          <li>
            <a href="#">Phim ảnh</a>
          </li>
          <li>
            <a href="#">Thời trang</a>
          </li>
        </ul>
        <ul className="nav navbar-nav tbl4">
          <li>
            <a href="#">Sống trẻ</a>
          </li>
          <li>
            <a href="#">Giáo dục</a>
          </li>
          <li>
            <a href="#">Sức khoẻ</a>
          </li>
          <li>
            <a href="#">Du lịch</a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default NewsNavBar;
