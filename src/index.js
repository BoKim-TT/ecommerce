import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { ShoppingProvider } from './contexts/shoppingContext';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}

ReactDOM.render(
  <React.StrictMode>
    <ShoppingProvider>
      <App />
    </ShoppingProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
