import React from "react";
import { TopPage, UserPage } from "./pages";
import { PrivateRoute, GuestRoute } from "./containers";
import { Router, Route, Switch } from "react-router-dom";
import history from "helpers/history";

const routes = () => (
  <Router history={history}>
    <Switch>
      <PrivateRoute exact path="/user" component={UserPage} />
      <GuestRoute component={TopPage} />
    </Switch>
  </Router>
);

export default routes;
