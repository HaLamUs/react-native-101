import React, { Component } from "react";

class Home extends Component {
  constructor(props) {
    super(props);
    console.log("Print 1");
    this.state = {
      records: []
    };
  }

  componentDidMount() {
    this.getRecords();
  }

  getRecords() {
    console.log("Print 2");
    fetch("/catalog/api/count")
      .then(res => res.json())
      .then(records => this.setState({ records }));
  }

  render() {
    console.log("Ket qua ", this.state.records);
    return (
      <div className="col-lg-10">
        <h1>Local Library Home</h1>
        <p>Welcome to Ngoc Trinh Library</p>
        <h1>Dynamic content</h1>
        <p>The library has the following record counts:</p>
        <ul className="list-group">
          {Object.entries(this.state.records).map(([key, value]) => (
            <li className="list-group-item" key={key}>
              {key}: {value}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Home;
