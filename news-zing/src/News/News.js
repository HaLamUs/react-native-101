import React, { Component } from "react";
import "./News.css";

const imgUrl =
  "https://znews-photo-td.zadn.vn/w1024/Uploaded/lce_vjrcc/2017_11_03/john_kennedy_1.jpg";
const title =
  "Tokyo cho hay 8 người này đã được đưa tới nơi an toàn sau khi các nhân viên cứu hộ của Nhật Bản và Mỹ nỗ lực tiếp cận chiếc máy bay rơi ở khu vực đông nam Okinawa.";

class News extends Component {
  render() {
    return (
      <div className="NewsBorder">
        <div>
          <img src={imgUrl} alt="news" className="img-responsive" />
        </div>
        <div>
          <p> {title}</p>
        </div>
      </div>
    );
  }
}

export default News;
