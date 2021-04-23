import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//pages
import ProtectedRoute from "./ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
//announcements
import Announcements from "./pages/Announcements";
import EditAnnouncement from "./pages/EditAnnouncement";

const Routes = () => (
  <Router>
    <Switch>
      <ProtectedRoute exact path="/" component={Dashboard} />
      <ProtectedRoute exact path="/announcements" component={Announcements} />
      <ProtectedRoute
        exact
        path="/announcements/:_id"
        component={EditAnnouncement}
      />
      <Route path="/login" component={Login} />
    </Switch>
  </Router>
);

export default Routes;
