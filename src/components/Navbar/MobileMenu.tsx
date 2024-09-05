import { Component, ReactNode } from "react";
interface MobileMenuProps {
  children?: ReactNode;
}

export default class MobileMenu extends Component<MobileMenuProps> {
  state = {
    isMenuOpen: false,
  };

  toggleMenu = () => {
    this.setState({ isMenuOpen: !this.state.isMenuOpen });
  };

  render() {
    const { children } = this.props;
    return (
      <>
        {/* Hamburger Menu Icon for md and sm devices */}
        <div className="md:hidden">
          <button
            onClick={this.toggleMenu}
            className="text-gray-600 hover:text-gray-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform ${
            this.state.isMenuOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out lg:hidden`}
        >
          <div className="p-4">
            <button
              onClick={this.toggleMenu}
              className="text-gray-600 hover:text-gray-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <nav
            className="flex flex-col space-y-4 p-4 items-center"
            onClick={this.toggleMenu}
          >
            {children}
          </nav>
        </div>
      </>
    );
  }
}
