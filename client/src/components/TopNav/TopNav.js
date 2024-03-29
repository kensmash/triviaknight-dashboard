import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Dropdown } from "semantic-ui-react";
//graphql
import { gql, useMutation, useApolloClient } from "@apollo/client";

const TopNav = (props) => {
  const [activeItem, setActiveItem] = useState("");

  const [logOut] = useMutation(LOGOUT_MUTATION);

  const handleItemClick = (_e, { name }) => setActiveItem(name);

  const client = useApolloClient();

  const logoutHandler = async () => {
    await logOut();
    await client.resetStore();
    props.history.push("/login");
  };

  return (
    <Menu inverted stackable>
      <Menu.Item
        as={Link}
        to={"/"}
        name="Trivia Knight"
        active={activeItem === "home"}
        onClick={handleItemClick}
      />

      <Menu.Menu position="right">
        <Menu.Item as={Link} to={"/"} name="dashboard" />
        <Dropdown item text="Questions">
          <Dropdown.Menu>
            <Dropdown.Item
              as={Link}
              to={"/questions"}
              active={activeItem === "questions"}
            >
              All Questions
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item as={Link} to={"/questions/new"}>
              New Question
            </Dropdown.Item>
            <Dropdown.Item as={Link} to={"/questions/reports"}>
              Question Reports
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown item text="Categories">
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to={"/categories"}>
              Categories
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item as={Link} to={"/categorytypes"}>
              Category Types
            </Dropdown.Item>
            <Dropdown.Item as={Link} to={"/categorygenres"}>
              Category Genres
            </Dropdown.Item>
            <Dropdown.Item as={Link} to={"/categorygroups"}>
              Category Groups
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown item text="Games">
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to={"/joustgames"}>
              Joust Games
            </Dropdown.Item>
            <Dropdown.Item as={Link} to={"/siegegames"}>
              Siege Games
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Menu.Item as={Link} to={"/users"} name="Users" />

        <Menu.Item name="logout" onClick={logoutHandler} />
      </Menu.Menu>
    </Menu>
  );
};

const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout {
      success
    }
  }
`;

export default TopNav;
