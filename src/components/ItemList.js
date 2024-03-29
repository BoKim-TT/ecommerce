import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { SearchBarContext, ShoppingContext } from '../contexts/shoppingContext';
import backgroundImg from '../assets/background-img.jpg';
import Alert from '@mui/material/Alert';

const ItemList = ({ listedItems }) => {
  const { setSearch } = useContext(ShoppingContext);
  const clearSearch = () => {
    setSearch('');
  };
  return (
    <ItemsView>
      <Wrapper>
        {
          //if the filteredItems array has no items tell the user
          listedItems.length === 0 ? (
            <Alert
              icon={false}
              sx={{
                margin: '5% auto',
                fontSize: '20px',
                width: '100%',
                '& .MuiAlert-message': {
                  textAlign: 'center',
                  width: 'inherit',
                },
              }}
            >
              There are no items that match your search!
            </Alert>
          ) : (
            //display items based on what is serached in search bar will show everything if nothing is typed
            listedItems.map((item) => {
              return (
                <Item
                  key={item._id}
                  to={`/item/${item._id}`}
                  onClick={clearSearch}
                >
                  <Img
                    key={item._id}
                    src={item.imageSrc}
                    alt={item.name}
                    loading="lazy"
                  />
                  <Name>{item.name}</Name>
                </Item>
              );
            })
          )
        }
      </Wrapper>
    </ItemsView>
  );
};

export default ItemList;

const ItemsView = styled.div`
  width: 100%;
  padding: 20px 0;
  text-align: center;
`;
const Wrapper = styled.div`
  width: 85%;
  padding: 10px;
  display: inline-grid;
  grid-template-columns: auto auto auto auto;
  gap: 20px;
  justify-content: space-between;
  /* background-color: aliceblue; */
`;

const Item = styled(Link)`
  max-width: 250px;
  max-height: 280px;
  padding: 5px;
  width: auto;
  height: auto;
  border: 1px solid black;
  background-color: white;
  color: black;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  transition: transform 250ms, box-shadow 0.25s ease-in-out;

  :hover {
    cursor: pointer;
    transform: translateY(-7px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
`;

const Img = styled.img`
  max-width: 180px;
  max-height: 180px;
  width: auto;
  height: auto;
  padding: 5px;
`;

const Name = styled.div`
  font-family: var(--font-poppins);
  font-size: 13px;
  font-weight: var(--weight-semi-bold);
  text-align: center;
  padding: 3px 5px;
  text-decoration: none;
`;
