import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";

import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo/client";


import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/cartContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <ApolloProvider client={client}>
      <CartProvider>
      <App />
      </CartProvider>
    </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>
);


