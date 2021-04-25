import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Header,
  Table,
  Button,
  Icon,
  Grid,
  Form,
  Select,
  Input,
  Pagination,
} from "semantic-ui-react";
//components
import CategorySelect from "./helpers/CategorySelect";
import DifficultySelect from "./helpers/DifficultySelect";
import TypeSelect from "./helpers/TypeSelect";
import StatusSelect from "./helpers/StatusSelect";
//graphql
import { useQuery } from "@apollo/client";
import { questionSearchCriteriaVar } from "../../apollo";
import QUERY_QUESTIONSPAGE from "../../apollo/queries/questionsPage";
import QUERY_QUESTIONSEARCH from "../../apollo/queries/client-questionSearchCriteria";

const QuestionsList = (props) => {
  const [perPageOptions] = useState([
    { value: 10, text: "10" },
    { value: 15, text: "15" },
    { value: 20, text: "20" },
  ]);

  const { data: { questionSearchCriteria } = {} } = useQuery(
    QUERY_QUESTIONSEARCH
  );

  const variables = {
    offset:
      questionSearchCriteria.limit *
        parseInt(questionSearchCriteria.activePage, 10) -
      questionSearchCriteria.limit,
    limit: questionSearchCriteria.limit,
    question: questionSearchCriteria.question,
    category: questionSearchCriteria.category,
    difficulty: questionSearchCriteria.difficulty,
    type: questionSearchCriteria.type,
    published: questionSearchCriteria.publishedstatus,
  };

  console.log("offset", variables.offset);

  const { loading, data: { questionspage } = {}, fetchMore } = useQuery(
    QUERY_QUESTIONSPAGE,
    {
      variables,
      fetchPolicy: "cache-and-network",
      onCompleted: (data) => {
        //change currently selected page when no records for page greater than 1
        if (
          !data.questionspage.questions.length &&
          questionSearchCriteria.activePage > 1
        ) {
          questionSearchCriteriaVar({
            ...questionSearchCriteriaVar(),
            activePage: 1,
          });
          persistLocalData();
        }
      },
    }
  );

  const perPageChangeHandler = (_e, data) => {
    questionSearchCriteriaVar({
      ...questionSearchCriteriaVar(),
      limit: data.value,
    });
    persistLocalData();
  };

  const inputChangedHandler = (event) => {
    questionSearchCriteriaVar({
      ...questionSearchCriteriaVar(),
      question: event.target.value,
    });
    persistLocalData();
  };

  const clearQuestionSearchHandler = () => {
    questionSearchCriteriaVar({
      ...questionSearchCriteriaVar(),
      question: "",
    });
    persistLocalData();
  };

  const categorySelectHandler = (_e, data) => {
    questionSearchCriteriaVar({
      ...questionSearchCriteriaVar(),
      category: data.value,
    });
    persistLocalData();
  };

  const difficultySelectHandler = (_e, data) => {
    questionSearchCriteriaVar({
      ...questionSearchCriteriaVar(),
      difficulty: data.value,
    });
    persistLocalData();
  };

  const typeSelectHandler = (_e, data) => {
    questionSearchCriteriaVar({
      ...questionSearchCriteriaVar(),
      type: data.value,
    });
    persistLocalData();
  };

  const publishedSelectHandler = (_e, data) => {
    questionSearchCriteriaVar({
      ...questionSearchCriteriaVar(),
      publishedstatus: data.value === "" ? null : data.value,
    });
    persistLocalData();
  };

  const fetchMoreData = (activePage) => {
    questionSearchCriteriaVar({
      ...questionSearchCriteriaVar(),
      activePage,
    });
    persistLocalData();
    fetchMore({
      variables: {
        offset:
          questionSearchCriteria.limit * parseInt(activePage, 10) -
          questionSearchCriteria.limit,
      },
    });
  };

  const persistLocalData = () => {
    //persist new reactive var value to local storage
    //since Apollo cache persist will not save reactive vars
    localStorage.setItem(
      "localQuestionSearchCriteria",
      JSON.stringify(questionSearchCriteriaVar())
    );
  };

  console.log("data?", questionspage);

  const { match } = props;

  return (
    <>
      <Grid columns="equal" className="searchCriteria">
        <Grid.Row>
          <Grid.Column width={4}>
            <Header as="h2">Questions</Header>
          </Grid.Column>
          <Grid.Column className="tablePerPageColumn">
            <Form>
              <Form.Group inline>
                <Form.Field
                  control={Select}
                  label="Per Page:"
                  options={perPageOptions}
                  value={questionSearchCriteria.limit}
                  onChange={(event, data) => perPageChangeHandler(event, data)}
                />
              </Form.Group>
            </Form>
          </Grid.Column>
          <Grid.Column className="tablePerPageColumn">
            <Input icon fluid>
              <input
                placeholder="Search by Question"
                value={questionSearchCriteria.question}
                onChange={inputChangedHandler}
              />

              {questionSearchCriteria.question !== "" ? (
                <Button icon="x" onClick={() => clearQuestionSearchHandler()} />
              ) : (
                <Icon name="search" />
              )}
            </Input>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column
            className="tablePerPageColumn"
            mobile={16}
            tablet={8}
            computer={4}
          >
            <TypeSelect
              value={questionSearchCriteria.type}
              typeSelectHandler={(event, data) =>
                typeSelectHandler(event, data)
              }
            />
          </Grid.Column>
          <Grid.Column
            className="tablePerPageColumn"
            mobile={16}
            tablet={8}
            computer={4}
          >
            <CategorySelect
              value={questionSearchCriteria.category}
              categorySelectHandler={(event, data) =>
                categorySelectHandler(event, data)
              }
            />
          </Grid.Column>
          <Grid.Column
            className="tablePerPageColumn mobileColumn"
            mobile={16}
            tablet={8}
            computer={4}
          >
            <DifficultySelect
              value={questionSearchCriteria.difficulty}
              difficultySelectHandler={(event, data) =>
                difficultySelectHandler(event, data)
              }
            />
          </Grid.Column>
          <Grid.Column
            className="tablePerPageColumn mobileColumn"
            mobile={16}
            tablet={8}
            computer={4}
          >
            <StatusSelect
              value={questionSearchCriteria.publishedstatus}
              publishedSelectHandler={(event, data) =>
                publishedSelectHandler(event, data)
              }
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Question</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Category</Table.HeaderCell>
            <Table.HeaderCell>Difficulty</Table.HeaderCell>
            <Table.HeaderCell>Type</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        {loading ? (
          <Table.Body>
            <Table.Row>
              <Table.Cell>Loading...</Table.Cell>
            </Table.Row>
          </Table.Body>
        ) : (
          <>
            <Table.Body>
              {questionspage.questions.length ? (
                questionspage.questions.map((ques) => (
                  <Table.Row key={ques._id}>
                    <Table.Cell>
                      <Link to={`${match.url}/${ques._id}`}>
                        {ques.question}
                      </Link>
                    </Table.Cell>
                    <Table.Cell className="publishedstatuscell">
                      {ques.published ? "Published" : "Draft"}
                    </Table.Cell>
                    <Table.Cell>
                      {ques.category && ques.category.name
                        ? ques.category.name
                        : null}
                    </Table.Cell>
                    <Table.Cell>{ques.difficulty}</Table.Cell>
                    <Table.Cell>{ques.type}</Table.Cell>
                  </Table.Row>
                ))
              ) : (
                <Table.Row>
                  <Table.Cell>
                    <p>Sorry, no records matched your search.</p>
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan="5">
                  <Grid columns="equal">
                    <Grid.Column width={2}>
                      <div className="tableItemNumbers">
                        <p>
                          {questionspage.totalrecords} item
                          {questionspage.totalrecords !== 1 ? "s" : ""}
                        </p>
                      </div>
                    </Grid.Column>

                    <Grid.Column className="tablePaginationColumn">
                      {questionspage.pages >= 2 ? (
                        <Pagination
                          activePage={questionSearchCriteria.activePage}
                          totalPages={questionspage.pages}
                          onPageChange={(e, { activePage }) =>
                            fetchMoreData(activePage)
                          }
                        />
                      ) : null}
                    </Grid.Column>
                  </Grid>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </>
        )}
      </Table>
    </>
  );
};

QuestionsList.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default QuestionsList;
