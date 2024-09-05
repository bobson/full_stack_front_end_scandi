import { Component } from "react";
import { NavLink, withRouter, RouteComponentProps } from "react-router-dom";

import { Category } from "../../types/types";

interface Props extends RouteComponentProps {
  categories: Category[];
}

class CategoryLinks extends Component<Props> {
  state = {
    activeLink: this.props.categories[0].name,
  };

  componentDidMount() {
    // Update the active link based on the current URL when the component mounts
    this.updateActiveLink(this.props.location.pathname);
  }

  componentDidUpdate(prevProps: Props) {
    // If the location changes, update the active link
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.updateActiveLink(this.props.location.pathname);
    }
  }

  updateActiveLink = (pathname: string) => {
    const activeCategory = this.props.categories.find((category) =>
      pathname.includes(category.name)
    );
    if (activeCategory) {
      this.setState({ activeLink: activeCategory.name });
    }
  };
  render() {
    const { categories } = this.props;

    return categories?.map(({ name }) => (
      <NavLink
        to={`/${name}`}
        className={`relative border-b-2 transition-colors duration-200 ease-in-out h-full flex items-center px-2
          ${
            this.state.activeLink === name
              ? "text-green-600 border-green-600"
              : "text-gray-600 border-transparent hover:text-green-400"
          }`}
        key={name}
        data-testid={
          this.state.activeLink === name
            ? "active-category-link"
            : "category-link"
        }
      >
        {name.toUpperCase()}
      </NavLink>
    ));
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export default withRouter(CategoryLinks);
