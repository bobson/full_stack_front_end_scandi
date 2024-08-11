import { Component } from "react";
import { Link } from "react-router-dom";
import CustomButton from "../../components/custom-button/custom-button";

import "./styles.scss";

export default class PageNotFound extends Component {
  render() {
    return (
      <div className="page-not-found">
        <h1>404</h1>
        <h2>UH OH! You're lost.</h2>
        <p>
          The page you are looking for does not exist. How you got here is a
          mystery. But you can click the button below to go back to the
          homepage.
        </p>
        <CustomButton>
          <Link to="/">HOME</Link>
        </CustomButton>
      </div>
    );
  }
}
