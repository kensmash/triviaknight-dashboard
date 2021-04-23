import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Dimmer, Loader } from "semantic-ui-react";
//graphql
import { useQuery } from "@apollo/client";
import currentUserQuery from "./apollo/queries/currentUser";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  //check for current user here
  const { loading, data: { currentUser } = {} } = useQuery(currentUserQuery, {
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

  if (loading)
    return (
      <Dimmer active>
        <Loader />
      </Dimmer>
    );

  return (
    <Route
      render={(props) =>
        !currentUser ? <Redirect to="/login" /> : <Component {...props} />
      }
      {...rest}
    />
  );
};

export default ProtectedRoute;
