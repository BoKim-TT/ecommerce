import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { IoRefresh } from 'react-icons/io5';
import { ShoppingContext } from '../contexts/shoppingContext';
import Loading from './Loading';
import ItemList from './ItemList';
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const Category = () => {
  // sets the param to identify the category
  const { category } = useParams();
  const [categories, setCategories] = useState();
  const [status, setStatus] = useState('loading');

  //get search state variable that was set by searchbar from useContext
  const { search } = useContext(ShoppingContext);

  useEffect(() => {
    fetch(`${API_ENDPOINT}/api/items/category/${category}`)
      .then((res) => res.json())
      .then((data) => {
        // setCategories basically grabs all items in the same category
        setCategories(data.data.slice(0, 16));
        setStatus('idle');
      });
  }, [category]);

  if (status === 'loading') {
    return <Loading />;
  }

  // create a filteredItem variable that will hold the items in the category filtered based on search
  const filteredItems = categories.filter((item) => {
    if (item.name.toLowerCase().includes(search)) {
      return item;
    }
  });

  return (
    <Container>
      <ItemList listedItems={filteredItems} />
    </Container>
  );
};

export default Category;

const Container = styled.div`
  min-height: 100vh;
  padding-top: 1%;
`;
