import React, { Component } from "react";
import Clock from "./clock";
import "./App.css";
import { Form, FormControl, Button } from "react-bootstrap";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deadline: "December 1, 2017",
      newDeadline: "" // kô có biến này mỗi lần mày gõ nó sẽ đổi
    };
  }

  changeDeadline() {
    // this.setState({ deadline: "November 25, 2017" });
    this.setState({ deadline: this.state.newDeadline });
  }

  render() {
    return (
      <div className="App">
        <div className="App-title">
          Countdown to {this.state.deadline}
        </div>
        <Clock deadline={this.state.deadline} />
        <Form inline>
          <FormControl
            className="Deadline-input"
            placeholder="hold my beer"
            onChange={event =>
              this.setState({ newDeadline: event.target.value })}
          />
          <Button onClick={() => this.changeDeadline()}>Submit</Button>
        </Form>
      </div>
    );
  }
}

export default App;
