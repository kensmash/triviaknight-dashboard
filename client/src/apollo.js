import { ApolloClient, InMemoryCache } from "@apollo/client";
import { CachePersistor } from "apollo-cache-persist";
//queries
import QUERY_CATEGORYSEARCH from "./apollo/queries/client-categorySearchCriteria";
import QUERY_CATEGORYGENRESEARCH from "./apollo/queries/client-categoryGenreSearchCriteria";
import QUERY_QUESTIONSEARCH from "./apollo/queries/client-questionSearchCriteria";
import QUERY_ADDQUESTIONCRITERIA from "./apollo/queries/client-addQuestionCriteria";
//use Apollo Link State for local application data
const cache = new InMemoryCache();
//persist local cache https://gist.github.com/randytorres/2d8c36f567a1be7ddb89bb7b8ca7929d
const persistor = new CachePersistor({
  cache,
  storage: window.sessionStorage,
  //debug: true
});

const client = new ApolloClient({
  cache,
  uri: "/graphql",
  credentials:
    process.env.NODE_ENV === "production" ? "same-origin" : "include",
});

function writeInitialData() {
  cache.writeQuery({
    query: QUERY_CATEGORYSEARCH,
    data: {
      activePage: 1,
      limit: 15,
      name: "",
      type: null,
      genres: [],
      partycategory: false,
      showasnew: false,
      showasupdated: false,
    },
  });
  cache.writeQuery({
    query: QUERY_CATEGORYGENRESEARCH,
    data: {
      activePage: 1,
      limit: 15,
      name: "",
      types: [],
    },
  });
  cache.writeQuery({
    query: QUERY_QUESTIONSEARCH,
    data: {
      activePage: 1,
      limit: 15,
      question: "",
      category: "",
      difficulty: "",
      type: "",
      publishedstatus: null,
    },
  });
  cache.writeQuery({
    query: QUERY_ADDQUESTIONCRITERIA,
    data: {
      category: "",
    },
  });
}

writeInitialData();

client.onResetStore(writeInitialData);

client.persistor = persistor;

export { client, persistor };
