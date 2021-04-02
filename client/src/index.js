import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Dimmer, Loader } from "semantic-ui-react";
import Routes from "./routes";
//yo apollo
import { ApolloProvider } from "@apollo/client";
import { client, persistor } from "./apollo";

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

  return (
    <>
      {!isRestored ? (
        <Dimmer active>
          <Loader />
        </Dimmer>
      ) : (
        <ApolloProvider client={client}>
          <Routes />
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
