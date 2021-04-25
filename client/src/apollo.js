import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import { CachePersistor, LocalStorageWrapper } from "apollo3-cache-persist";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        categorySearchCriteria: {
          read() {
            return categorySearchCriteriaVar();
          },
        },
        categoryGenreSearchCriteria: {
          read() {
            return categoryGenreSearchCriteriaVar();
          },
        },
        questionSearchCriteria: {
          read() {
            return questionSearchCriteriaVar();
          },
        },
        addQuestionCriteria: {
          read() {
            return addQuestionCriteriaVar();
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

//reactive vars
let categorySearchCriteriaVar;
let categoryGenreSearchCriteriaVar;
let questionSearchCriteriaVar;
let addQuestionCriteriaVar;

//check local storage for values
const savedCategorySearch = JSON.parse(
  localStorage.getItem("localCategorySearchCriteria")
);

const savedCategoryGenreSearch = JSON.parse(
  localStorage.getItem("localCategoryGenreSearchCriteria")
);

const savedQuestionSearch = JSON.parse(
  localStorage.getItem("localQuestionSearchCriteria")
);

const savedAddQuestionCriteria = JSON.parse(
  localStorage.getItem("localAddQuestionCriteria")
);

if (!savedCategorySearch) {
  categorySearchCriteriaVar = makeVar({
    activePage: 1,
    limit: 15,
    name: "",
    type: null,
    genres: [],
    partycategory: false,
    showasnew: false,
    showasupdated: false,
  });
} else {
  categorySearchCriteriaVar = makeVar(savedCategorySearch);
}

if (!savedCategoryGenreSearch) {
  categoryGenreSearchCriteriaVar = makeVar({
    activePage: 1,
    limit: 15,
    name: "",
    types: [],
  });
} else {
  categoryGenreSearchCriteriaVar = makeVar(savedCategoryGenreSearch);
}

if (!savedQuestionSearch) {
  questionSearchCriteriaVar = makeVar({
    activePage: 1,
    limit: 15,
    question: "",
    category: "",
    difficulty: "",
    type: "",
    publishedstatus: null,
  });
} else {
  questionSearchCriteriaVar = makeVar(savedQuestionSearch);
}

if (!savedAddQuestionCriteria) {
  addQuestionCriteriaVar = makeVar({
    category: "",
  });
} else {
  addQuestionCriteriaVar = makeVar(savedAddQuestionCriteria);
}

export {
  client,
  persistor,
  categorySearchCriteriaVar,
  categoryGenreSearchCriteriaVar,
  questionSearchCriteriaVar,
  addQuestionCriteriaVar,
};
