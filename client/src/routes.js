import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//pages
import ProtectedRoute from "./ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
//announcements
import Announcements from "./pages/Announcements";
import EditAnnouncement from "./pages/EditAnnouncement";
//categories
import Categories from "./pages/Categories/Categories";
import EditCategory from "./pages/EditCategory/EditCategory";
import CategoryTypes from "./pages/CategoryTypes/CategoryTypes";
import EditCategoryType from "./pages/EditCategoryType/EditCategoryType";
import CategoryGenres from "./pages/CategoryGenres/CategoryGenres";
import EditCategoryGenre from "./pages/EditCategoryGenre/EditCategoryGenre";
import CategoryGroups from "./pages/CategoryGroups/CategoryGroups";
import EditCategoryGroup from "./pages/EditCategoryGroup/EditCategoryGroup";

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
      <ProtectedRoute exact path={"/categories"} component={Categories} />
      <ProtectedRoute
        exact
        path={"/categories/:_id"}
        name="Edit Category"
        component={EditCategory}
      />
      <ProtectedRoute exact path={"/categorytypes"} component={CategoryTypes} />
      <ProtectedRoute
        exact
        path={"/categorytypes/:_id"}
        name="Edit Category Type"
        component={EditCategoryType}
      />
      <ProtectedRoute
        exact
        path={"/categorygenres"}
        component={CategoryGenres}
      />
      <ProtectedRoute
        exact
        path={"/categorygenres/:_id"}
        name="Edit Category Genre"
        component={EditCategoryGenre}
      />
      <ProtectedRoute
        exact
        path={"/categorygroups"}
        component={CategoryGroups}
      />
      <ProtectedRoute
        exact
        path={"/categorygroups/:_id"}
        name="Edit Category Group"
        component={EditCategoryGroup}
      />
      <Route path="/login" component={Login} />
    </Switch>
  </Router>
);

export default Routes;
