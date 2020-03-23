import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import BookList from "./BookList";
import BookDetail from "./BookDetail";

class BookAll extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/book" component={BookList} />
        <Route path="/book/:id" component={BookDetail} />
      </Switch>
    );
  }
}

export default BookAll;
