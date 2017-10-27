import React from "react";
import { TopPage, UserPage } from "./pages";
import { PrivateRoute } from "./containers";
import { Router, Route, Switch } from "react-router-dom";
import history from "helpers/history";

const routes = () => (
  <Router history={history}>
    <Switch>
      <PrivateRoute exact path="/user" component={UserPage} />
      <Route component={TopPage} />
    </Switch>
  </Router>
);

export default routes;
