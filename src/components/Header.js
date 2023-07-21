import {
  IoBowlingBall,
  IoCartOutline,
  IoSearch,
  IoList,
} from 'react-icons/io5';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useContext, useEffect } from 'react';
import { ShoppingContext } from '../contexts/shoppingContext';
import { FilterHeader } from './FilterHeader';
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const Header = () => {
  const user = 'user';

  const { search, setSearch, cartCount, setCartCount, cartItems } =
    useContext(ShoppingContext);

  useEffect(() => {
    try {
      fetch(`${API_ENDPOINT}/api/cart/${user}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status !== 200) {
            setCartCount(0);
          }
          if (data.status === 200) {
            setCartCount(
              data.data.purchasedItems.reduce((accu, curr) => {
                return accu + Number(curr.quantity);
              }, 0)
            );
          }
        });
    } catch (err) {
      console.log(err);
    }
  }, [cartItems]);

  const clearSearch = () => {
    setSearch('');
  };

  return (
    <Wrapper>
      <Logo>
        <HomeLink to={'/'} onClick={clearSearch}>
          <IoBowlingBall size={40} />
        </HomeLink>
      </Logo>
      <FilterHeader />
      <Icons>
        <SearchContainer>
          <SearchIcon>
            <IoSearch size={16} />
          </SearchIcon>
          <SearchBar
            className="input"
            onChange={(e) => {
              setSearch(e.target.value.toLowerCase());
            }}
            value={search}
          ></SearchBar>
        </SearchContainer>
        <Cart>
          <LinkCart to={'/cart'} onClick={clearSearch}>
            {cartCount !== 0 && <ItemInCart>{cartCount}</ItemInCart>}
            <IoCartOutline size={25} />
          </LinkCart>
        </Cart>

        <Order>
          <LinkOrder to={'/order/user'} onClick={clearSearch}>
            <IoList size={25} />
          </LinkOrder>
        </Order>
      </Icons>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  /* background-color:#D8D8D8; */
  width: 100%;
  height: fit-content;
  min-height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
`;

const Logo = styled.div`
  width: 5%;
  margin-left: 2%;
`;

const HomeLink = styled(Link)`
  text-decoration: none;
  color: blue;
  :hover {
    cursor: pointer;
    opacity: 0.6;
  }
`;

const Icons = styled.div`
  width: 20%;
  height: 50px;
  margin-right: 2%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const SearchContainer = styled.div`
  /* background-color: green; */
  width: 55%;
  height: 30px;
  display: flex;
  align-items: center;
`;
const SearchIcon = styled.div`
  margin: 0 5px;
`;

const SearchBar = styled.input`
  border: 1px solid var(--color-font-darkgray);
  height: 17px;
  width: 70%;
`;

const Cart = styled.div`
  text-align: center;
  width: 20%;
  height: 25px;
  position: relative;
  :hover {
    cursor: pointer;
    opacity: 0.6;
  }
`;
const LinkCart = styled(Link)`
  text-decoration: none;
  color: white;
  :hover {
    cursor: pointer;
    opacity: 0.6;
  }
`;
const ItemInCart = styled.div`
  color: blue;
  padding: 1px;
  width: 13px;
  height: 13px;
  font-size: 10px;
  font-family: arial;
  font-weight: 600;
  border-radius: 50%;
  background-color: yellowgreen;
  text-align: center;
  position: absolute;
  right: -2px;
  bottom: -7px;
`;
const Order = styled.div`
  width: 20%;
  height: 25px;
  text-align: center;
  :hover {
    cursor: pointer;
    opacity: 0.6;
  }
`;
const LinkOrder = styled(Link)`
  text-decoration: none;
  color: white;
  :hover {
    cursor: pointer;
    opacity: 0.6;
  }
`;
