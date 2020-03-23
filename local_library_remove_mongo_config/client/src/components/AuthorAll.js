import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import AuthorList from "./AuthorList";
import AuthorDetail from "./AuthorDetail";

class AuthorAll extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/author" component={AuthorList} />
        <Route path="/author/:id" component={AuthorDetail} />
      </Switch>
    );
  }
}

export default AuthorAll;
