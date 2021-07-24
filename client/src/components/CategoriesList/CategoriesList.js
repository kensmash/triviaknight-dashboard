import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Input,
  Table,
  Button,
  Icon,
  Grid,
  Label,
  Pagination,
} from "semantic-ui-react";
//components
import CatOptionsSelect from "./CatOptionsSelect";
import CatGameTypeSelect from "../CatGameTypeSelect/CatGameTypeSelect";
import CatTypeSelect from "../CatTypeSelect/CatTypeSelect";
import CatGenreSelect from "../CatGenreSelect/CatGenreSelect";
//graphql
import { useQuery } from "@apollo/client";
import { categorySearchCriteriaVar } from "../../apollo";
import QUERY_CATEGORIESPAGE from "../../apollo/queries/categoriesPage";
import QUERY_CLIENTCATEGORYSEARCH from "../../apollo/queries/client-categorySearchCriteria";

const CategoriesList = (props) => {
  const { data: { categorySearchCriteria } = {} } = useQuery(
    QUERY_CLIENTCATEGORYSEARCH
  );

  const variables = {
    input: {
      offset:
        categorySearchCriteria.limit *
          parseInt(categorySearchCriteria.activePage, 10) -
        categorySearchCriteria.limit,
      limit: categorySearchCriteria.limit,
      name: categorySearchCriteria.name,
      type: categorySearchCriteria.type,
      genres: categorySearchCriteria.genres,
      partycategory: categorySearchCriteria.partycategory,
      showasnew: categorySearchCriteria.showasnew,
      showasupdated: categorySearchCriteria.showasupdated,
    },
  };

  const {
    loading,
    data: { categoriespage } = {},
    fetchMore,
  } = useQuery(QUERY_CATEGORIESPAGE, {
    variables,
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      // console.log(data.categoriespage);
      //change currently selected page when no records for page greater than 1
      if (
        !data.categoriespage.categories.length &&
        categorySearchCriteria.activePage > 1
      ) {
        categorySearchCriteriaVar({
          ...categorySearchCriteriaVar(),
          activePage: 1,
        });
        persistLocalData();
      }
    },
  });

  const inputChangedHandler = (event) => {
    categorySearchCriteriaVar({
      ...categorySearchCriteriaVar(),
      name: event.target.value,
    });
    persistLocalData();
  };

  const clearCategorySearchHandler = () => {
    categorySearchCriteriaVar({
      ...categorySearchCriteriaVar(),
      name: "",
    });
    persistLocalData();
  };

  const catOptionsSelectHandler = (_e, data) => {
    if (data.value === "showasupdated") {
      console.log("updated");
      categorySearchCriteriaVar({
        ...categorySearchCriteriaVar(),
        showasupdated: true,
        showasnew: false,
      });
      persistLocalData();
    } else if (data.value === "showasnew") {
      categorySearchCriteriaVar({
        ...categorySearchCriteriaVar(),
        showasnew: true,
        showasupdated: false,
      });
      persistLocalData();
    } else {
      categorySearchCriteriaVar({
        ...categorySearchCriteriaVar(),
        showasupdated: false,
        showasnew: false,
      });
      persistLocalData();
    }
  };

  const catTypeSelectHandler = (_e, data) => {
    categorySearchCriteriaVar({
      ...categorySearchCriteriaVar(),
      type: data.value === "" ? null : data.value,
    });
    persistLocalData();
  };

  const catGameTypeSelectHandler = (_e, data) => {
    categorySearchCriteriaVar({
      ...categorySearchCriteriaVar(),
      partycategory: data.value === "" ? null : data.value,
    });
    persistLocalData();
  };

  const catGenreSelectHandler = (_e, data) => {
    categorySearchCriteriaVar({
      ...categorySearchCriteriaVar(),
      genres: data.value,
    });
    persistLocalData();
  };

  const fetchMoreData = (activePage) => {
    categorySearchCriteriaVar({
      ...categorySearchCriteriaVar(),
      activePage,
    });
    persistLocalData();
    fetchMore({
      variables: {
        offset:
          categorySearchCriteria.limit * parseInt(activePage, 10) -
          categorySearchCriteria.limit,
      },
    });
  };

  const persistLocalData = () => {
    //persist new reactive var value to local storage
    //since Apollo cache persist will not save reactive vars
    localStorage.setItem(
      "localCategorySearchCriteria",
      JSON.stringify(categorySearchCriteriaVar())
    );
  };

  const { match, history } = props;

  return (
    <>
      <Grid columns="equal" className="searchCriteria">
        <Grid.Row style={{ paddingBottom: 0 }}>
          <Grid.Column className="tablePerPageColumn">
            <CatGameTypeSelect
              value={categorySearchCriteria.partycategory}
              placeholder="Filter By Game Type"
              gameTypeSelectHandler={(event, data) =>
                catGameTypeSelectHandler(event, data)
              }
            />
          </Grid.Column>
          <Grid.Column className="tablePerPageColumn">
            <CatTypeSelect
              value={categorySearchCriteria.type}
              placeholder="Filter By Type"
              catTypeSelectHandler={(event, data) =>
                catTypeSelectHandler(event, data)
              }
            />
          </Grid.Column>

          <Grid.Column className="tablePerPageColumn">
            <CatGenreSelect
              pagetype="catlist"
              value={categorySearchCriteria.genres}
              categorytype={categorySearchCriteria.type}
              placeholder="Filter By Genres"
              catGenreSelectHandler={(event, data) =>
                catGenreSelectHandler(event, data)
              }
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column className="tablePerPageColumn">
            <CatOptionsSelect
              pagetype="catlist"
              value={
                categorySearchCriteria.showasnew
                  ? "showasnew"
                  : categorySearchCriteria.showasupdated
                  ? "showasupdated"
                  : null
              }
              placeholder="Filter Options"
              catOptionsSelectHandler={(event, data) =>
                catOptionsSelectHandler(event, data)
              }
            />
          </Grid.Column>
          <Grid.Column className="tablePerPageColumn">
            <Input icon fluid>
              <input
                placeholder="Search by Category Name"
                value={categorySearchCriteria.name}
                onChange={inputChangedHandler}
              />

              {categorySearchCriteria.name !== "" ? (
                <Button icon="x" onClick={() => clearCategorySearchHandler()} />
              ) : (
                <Icon name="search" />
              )}
            </Input>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Questions</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Joust Only</Table.HeaderCell>
            <Table.HeaderCell>Quest Active</Table.HeaderCell>
            <Table.HeaderCell>Next Quest Active</Table.HeaderCell>
            <Table.HeaderCell>Type</Table.HeaderCell>
            <Table.HeaderCell>Genres</Table.HeaderCell>
            <Table.HeaderCell />
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
              {categoriespage.categories.length ? (
                categoriespage.categories.map((cat) => (
                  <Table.Row key={cat._id}>
                    <Table.Cell>
                      {cat.partycategory && (
                        <Label as="a" color="orange" horizontal>
                          Party
                        </Label>
                      )}
                      {cat.showasnew && (
                        <Label as="a" color="teal" horizontal>
                          New
                        </Label>
                      )}
                      {cat.showasupdated && (
                        <Label as="a" color="blue" horizontal>
                          Updated
                        </Label>
                      )}
                      <Link to={`${match.url}/${cat._id}`}>{cat.name}</Link>
                    </Table.Cell>
                    <Table.Cell>{cat.questions}</Table.Cell>

                    <Table.Cell className="publishedstatuscell">
                      {cat.published ? "Published" : "Draft"}
                    </Table.Cell>

                    <Table.Cell className="publishedstatuscell">
                      {cat.joustexclusive ? "Yes" : "No"}
                    </Table.Cell>

                    <Table.Cell>{cat.questactive ? "Yes" : "No"}</Table.Cell>

                    <Table.Cell>
                      {cat.nextquestactive ? "Yes" : "No"}
                    </Table.Cell>

                    <Table.Cell>{cat.type && cat.type.name}</Table.Cell>

                    <Table.Cell>
                      {cat.genres.length
                        ? cat.genres.map((genre) => genre.name).join(", ")
                        : null}
                    </Table.Cell>
                    <Table.Cell collapsing>
                      <Button
                        icon
                        size="mini"
                        onClick={() => history.push(`${match.url}/${cat._id}`)}
                      >
                        <Icon name="edit" />
                      </Button>
                    </Table.Cell>
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
                <Table.HeaderCell colSpan="98">
                  <Grid columns="equal">
                    <Grid.Column width={2}>
                      <div className="tableItemNumbers">
                        <p>
                          {categoriespage.totalrecords} item
                          {categoriespage.totalrecords !== 1 ? "s" : ""}
                        </p>
                      </div>
                    </Grid.Column>

                    <Grid.Column className="tablePaginationColumn">
                      {categoriespage.pages >= 2 ? (
                        <Pagination
                          activePage={categorySearchCriteria.activePage}
                          totalPages={categoriespage.pages}
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

CategoriesList.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default CategoriesList;
