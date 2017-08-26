import React from 'react';
import {TopPage, UserPage} from './pages';
import {PrivateRoute} from './containers';
import {BrowserRouter, Route, Switch} from 'react-router-dom'

const routes = () => (
  <BrowserRouter>
    <Switch>
      <PrivateRoute exact path="/user" component={UserPage} />
      <Route path="/" component={TopPage} />
    </Switch>
  </BrowserRouter>
);

export default routes;
