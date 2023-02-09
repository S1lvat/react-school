import React from 'react';
import { Switch } from 'react-router-dom';

// import Home from '../Pages/Home';
import Login from '../Pages/Login';
import Page404 from '../Pages/Page404';
import MyRoute from './MyRoute';

export default function Routes() {
  return (
    <Switch>
      {/* <MyRoute exact path="/" component={Home} /> */}
      <MyRoute path="/login" component={Login} />
      <MyRoute path="*" component={Page404} />
    </Switch>
  );
}
