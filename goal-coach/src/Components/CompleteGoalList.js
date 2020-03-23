import React, { Component } from "react";
import { connect } from "react-redux";
import { setCompleted } from "../actions";
import { completeGoalRef, goalRef } from "../firebase";

class CompleteGoalList extends Component {
  componentDidMount() {
    completeGoalRef.on("value", snap => {
      let completeGoals = [];
      snap.forEach(completeGoal => {
        const { email, title } = completeGoal.val();
        completeGoals.push({ email, title });
      });
      this.props.setCompleted(completeGoals);
      console.log("ll", completeGoals);
    });
  }

  render() {
    // console.log("completeGoals ll", this.props.completeGoals);
    return (
      <div>
        {this.props.completeGoals.map((completeGoal, index) => {
          const { title, email } = completeGoal;
          return (
            <div key={index}>
              <strong>{title}</strong>
            </div>
          );
        })}
      </div>
    );
  }
}

// nhận từ state trả về props
function mapStateToProps(state) {
  const { completeGoals } = state;
  return {
    completeGoals
  };
}

export default connect(mapStateToProps, { setCompleted })(CompleteGoalList);
