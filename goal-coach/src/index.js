import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";
import { firebaseApp } from "./firebase";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import { logUser } from "./actions";

import App from "./Components/App";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";

const store = createStore(reducer);

firebaseApp.auth().onAuthStateChanged(user => {
  if (user) {
    console.log("user has signed in or up", user);
    const { email } = user;
    store.dispatch(logUser(email));
    // hook up reducer de qua thang App co cai ma xai
    // dispatch 1 cai action

    // <Route path="/app" component={App} />;
    // lam bang tay cho no qua App
  } else {
    console.log("user has signed out or still needs to sign in");
  }
});

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Route path="/app" component={App} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
