import React from 'react';
import {TopPage, LoginPage, SignupPage, UserPage} from './pages';
import {PrivateRoute, GuestRoute} from './containers';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom'

const routes = () => (
  <BrowserRouter>
    <Switch>
      <PrivateRoute exact path="/user" component={UserPage} />
      <GuestRoute exact path="/login" component={LoginPage} />
      <Route exact path="/signup" component={SignupPage} />
      <Route path="/" component={TopPage} />
    </Switch>
  </BrowserRouter>
);

export default routes;
