import styled from "styled-components";
import { Link } from "react-router-dom";

const ItemDetail = ({ item, company, detailed }) => {
  return (
    <Detail>
      <ImgContainer to={`/item/${item._id}`}>
        <Img src={item.imageSrc} alt={item.name} />
      </ImgContainer>
      <Description>
        <Name>{item.name}</Name>
        <Price>
          Price : <PriceSpan>{item.price}</PriceSpan>
        </Price>
        {detailed === "true" ? (
          <Stock>
            Stock :<Span> {item.numInStock}</Span>
          </Stock>
        ) : (
          <>
            <Quantity>
              Quantity :<Span> {item.quantity}</Span>
            </Quantity>
          </>
        )}
        <Category>Category: {item.category}</Category>
        {company && (
          <Company>
            made by{" "}
            <CompanyName>
              {company.name}, {company.country}
            </CompanyName>
            {"  "}
            <CompanyURL href={company.url} target="_blank"> {company.url} </CompanyURL>
          </Company>
        )}
      </Description>
    </Detail>
  );
};

const Detail = styled.div`
  background-color: var(--color-main-white);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--color-font-darkgray);
  font-family: var(--font-roboto);
  font-weight: 400;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0;
  }
`;
const ImgContainer = styled(Link)`
  max-width: 300px;
  width: 30%;
  height: 90%;
  padding: 0 2%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: brown; */
  @media (max-width: 768px) {
    margin: 10px;
  }
`;

const Img = styled.img`
  display: block;
  max-width: 100%;
  max-height: 100%;
  width: 90%;
  height: auto;
  object-fit: contain;
  @media (max-width: 768px) {
    margin: 10px;
  }

  @media (max-width: 425px) {
    max-height: 150px;
  }
`;

const Description = styled.div`
  width: 67%;
  height: 90%;
  padding: 0 1%;
  display: flex;
  flex-direction: column;
  font-size: 1em;
  /* background-color: aqua; */
  @media (max-width: 425px) {
    font-size: 13px;
  }
`;

const Name = styled.p`
  font-size: 1.2em;
  font-weight: 600;
  margin: 1em 0;

  border-bottom: 1px solid var(--color-font-darkgray);
  padding-bottom: 8px;
  @media (max-width: 768px) {
    font-size: 16px;
  }
  @media (max-width: 425px) {
    font-size: 14px;
  }
`;
const Price = styled.p`
  font-size: 16px;
  margin: 10px 0;
`;

const PriceSpan = styled.span`
  font-weight: 600;
  color: var(--color-point-pink);
  font-size: 18px;
`;

const Stock = styled.p`
  margin: 5px 0;
`;
const Quantity = styled.p`
  margin: 5px 0;
`;

const Span = styled.span`
  color: var(--color-point-pink);
  font-size: 15px;
  font-weight: 500;
  @media (max-width: 425px) {
    font-size: 12px;
  }
`;
const StockNum = styled(Span)`
  color: var(--color-font-darkgray);
  font-weight: 400;
`;
const Category = styled.p`
  margin: 10px 0;
  font-size: 13px;
`;

const Company = styled.p`
  margin-top: 15px;
  font-size: 11px;
  color: #707070;
`;
const CompanyName = styled.p`
  margin: 5px 0;
  font-size: 13px;
  color: var(--color-font-darkgray);
`;
const CompanyURL = styled.a`
  margin-top: 10px;
  font-size: 13px;
  text-decoration: underline;
  color: var(--color-main-blue);
  cursor: pointer;
  &:hover {
    color: blue;
  }
`;
export default ItemDetail;
