import React, { Component } from "react";
import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
import { addReminder, deleteReminder, clearReminders } from "../actions";
import moment from "moment";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      dueDate: ""
    };
  }

  addReminder() {
    console.log("this.state.dueDate", this.state.dueDate);
    this.props.addReminder(this.state.text, this.state.dueDate);
  }

  deleteReminder(id) {
    this.props.deleteReminder(id);
  }

  renderReminders() {
    const { reminders } = this.props;
    return (
      <ul className="list-group col-sm-4">
        {reminders.map(reminder => {
          return (
            <li key={reminder.id} className="list-group-item">
              <div className="list-item">
                <div>{reminder.text}</div>
                <div>
                  <em>{moment(new Date(reminder.dueDate)).fromNow()}</em>
                </div>
              </div>
              <div
                className="list-item delete-button"
                onClick={() => this.deleteReminder(reminder.id)}
              >
                &#x2715;
              </div>
            </li>
          );
        })}
      </ul>
    );
  }

  render() {
    // console.log("this.props", this.props);
    /*
    Props ở đây là properties ở ngoài truyền vào nhé, 
    chứ kô phải state(local) ==> map thành công Part2
    Ở Component App này mình đã access được global state mà 
    ko cần phải pass down xuống nhiều lớp 
    */
    return (
      <div className="App">
        <div className="title">Reminder Pro</div>
        <div className="form-inline reminder-form">
          <div className="form-group">
            <input
              className="form-control"
              placeholder="I have to ..."
              onChange={event => this.setState({ text: event.target.value })}
            />
            <input
              className="form-control"
              type="datetime-local"
              onChange={event => this.setState({ dueDate: event.target.value })}
            />
          </div>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => this.addReminder()}
          >
            Add Reminder
          </button>
        </div>
        {this.renderReminders()}
        <div
          className="btn btn-danger"
          onClick={() => this.props.clearReminders()}
        >
          Clear Reminders
        </div>
      </div>
    );
  }
}

/*
Ý nghĩa của đoạn set up này
Part1:
Kết nối event ở component với action (redux) 
Kéo theo reducer (redux)
Part2:
Listen state change mà update 
*/

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ addReminder }, dispatch);
// }

function mapStateToProps(state) {
  return {
    reminders: state
  };
}

// export default connect(null, mapDispatchToProps)(App);
export default connect(mapStateToProps, {
  addReminder,
  deleteReminder,
  clearReminders
})(App);
