/*
            TÓM VÁY 1 CÂU DÙNG CSS VỚI REACT VẴN QUẤT NHƯ THƯỜNG 
*/

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { Button, Grid, Row, Col } from "react-bootstrap";
import "./NewsHead.css";

const gridInstance = (
  <Grid>
    <Row className="container-fluid">
      <Col lg={4} className="HeadRowPurle">
        Cần đoạn test này để cho nó hiện ==> Nó tự động co dãn theo content nó
        chứa -> hay vc
        <p style={{ color: "red" }}> Tổng số cột phải bằng 12 nhé </p>
        <p style={{ color: "orange" }}>
          {" "}
          Version này chỉ support màn hình 32 inches only nên xs=6 sẽ bị loại{" "}
        </p>
      </Col>
      <Col lg={8} className="HeadRowYellow">
        <Button bsStyle="success">Hay Ghe</Button>
      </Col>
      {/* <Col lg={4} className="HeadRowPurle">
        <Button bsStyle="success">Hay Ghe</Button>
      </Col> */}
    </Row>
  </Grid>
);
// ReactDOM.render(gridInstance, document.getElementById("root"));
ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
