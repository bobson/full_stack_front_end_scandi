import { Component } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.svg";
import cartIcon from "../../assets/EmptyCart-dark.svg";
import CategoryLinks from "./CategoryLinks";
import { Category } from "../../types/types";
import MobileMenu from "./MobileMenu";
import { toggleModal } from "../../store/modalSlice";
import { connect } from "react-redux";
import { RootState } from "../../store/index";

interface NavbarProps {
  categories: Category[];
  toggleModal: () => void;
  totalItems: number;
}

class Navbar extends Component<NavbarProps> {
  render() {
    const { categories, toggleModal, totalItems } = this.props;
    return (
      <nav className="z-40 h-full pt-3 px-3 flex items-center justify-between bg-white">
        {/* Links hidden on mobile */}
        <div className="hidden md:flex space-x-6 h-full">
          <CategoryLinks categories={categories} />
        </div>

        {/* Logo in the Center */}
        <div className="flex-shrink-0">
          <NavLink to="/">
            <img src={logo} alt="Logo" />
          </NavLink>
        </div>

        {/* Shopping Cart Icon on Desktop */}
        <button
          onClick={toggleModal}
          className="relative text-gray-600 hover:text-gray-900"
          data-testid="cart-btn"
        >
          <img src={cartIcon} alt="Cart Button" />
          {totalItems > 0 && (
            <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-black text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>

        {/* Links hidden on desktop */}
        <MobileMenu>
          <CategoryLinks categories={categories} />
        </MobileMenu>
      </nav>
    );
  }
}

const mapDispatchToProps = {
  toggleModal,
};

const mapStateToProps = (state: RootState) => ({
  totalItems: state.cart.totalItems,
});

// eslint-disable-next-line react-refresh/only-export-components
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
