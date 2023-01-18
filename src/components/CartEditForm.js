import styled from "styled-components";
import { useContext, useEffect, useState } from "react";

const CartEditForm = ({ item, updateCart, delelteItem }) => {
  const [editedQuantity, setEditedQuantity] = useState(item.quantity);
  const [totalPrice, setTotalPrice] = useState(
    Number(item.price.slice(1)) * item.quantity
  );

  //stock limit message when user's quantity reaches the stock limit
  const [message, setMessage] = useState(false);

  // quantity update button click on the form
  const handleUpdateQuantity = (ev) => {
    ev.preventDefault();

    // update the price by the quantity change
    const updatedPrice = Number(item.price.slice(1)) * Number(editedQuantity);
    setTotalPrice(updatedPrice);

    //updata quantity fetch request function
    updateCart(item._id, updatedPrice, editedQuantity);
  };

  useEffect(() => {
    if (editedQuantity > item.numInStock) {
      setMessage(true);
      setTimeout(() => {
        setMessage(false);
      }, 1000);
    }
  }, [editedQuantity]);

  return (
    <Edit>
      <Form>
        {!message ? (
          <Inputfield>
            <Label for="quantity">QTY :</Label>
            <Input
              type="number"
              min="0"
              max={item.numInStock + ""}
              placeholder={item.quantity}
              value={editedQuantity}
              onChange={(ev) => {
                setEditedQuantity(Number(ev.target.value));
              }}
            />{" "}
            <UpdateButton onClick={handleUpdateQuantity}>UPDATE</UpdateButton>
          </Inputfield>
        ) : (
          <Message>Order limit: {item.numInStock} </Message>
        )}
      </Form>
      <ItemTotal>Total price: $ {totalPrice.toFixed(2)} </ItemTotal>
      <DeleteButton onClick={delelteItem}>DELETE</DeleteButton>
    </Edit>
  );
};

const Edit = styled.div`
  width: 30%;
  margin-left: 15px;
  padding: 0 2%;
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  /* align-items: center; */
  font-family: var(--font-opensans);
  position: relative;
  @media (max-width: 768px) {
    padding: 10% 1%;
  }
  @media (max-width: 425px) {
    width: 100%;
    margin-left: 0;
    margin-top: 2%;
    padding: 1%;
    align-items: center;
  }
`;
const Form = styled.form`
  /* font-size: 15px; */
  @media (max-width: 425px) {
    flex-direction: row;
  }
`;
const Message = styled.h3`
  font-size: 12px;
  padding: 8px;
  border-radius: 25px;
  background-color: var(--color-point-pink);
  position: absolute;
  left: 33%;
  top: 5%;
  opacity: 0.7;
`;
const Inputfield = styled.div`
  display: flex;

  /* justify-content: space-evenly; */
  /* background-color: yellowgreen; */
`;
const Label = styled.label`
  @media (max-width: 768px) {
    font-size: 13px;
  }
`;
const Input = styled.input`
  margin-left: 5px;
  @media (max-width: 768px) {
    width: 45%;
  }
`;
const UpdateButton = styled.button`
  background-color: transparent;
  border: 1px solid var(--color-point-pink);
  color: var(--color-point-pink);
  width: 70px;
  height: 25px;
  margin-left: 15px;
  /* border-radius: 8px; */
  /* margin-top: 10px; */
  cursor: pointer;
  transition: all 300ms ease;
  :hover {
    transform: scale(0.95);
    background-color: var(--color-point-pink);
    color: var(--color-main-white);
  }

  @media (max-width: 768px) {
    margin: 10px 0;
  }
  @media (max-width: 425px) {
    margin: 10px;
    width: 50px;
    height: 20px;
    font-size: 12px;
    border-radius: 4px;
  }
`;

const ItemTotal = styled.div`
  font-size: 15px;
  font-weight: 600;
  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const DeleteButton = styled.button`
  width: 70px;
  height: 25px;
  background-color: transparent;
  border: 1px solid var(--color-point-pink);
  color: var(--color-point-pink);
  /* border-radius: 8px; */
  cursor: pointer;
  transition: all 300ms ease;

  :hover {
    transform: scale(0.95);
    background-color: var(--color-point-pink);
    color: var(--color-main-white);
  }
  @media (max-width: 425px) {
    width: 50px;
    height: 20px;
    font-size: 12px;
    border-radius: 4px;
  }
`;

export default CartEditForm;
