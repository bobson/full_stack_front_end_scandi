import { Component, ReactNode } from "react";
import Navbar from "./Navbar";
import { Category } from "../types/types";
import { connect } from "react-redux";
import { RootState } from "../store";
import Modal from "./Modal";
import Cart from "./Cart";

interface LayoutProps {
  isModalOpen: boolean;
  categories: Category[];
  children?: ReactNode;
}

class Layout extends Component<LayoutProps> {
  render() {
    const { isModalOpen, categories, children } = this.props;

    return (
      <div className="min-h-screen flex flex-col items-center m-auto max-w-screen-sm sm:max-w-[90%] md:max-w-[90%] md:max-w-[1200px]">
        <header className="w-full h-20 sticky top-0 z-50 text-white bg-white">
          <Navbar categories={categories} />
        </header>

        <main className="flex-grow w-full pt-32">
          {isModalOpen && (
            <Modal>
              <Cart />
            </Modal>
          )}
          {children}
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  isModalOpen: state.modal.isModalOpen,
});

// eslint-disable-next-line react-refresh/only-export-components
export default connect(mapStateToProps)(Layout);
