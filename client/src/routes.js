import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//pages
import ProtectedRoute from "./ProtectedRoute";
import Login from "./pages/Login";
import Splash from "./pages/Splash";

const Routes = () => (
  <Router>
    <Switch>
      <ProtectedRoute exact path="/" component={Splash} />
      <Route path="/login" component={Login} />
    </Switch>
  </Router>
);

export default Routes;
