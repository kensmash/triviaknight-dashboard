import React, { useState, useEffect, useContext, useReducer } from "react";
import ReactDOM from "react-dom";
import { Dimmer, Loader } from "semantic-ui-react";
import Routes from "./routes";
//yo apollo
import { ApolloProvider } from "@apollo/client";
import { client, persistor } from "./apollo";
//context
import UserContext from "./context/context";
import reducer from "./context/reducer";
//css
import "semantic-ui-css/semantic.min.css";
import "./index.css";

function App() {
  const [isRestored, setIsRestored] = useState(false);

  useEffect(() => {
    persistor.restore().then(() => {
      setIsRestored(true);
    });
  }, []);

  const initialState = useContext(UserContext);

  const [state, dispatch] = useReducer(reducer, initialState);

  console.log("user?", state);

  return (
    <>
      {!isRestored ? (
        <Dimmer active>
          <Loader />
        </Dimmer>
      ) : (
        <ApolloProvider client={client}>
          <UserContext.Provider value={{ state, dispatch }}>
            <Routes />
          </UserContext.Provider>
        </ApolloProvider>
      )}
    </>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
