import React, { Component } from "react";
// import AnhCuaLam from "../images/home_icon.png";
// import AnhCuaLam2 from "../images/";

const imgURL =
  "https://znews-photo-td.zadn.vn/w660/Uploaded/SgtnRN/2017_11_14/vn2018.jpg";
const nsTitle1 = "Hòa Afghanistan, ĐTVN giành vé dự vòng chung kết Asian Cup";
const nsTitle2 =
  "Hòa đội tuyển Afghanistan 0-0 ở lượt thứ năm bảng C diễn ra trên sân Mỹ Đình lúc 19h, đội tuyển Việt Nam giành quyền dự vòng chung kết Asian Cup 2019 trước 1 lượt trận";

class NewsHead extends Component {
  render() {
    return (
      <div>
        <div className="NewsHeadImage ">
          <img src={imgURL} alt="lalaa" className="img-responsive" />
        </div>
        <div className="NewsHeadMainTitle">
          <h4>
            <strong> {nsTitle1} </strong>
          </h4>
        </div>
        <div className="NewsHeadSubTitle">
          <p> {nsTitle2}</p>
        </div>
      </div>
    );
  }
}

export default NewsHead;
