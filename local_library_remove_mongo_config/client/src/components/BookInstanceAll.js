import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import BookInstanceList from "./BookInstanceList";
import BookInstanceDetail from "./BookInstanceDetail";

class BookInstanceAll extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/bookinstance" component={BookInstanceList} />
        <Route path="/bookinstance/:id" component={BookInstanceDetail} />
      </Switch>
    );
  }
}

export default BookInstanceAll;
