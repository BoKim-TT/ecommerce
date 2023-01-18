import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AiFillCheckCircle } from "react-icons/ai";
import ItemDetail from "./ItemDetail";
import Loading from "./Loading";
import { ShoppingContext } from "../contexts/shoppingContext";
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
const ItemPage = () => {
  //hardcoded userName
  const user = "Marie";

  //itemId from path="/item/:item"
  const itemId = useParams().item;
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [company, setCompany] = useState(null);
  const [quantity, setQuantity] = useState(0);

  //by message, the purchase box shows "add to cart" or "added to cart"
  const [message, setMessage] = useState(false);
  const { cartCount, setCartCount } = useContext(ShoppingContext);

  //when itemPage is opened, fetch get getItem
  useEffect(() => {
    if (itemId) {
      fetch(`${API_ENDPOINT}/api/items/${itemId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) setItem(data.data);
        })
        .catch((error) => console.log(error));
    }
  }, [itemId]);

  //when item data received, fetch getCompany by the companyId
  useEffect(() => {
    if (item) {
      fetch(`${API_ENDPOINT}/api/companies/${item.companyId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) setCompany(data.data);
        })
        .catch((error) => console.log(error));
    }
  }, [item]);

  //when pressing the add button
  const addIntoCart = () => {
    // POST request : create cart

    fetch(`${API_ENDPOINT}/api/cart/${user}`, {
      method: "POST",
      body: JSON.stringify({ ...item, quantity }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setCartCount((count) => count + quantity);
          setMessage(true);
          setTimeout(() => {
            setMessage(false);
            navigate("/");
          }, 1000);
        }
      })
      .catch((err) => console.log(err.message));
  };

  if (!company) {
    return <Loading />;
  }

  return (
    <>
      {item && company && (
        <Wrapper>
          <Container>
            <ItemContainer>
              <ItemDetail item={item} company={company} detailed="true" />
            </ItemContainer>
            {!message ? (
              <PurchaseBox>
                {item.numInStock === 0 ? (
                  <Stock> AVAILABLE STOCK : {item.numInStock} </Stock>
                ) : (
                  <Quantity>
                    <Stock> AVAILABLE STOCK : {item.numInStock} </Stock>
                    <Label for="quantity">QUANTITY</Label>
                    <Input
                      type="number"
                      id="quantity"
                      name="quantity"
                      min="0"
                      max={item.numInStock + ""}
                      value={quantity}
                      onChange={(ev) => setQuantity(Number(ev.target.value))}
                    />{" "}
                  </Quantity>
                )}

                <AddButton
                  disabled={item?.numInStock > 0 ? false : true}
                  onClick={addIntoCart}
                >
                  ADD TO CART
                </AddButton>
              </PurchaseBox>
            ) : (
              <CartMessage>
                <AiFillCheckCircle />
                Added to Cart
              </CartMessage>
            )}
          </Container>
        </Wrapper>
      )}
    </>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100vh - 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: var(--font-opensans);

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: flex-start;
  }
`;

const Container = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin: 1%;
  padding: 1%;
  padding-bottom: 5%;
  border: 0.3px solid yellow;
`;
const ItemContainer = styled.div`
  width: 75%;
  height: 380px;
 
  @media (max-width: 768px) {
    width: 80%;
    height: 500px;
    margin: 20px;
  }
  @media (max-width: 425px) {
    height: 420px;
  }
`;

const PurchaseBox = styled.div`
  background-color: white;
  width: 20%;
  height: 95px;
  margin: 340px 10px 0 20px;
  /* border-radius: 12px; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px;

  @media (max-width: 768px) {
    width: 40%;
    height: 70px;
    margin: 0;
  }
`;
const AddButton = styled.button`
  width: 80%;
  height: 35px;
  font-size: 14px;
  font-weight: 600;
  background-color: blue;
  color: white;
  text-align: center;
  padding: 7px;
  border: none;
  /* border-radius: 16px; */
  transition: all 300ms ease;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
    transform: scale(0.97);
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
    transform: scale(1);
    background-color: #515e63;
  }

  @media (max-width: 768px) {
    height: 30px;
    font-size: 13px;
  }
  @media (max-width: 425px) {
    height: 25px;
    font-size: 11px;
    padding: 5px;
  }
`;
const Quantity = styled.form`
  margin-bottom: 5px;
  font-size: 0.8em;
  font-weight: 600;
`;
const Label = styled.label``;
const Stock = styled.div`
  width: 100%;
  padding: 5px;
  /* background-color: yellowgreen; */
  text-align: center;
  font-size: 0.8em;
  font-weight: 400;
  color: gray;
`;
const Input = styled.input`
  width: 30px;
  height: 14px;
  margin-left: 10px;
  font-size: 13px;
`;

const CartMessage = styled(PurchaseBox)`
  color: var(--color-point-pink);
  background-color: var(--color-main-white);
  font-size: 16px;
`;

export default ItemPage;
