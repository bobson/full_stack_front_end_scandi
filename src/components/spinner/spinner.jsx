import { Component } from "react";

import "./styles.scss";

export default class Spinner extends Component {
  render() {
    return (
      <div className="spinner-overlay">
        <div className="spinner-container" />
      </div>
    );
  }
}
