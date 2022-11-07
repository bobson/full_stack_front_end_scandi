import { Component } from "react";

import "./styles.scss";

export default class Carousel extends Component {
  state = {
    imageIndex: 0,
  };

  nextImage = (images) => {
    this.state.imageIndex === images.length - 1
      ? this.setState({ imageIndex: 0 })
      : this.setState((prevState) => ({
          imageIndex: prevState.imageIndex + 1,
        }));
  };

  prevImage = (images) => {
    this.state.imageIndex === 0
      ? this.setState({ imageIndex: images.length - 1 })
      : this.setState((prevState) => ({
          imageIndex: prevState.imageIndex - 1,
        }));
  };

  render() {
    const { images, name } = this.props;
    const { imageIndex } = this.state;

    return (
      <div className="carousel">
        {images.length > 1 && (
          <div className="carousel-buttons">
            <button
              onClick={() => this.prevImage(images)}
              className="carousel-button prev"
            >
              &lt;
            </button>
            <button
              onClick={() => this.nextImage(images)}
              className="carousel-button next"
            >
              &gt;
            </button>
          </div>
        )}

        <div className="carousel-content">
          {images?.map((img, idx) => (
            <img
              key={img}
              className={idx === imageIndex ? "fade" : "hide"}
              src={img}
              alt={name}
            />
          ))}
        </div>
      </div>
    );
  }
}
