import React from 'react';
import {TopPage, LoginPage, SignupPage, UserPage} from './pages';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom'

const routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/user/:id" component={UserPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/signup" component={SignupPage} />
      <Route component={TopPage} />
    </Switch>
  </BrowserRouter>
);

export default routes;
