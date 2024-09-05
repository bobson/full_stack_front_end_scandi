import { Component, createRef, ReactNode } from "react";
import { connect } from "react-redux";
import { closeModal } from "../store/modalSlice";

interface ModalProps {
  closeModal: () => void;
  children: ReactNode;
}

class Modal extends Component<ModalProps> {
  childrenDropdownRef = createRef<HTMLDivElement>();
  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside = (event: MouseEvent) => {
    if (
      this.childrenDropdownRef.current &&
      !this.childrenDropdownRef.current.contains(event.target as Node)
    ) {
      const cartButton = document.querySelector('[data-testid="cart-btn"]');
      if (cartButton && !cartButton.contains(event.target as Node)) {
        this.props.closeModal();
      }
    }
  };
  render() {
    const { closeModal, children } = this.props;
    return (
      <>
        <div
          className="fixed inset-0 top-20 bg-gray-600 bg-opacity-50 flex items-start justify-end z-30"
          onClick={closeModal}
        />
        <div
          className="fixed top-20 right-0 sm:right-20 bg-white text-black right-0 border border-gray-200 shadow-lg z-40"
          ref={this.childrenDropdownRef}
        >
          {children}
        </div>
      </>
    );
  }
}

const mapDispatchToProps = {
  closeModal,
};

// eslint-disable-next-line react-refresh/only-export-components
export default connect(null, mapDispatchToProps)(Modal);
