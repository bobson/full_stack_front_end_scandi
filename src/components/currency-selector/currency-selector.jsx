import React, { Component } from "react";

import { getCurrencies } from "../../apollo/queries";
import { Query } from "@apollo/client/react/components";

import { ReactComponent as Arrow } from "../../assets/Vector.svg";

import "./styles.scss";

export default class CurrencySelector extends Component {
  state = {
    showDropdown: false,
  };

  handleDropdown = () => {
    this.setState((prevState) => ({ showDropdown: !prevState.showDropdown }));
  };

  collapse = () => {
    this.setState({ showDropdown: false });
  };

  render() {
    const { updateTotalPrice, handleCurrencyChange, selectedCurrency } =
      this.props;
    const { showDropdown } = this.state;
    const { handleDropdown, collapse } = this;

    return (
      <Query query={getCurrencies}>
        {({ loading, data, error }) => {
          if (loading) return <p>...</p>;
          if (error) return alert(error.message);
          return (
            <div
              className="currency-selector-container"
              tabIndex={0}
              onBlur={collapse}
            >
              <div onClick={() => handleDropdown()} className="selected">
                <span>
                  {selectedCurrency.symbol || data.currencies[0].symbol}
                </span>
                <span className={showDropdown ? "arrow " : "arrow rotate"}>
                  <Arrow />
                </span>
              </div>
              {showDropdown && (
                <div className="currency-dropdown">
                  {data.currencies.map(({ label, symbol }) => (
                    <span
                      key={label}
                      onClick={() => {
                        handleCurrencyChange(label, symbol);
                        handleDropdown();
                        updateTotalPrice();
                      }}
                    >
                      {symbol}
                      {label}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        }}
      </Query>
    );
  }
}
