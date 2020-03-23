import React, { Component } from "react";
import { goalRef } from "../firebase";
import { connect } from "react-redux";
import { setGoals } from "../actions";
import GoalItem from "./GoalItem";

class GoalList extends Component {
  componentDidMount() {
    // let goals = [];
    goalRef.on("value", snap => {
      let goals = [];
      snap.forEach(goal => {
        // let goalObject = goal.val();
        const { email, title } = goal.val();
        const serverKey = goal.key;
        goals.push({ email, title, serverKey });
        // console.log("goal", goal);
      });
      console.log("goals", goals);
      this.props.setGoals(goals); // call action (1)
    });
  }

  render() {
    console.log("this.props.goals", this.props.goals); //(3)
    return (
      <div>
        {this.props.goals.map((goal, index) => {
          //<GoalItem key={index} goal={goal} />;
          /* <div key={index}>{goal.title}</div>; */
          return <GoalItem key={index} goal={goal} />;
        })}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { goals } = state; //(2)
  return {
    goals
  };
}

export default connect(mapStateToProps, { setGoals })(GoalList);
