import React, { Component } from "react";

export const CurrencyContext = React.createContext();

export class CurrencyProvider extends Component {
  state = {
    currency: "USD",
  };

  handleCurrency = (event) => {
    this.setState({ currency: event.target.innerText });
  };
}
