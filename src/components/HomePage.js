import { useState, useEffect, useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import { ShoppingContext } from '../contexts/shoppingContext';
import backgroundImg from '../assets/background-img.jpg';
import Loading from './Loading';
import ItemList from './ItemList';
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const HomePage = () => {
  const [items, setItems] = useState();
  const [status, setStatus] = useState('loading');
  const [title, setTitle] = useState('hidden');

  //get search state variable that was set by searchbar from useContext
  const { search } = useContext(ShoppingContext);

  // get all items
  useEffect(() => {
    fetch(`${API_ENDPOINT}/api/items`)
      .then((res) => res.json())
      .then((data) => {
        setItems(data.data.results.slice(0, 16));
        setStatus('idle');
        setTitle('show');
      });
  }, []);

  if (status === 'loading') {
    return <Loading />;
  }

  // create a filteredItem variable that will hold the items filtered based on search
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search)
  );

  return (
    <Container>
      {search.length === 0 && (
        <Main>
          <Title>Stay Active, Stay On Time</Title>
        </Main>
      )}
      <ItemList listedItems={filteredItems} />
    </Container>
  );
};

export default HomePage;

const Container = styled.div`
  width: 100%;
  min-height: 100vh- 50px;
`;

const Main = styled.div`
  width: 100%;
  height: 700px;
  background: center / cover no-repeat url(${backgroundImg});
  opacity: 0.7;
`;

const slideIn = keyframes`
 from {
        transform:translateX(-10%) ;
        color:lightblue;
        background-color: transparent;
    }
    to {
        transform:translateX(90%) ;
        color:blue;
          background-color: transparent;

    }
    `;

const Title = styled.div`
  width: 100%;
  padding: 17px;
  font-family: var(--font-opensans);
  font-size: 50px;
  font-weight: 500;
  opacity: 0.8;
  margin-top: 20px;
  text-align: center;
  background-color: yellow;
  animation: ${slideIn} 1s ease-in-out;
`;
