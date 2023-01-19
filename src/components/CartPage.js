import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import ItemDetail from "./ItemDetail";
import CartEditForm from "./CartEditForm";
import { IoRefresh } from "react-icons/io5";
import Loading from "./Loading";
import { ShoppingContext } from "../contexts/shoppingContext";
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const CartPage = () => {
  //hardcoded userName
  const user = "user";

  // states update by fetch result
  const { cartItems, setCartItems, cartCount, setCartCount } =
    useContext(ShoppingContext);
  const [subTotal, setSubTotal] = useState(null);
  const [status, setStatus] = useState("loading");
  const [confirm, setConfirm] = useState(false);

  //going back to homepage when order is confirmed
  const navigate = useNavigate();

  //when cartPage is opened, fetch getCart request
  useEffect(() => {
    fetch(`${API_ENDPOINT}/api/cart/${user}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "cart not found") {
          setCartItems([]);
          setStatus("idle");
        }
        if (data.status === 200) {
          setCartItems(data.data.purchasedItems);
          setStatus("idle");

          //calculate subtotal price of items
          const totalPrice = data.data.purchasedItems.reduce((prev, curr) => {
            return prev + Number(curr.price.slice(1)) * curr.quantity;
          }, 0);
          setSubTotal(totalPrice.toFixed(2));
        }
      })
      .catch((err) => console.log(err));
  }, [user, cartCount]);

  //update quantity of the item function
  const updateCart = (_id, updatedPrice, editedQuantity) => {
    if (editedQuantity === 0) {
      handleDelteItem(_id);
      return;
    }

    // PATCH request: update quantity
    const update = { itemId: _id, quantity: editedQuantity };

    fetch(`${API_ENDPOINT}/api/cart/${user}`, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          //if successful, update states on the frontend
          setCartCount(0);
          const updatedCartItems = cartItems.map((item) => {
            if (item._id === _id) {
              return { ...item, quantity: editedQuantity };
            } else {
              return item;
            }
          });
          setCartItems(updatedCartItems);

          const updatedSubTotal = cartItems.reduce((accu, curr) => {
            if (curr._id === _id) {
              return updatedPrice + accu;
            } else {
              return Number(curr.price.slice(1)) * curr.quantity + accu;
            }
          }, 0);

          setSubTotal(Number.parseFloat(updatedSubTotal).toFixed(2));
        }
      })
      .catch((err) => console.log(err));
  };

  // delete item function
  const handleDelteItem = (_id) => {
    // DELETE request: deleteItem from user's cart
    fetch(`${API_ENDPOINT}/api/cart/${user}`, {
      method: "DELETE",
      body: JSON.stringify({ _id }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setCartCount(0);
          //if the result is success, update states on the fronend
          const updatedCartItems = cartItems.filter((item) => item._id !== _id);
          setCartItems(updatedCartItems);

          const updatedSubTotal = cartItems.reduce((accu, curr) => {
            if (curr._id === _id) {
              return accu;
            } else {
              return accu + Number(curr.price.slice(1)) * curr.quantity;
            }
          }, 0);

          setSubTotal(updatedSubTotal.toFixed(2));
        }
      })
      .catch((err) => console.log(err));
  };

  //proceed to checkout for order
  const handleCheckOut = () => {
    //post body
    const orderObject = {
      user,
      purchasedItems: cartItems,
    };

    // POST request : creating a new order
    fetch(`${API_ENDPOINT}/api/order/${user}`, {
      method: "POST",
      body: JSON.stringify(orderObject),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setConfirm(true);
          setCartItems(null);
          setTimeout(() => {
            setConfirm(false);
            navigate("/");
          }, 1200);
        }
      })
      .catch((err) => console.log(err.message));
  };

  if (status === "loading") {
    return <Loading />;
  }
  return (
    <Wrapper>
      <Title>SHOPPING CART</Title>
      {cartItems && cartItems.length === 0 && (
        <Message>There is no item in your cart !</Message>
      )}
      {cartItems && cartItems.length > 0 && (
        <Container>
          {cartItems.map((item) => {
            return (
              <List key={item._id}>
                <ItemDetail item={item} detailed="false" />
                <CartEditForm
                  item={item}
                  updateCart={updateCart}
                  delelteItem={() => handleDelteItem(item._id)}
                />
              </List>
            );
          })}
          <CheckoutContainer>
            {" "}
            <SubTotal> Subtotal: $ {subTotal}</SubTotal>
            <CheckOut onClick={handleCheckOut}>CHECKOUT</CheckOut>
          </CheckoutContainer>
        </Container>
      )}

      {confirm && <Message>Your order has been confirmed !</Message>}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: 100vh;
  width: 90%;
  margin: 30px auto;
`;

const Title = styled.div`
  font-size: 26px;
  font-weight: 600;
  font-family: var(--font-opensans);
  color: blue;
  margin-bottom: 30px;
`;
const Container = styled.div`
  width: 100%;
  /* background-color: red; */
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 13px;
`;

const List = styled.li`
  height: 230px;
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  @media (max-width: 768px) {
    height: 400px;
  }
  @media (max-width: 425px) {
    flex-direction: column;
    height: 480px;
  }
`;
const CheckoutContainer = styled.div`
  width: 23%;
  text-align: right;
  /* background-color: blue; */
`;
const SubTotal = styled.div`
  text-align: center;
  width: 100%;
  padding: 5px;
  margin: 10px 0;
  font-family: var(--font-poppins);
  font-weight: 600;
  font-size: medium;
  color: white;
  @media (max-width: 768px) {
    width: 80%;
    height: 30px;
    margin: 5px auto;
    text-align: center;
  }
`;
const CheckOut = styled.button`
  margin: 0 auto;
  display: block;
  width: 100%;
  padding: 10px;
  background-color: red;
  border: none;
  border-radius: 16px;
  font-size: 14px;
  color: white;
  cursor: pointer;
  transition: all 300ms ease;
  :hover {
    opacity: 0.8;
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    width: 80%;
    height: 35px;
    margin: 5px auto;
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

export default CartPage;
