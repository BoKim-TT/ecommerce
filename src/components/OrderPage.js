import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import ItemDetail from './ItemDetail';
import { ShoppingContext } from '../contexts/shoppingContext';
import Loading from './Loading';
import Alert from '@mui/material/Alert';
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const OrderPage = () => {
  const [orderList, setOrderList] = useState(null);

  //when order page is opened we get the user from params
  const user = useParams().user;

  //get search state variable that was set by searchbar from useContext
  const { search } = useContext(ShoppingContext);

  //get user's order list fetch
  useEffect(() => {
    fetch(`${API_ENDPOINT}/api/order/${user}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setOrderList(data.data.orders.reverse());
        } else if (data.status === 404) {
          setOrderList(data.data);
        }
      })
      .catch((err) => console.log(err));
  }, [user]);

  console.log(orderList);

  if (!orderList) {
    return <Loading />;
  }

  return (
    <Wrapper>
      <Title> ORDER HISTORY</Title>

      {orderList.length === 0 && (
        <Alert
          icon={false}
          sx={{
            margin: '5% auto',
            fontSize: '20px',
            width: '500px',
            '& .MuiAlert-message': { textAlign: 'center', width: 'inherit' },
          }}
        >
          No orders found for you !{' '}
        </Alert>
      )}
      {orderList.length > 0 && (
        <Container>
          {orderList.map((order) => {
            const totalPrice = order.purchasedItems.reduce((prev, curr) => {
              return prev + Number(curr.price.slice(1)) * curr.quantity;
            }, 0);

            return (
              <Order key={order._id}>
                <Head>
                  <OrderNumber>
                    order date: <Span>{order.date} </Span>
                  </OrderNumber>
                  <SubTotal>
                    Subtotal: $ <Span>{totalPrice.toFixed(2)}</Span>
                  </SubTotal>
                </Head>

                {order.purchasedItems.map((item) => {
                  return (
                    <EachItem key={item._id}>
                      <ItemDetail item={item} detailed="false" />
                    </EachItem>
                  );
                })}
              </Order>
            );
          })}
        </Container>
      )}
    </Wrapper>
  );
};

const LoadPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: var(--color-main-blue);
  background-color: var(--color-main-brown);
`;

const Icon = styled.div`
  animation: rotation 2s infinite linear;
  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
`;
const Wrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  margin: 0;
  padding: 20px 0;
  font-family: var(--font-opensans);
`;

const Title = styled.h2`
  width: 100%;
  font-size: 20px;
  color: blue;
  font-weight: 600;
  padding: 20px;
  text-align: center;
`;

const Container = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 13px;
`;

const Order = styled.div`
  width: 80%;
  margin: 3%;
  padding: 2% 0;
  font-family: var(--font-roboto);
  font-weight: 300;
  border: 0.3px solid yellow;
`;

const Head = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2% 5%;
  align-items: center;
  color: white;
`;
const OrderNumber = styled.h3`
  font-size: 13px;
  font-weight: 400;
  @media (max-width: 425px) {
    font-size: 12px;
  }
`;
const Span = styled.span``;
const SubTotal = styled.h2`
  margin-top: 5px;
  font-size: 15px;
  font-weight: 600;
`;
const EachItem = styled.li`
  width: 90%;
  margin: 0 auto;
  height: 230px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  @media (max-width: 768px) {
    height: 400px;
  }
  @media (max-width: 425px) {
    flex-direction: column;
    height: 320px;
  }
`;
const Message = styled.div`
  color: white;
  position: absolute;
  top: 300px;
  left: 0;
  width: 100%;
  height: 300px;
  margin: 0 auto;
  font-size: 26px;
  text-align: center;
  padding: 10px;
  font-family: var(--font-poppins);
`;

export default OrderPage;
