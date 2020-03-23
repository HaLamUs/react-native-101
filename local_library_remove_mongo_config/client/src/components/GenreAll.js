import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import GenreList from "./GenreList";
import GenreDetail from "./GenreDetail";

class GenreAll extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/genre" component={GenreList} />
        <Route path="/genre/:id" component={GenreDetail} />
      </Switch>
    );
  }
}

export default GenreAll;
