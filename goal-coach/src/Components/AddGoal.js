import React, { Component } from "react";
import { goalRef } from "../firebase";
import { connect } from "react-redux";

class AddGoal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ""
    };
  }

  addGoal() {
    // console.log("this.state", this);
    const { title } = this.state;
    const { email } = this.props.user; // lay tu redux
    goalRef.push({ email: email, title: title });
  }

  render() {
    return (
      <div className="form-inline">
        <div className="form-group">
          <input
            type="text"
            placeholder="Add a goal"
            className="form-control"
            style={{ marginRight: "5px" }}
            onChange={event => this.setState({ title: event.target.value })}
          />
          <button
            className="btn btn-success"
            type="button"
            onClick={() => this.addGoal()}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}

/*
Cái này thay vì lấy truyền thủ công prop 
từ cha đến con rồi ... 
*/
function mapStateToProps(state) {
  const { user } = state;
  // console.log("state in AddGoal.js", state);
  return {
    user
  };
}

export default connect(mapStateToProps, null)(AddGoal);
