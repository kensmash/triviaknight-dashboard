import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Card } from "semantic-ui-react";
//big widgets
import UsersWidget from "../../../components/Dashboard/UsersWidget";
import QuestionsWidget from "../../../components/Dashboard/QuestionsWidget";
import CategoriesWidget from "../../../components/Dashboard/CategoriesWidget";
//smaller widgets
import QuestionReportsWidget from "../../../components/Dashboard/QuestionReportsWidget";
import QuestTopicWidget from "../../../components/Dashboard/QuestTopicWidget";
import PushTicketsWidget from "../../../components/Dashboard/PushTicketsWidget";
import PushReceiptsWidget from "../../../components/Dashboard/PushReceiptsWidget";
import AnnouncementsWidget from "../../../components/Dashboard/AnnouncementsWidget";

const Dashboard = ({ history }) => (
  <Fragment>
    <Card.Group stackable itemsPerRow={3}>
      <UsersWidget history={history} />
      <QuestionsWidget history={history} />
      <CategoriesWidget history={history} />
    </Card.Group>
    <Card.Group stackable itemsPerRow={5}>
      <QuestTopicWidget history={history} />
      <AnnouncementsWidget history={history} />
      <QuestionReportsWidget history={history} />
      <PushTicketsWidget history={history} />
      <PushReceiptsWidget history={history} />
    </Card.Group>
  </Fragment>
);

Dashboard.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
};

export default Dashboard;
