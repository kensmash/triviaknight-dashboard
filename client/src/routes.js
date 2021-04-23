import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//layout
import Layout from "./components/Layout/Layout";
//nav
import TopNav from "./components/TopNav/TopNav";
//pages
import ProtectedRoute from "./ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
//announcements
import Announcements from "./pages/Announcements";
import EditAnnouncement from "./pages/EditAnnouncement";
//categories
import Categories from "./pages/Categories";
import EditCategory from "./pages/EditCategory";
import CategoryTypes from "./pages/CategoryTypes";
import EditCategoryType from "./pages/EditCategoryType";
import CategoryGenres from "./pages/CategoryGenres";
import EditCategoryGenre from "./pages/EditCategoryGenre";
import CategoryGroups from "./pages/CategoryGroups";
import EditCategoryGroup from "./pages/EditCategoryGroup";
//questions
import Questions from "./pages/Questions";
import NewQuestion from "./pages/NewQuestion";
import EditQuestion from "./pages/EditQuestion";
import QuestionReports from "./pages/QuestionReports";
//games
import GamesJoust from "./pages/GamesJoust";
import GamesSiege from "./pages/GamesSiege";
//support
import SupportRequests from "./pages/SupportRequests";
//push notifications
import PushTickets from "./pages/PushTickets";
import PushReceipts from "./pages/PushReceipts";
//users
import Users from "./pages/Users";

const Routes = () => (
  <Router>
    <Route path="/" component={TopNav} />
    <Layout>
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
        <ProtectedRoute
          exact
          path={"/categorytypes"}
          component={CategoryTypes}
        />
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
        <ProtectedRoute exact path={"/questions"} component={Questions} />
        <Route
          exact
          path={"/questions/new"}
          name="New Question"
          component={NewQuestion}
        />
        <ProtectedRoute
          exact
          path={"/questions/reports"}
          name="Question Reports"
          component={QuestionReports}
        />
        <ProtectedRoute
          exact
          path={"/questions/:_id"}
          name="Edit Question"
          component={EditQuestion}
        />
        <ProtectedRoute
          exact
          path={"/joustgames"}
          name="Joust Games"
          component={GamesJoust}
        />
        <ProtectedRoute
          exact
          path={"/siegegames"}
          name="Siege Games"
          component={GamesSiege}
        />
        <ProtectedRoute exact path={"/users"} name="Users" component={Users} />
        <ProtectedRoute
          exact
          path={"/supportrequests"}
          name="Support Requests"
          component={SupportRequests}
        />
        <ProtectedRoute exact path={"/pushtickets"} component={PushTickets} />
        <ProtectedRoute exact path={"/pushreceipts"} component={PushReceipts} />
        <Route path="/login" component={Login} />
      </Switch>
    </Layout>
  </Router>
);

export default Routes;
