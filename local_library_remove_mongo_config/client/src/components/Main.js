//The Main component will render route's component

import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import GenreAll from "./GenreAll";
import BookInstanceAll from "./BookInstanceAll";
import BookAll from "./BookAll";
import AuthorAll from "./AuthorAll";
import GenreForm from "./GenreForm";
import BookInstanceForm from "./BookInstanceForm";
import AuthorForm from "./AuthorForm";
import BookForm from "./BookForm";

class Main extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/book" component={BookAll} />
          <Route path="/author" component={AuthorAll} />
          <Route path="/genre" component={GenreAll} />
          <Route path="/bookinstance" component={BookInstanceAll} />
          <Route path="/catalog/genre/create" component={GenreForm} />
          <Route
            path="/catalog/bookinstance/create"
            component={BookInstanceForm}
          />
          <Route path="/catalog/author/create" component={AuthorForm} />
          <Route path="/catalog/book/create" component={BookForm} />
        </Switch>
      </div>
    );
  }
}

export default Main;
