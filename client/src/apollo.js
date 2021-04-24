import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import { CachePersistor, LocalStorageWrapper } from "apollo3-cache-persist";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        questionSearchCriteria: {
          read() {
            return questionSearchCriteriaVar();
          },
        },
      },
    },
  },
});
//persist local cache https://gist.github.com/randytorres/2d8c36f567a1be7ddb89bb7b8ca7929d
const persistor = new CachePersistor({
  cache,
  storage: new LocalStorageWrapper(window.localStorage),
  debug: true,
  trigger: "write",
});

const client = new ApolloClient({
  cache,
  uri: "/graphql",
  credentials:
    process.env.NODE_ENV === "production" ? "same-origin" : "include",
});

const questionSearchCriteriaVar = makeVar({
  activePage: 1,
  limit: 15,
  question: "",
  category: "",
  difficulty: "",
  type: "",
  publishedstatus: null,
});

export { client, persistor, questionSearchCriteriaVar };
