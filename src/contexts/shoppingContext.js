import { createContext, useState } from "react";

export const ShoppingContext = createContext();

export const ShoppingProvider = ({ children }) => {
  //the input of the search bar will be store in here
  const [search, setSearch] = useState("");
  const [cartItems, setCartItems] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  
  return (
    <ShoppingContext.Provider value={{ search, setSearch,cartItems, setCartItems,cartCount, setCartCount }}>
      {children}
    </ShoppingContext.Provider>
  );
};