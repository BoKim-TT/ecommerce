import styled from "styled-components";
import { NavLink as BaseNavLink } from "react-router-dom";
import { useContext } from "react";
import { ShoppingContext } from "../contexts/shoppingContext";

export const FilterHeader = () => {
  const { setSearch } = useContext(ShoppingContext);

  const categorySearch = () => {
    setSearch("");
  };
  return (
    // hard linked everything to appropriate category page
    // these are the filter options to find items in specific category
    <Header>
      <Filter>
        <SearchList>
          {" "}
          <NavLink to={`/items/category/Fitness`} >
            Fitness
          </NavLink>
        </SearchList>

        <SearchList>
          <NavLink to={`/items/category/Lifestyle`} onClick={categorySearch}>
            Lifestyle
          </NavLink>
        </SearchList>

        <SearchList>
          <NavLink to={`/items/category/Medical`} onClick={categorySearch}>
            Medical
          </NavLink>
        </SearchList>

        <SearchList>
          {" "}
          <NavLink to={`/items/category/Gaming`} onClick={categorySearch}>
            Gaming
          </NavLink>
        </SearchList>

        <SearchList>
          {" "}
          <NavLink
            to={`/items/category/Entertainment`}
            onClick={categorySearch}
          >
            Entertainment
          </NavLink>
        </SearchList>

        <SearchList>
          {" "}
          <NavLink
            to={`/items/category/Pets%20and%20Animals`}
            onClick={categorySearch}
          >
            Pets
          </NavLink>
        </SearchList>
      </Filter>
    </Header>
  );
};

export default FilterHeader;

const Header = styled.div`
  width: 60%;
  height: 50px;
`;

const Filter = styled.ul`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

const SearchList = styled.li``;
const NavLink = styled(BaseNavLink)`
  padding: 5px;
  color: white;
  font-family: var(--font-opensans);
  font-size: var(--font-regular);
  font-weight: var(--weight-regular);
  text-decoration: none;
  transition: transform 250ms;

  &.active {
    color: red;
  }

  :hover {
    transform: translateY(-2px);
  }
`;
