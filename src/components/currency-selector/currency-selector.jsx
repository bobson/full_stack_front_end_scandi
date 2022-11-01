import React, { Component } from "react";

import { client } from "../../apollo/client";
import { getCurrencies } from "../../apollo/queries";

import { ReactComponent as UpArrow } from "../../assets/Vector.svg";

import "./styles.scss";

export default class CurrencySelector extends Component {
  state = {
    currencies: [],
    loading: true,
    showDropdown: false,
  };

  updateCurrencies = async () => {
    const { data, loading } = await client.query({
      query: getCurrencies,
    });

    this.setState({
      currencies: data.currencies,
      loading,
    });
  };

  componentDidMount() {
    this.updateCurrencies();
  }

  handleDropdown = () => {
    this.setState((prevState) => ({ showDropdown: !prevState.showDropdown }));
  };

  collapse = () => {
    this.setState({ showDropdown: false });
  };

  render() {
    const { currencies, showDropdown } = this.state;
    const { updateTotalPrice, handleCurrencyChange, selectedCurrency } =
      this.props;
    const { handleDropdown, collapse } = this;

    return (
      <div
        className="currency-selector-container"
        tabIndex={0}
        onBlur={collapse}
      >
        <div onClick={() => handleDropdown()} className="selected">
          <span>{selectedCurrency.symbol}</span>
          <span className={showDropdown ? "arrow " : "arrow rotate"}>
            <UpArrow />
          </span>
        </div>
        {showDropdown && (
          <div className="currency-dropdown">
            {currencies.map(({ label, symbol }) => (
              <span
                key={label}
                onClick={() => {
                  handleCurrencyChange(label, symbol);
                  handleDropdown();
                  updateTotalPrice();
                }}
              >
                {symbol}
                {"  "}
                {label}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  }
}
