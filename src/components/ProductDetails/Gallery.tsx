import { Component } from "react";
import leftArrow from "../../assets/leftArrow.svg";
import rightArrow from "../../assets/rightArrow.svg";

interface GalleryProps {
  gallery: string[];
}

class Gallery extends Component<GalleryProps> {
  state = {
    selectedImageIndex: 0,
  };

  handleImageClick = (index: number) => {
    this.setState({ selectedImageIndex: index });
  };
  render() {
    const { gallery } = this.props;
    const { selectedImageIndex } = this.state;
    const { handleImageClick } = this;

    return (
      <div
        className="flex flex-col md:flex-row md:space-x-4 w-full md:w-7/12 items-start"
        data-testid="product-gallery"
      >
        {/* Thumbnails (Hidden on small screens) */}
        <div className="hidden md:flex md:flex-col md:space-y-2 w-1/6">
          {gallery.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className={`cursor-pointer w-full h-20 object-cover border ${
                index === selectedImageIndex ? "border-gray-300" : "border-none"
              }`}
              onClick={() => handleImageClick(index)}
            />
          ))}
        </div>

        {/* Main Carousel */}
        <div className="relative w-full md:w-5/6">
          <img
            src={gallery[selectedImageIndex]}
            alt={`Product Image ${selectedImageIndex + 1}`}
            className="w-full max-h-96 object-contain"
          />
          {/* Carousel Navigation Arrows */}
          <button
            onClick={() =>
              handleImageClick(
                selectedImageIndex > 0
                  ? selectedImageIndex - 1
                  : gallery.length - 1
              )
            }
            className="absolute left-2 top-1/2 transform -translate-y-1/2"
          >
            <img src={leftArrow} alt="Left Arrow" />
          </button>
          <button
            onClick={() =>
              handleImageClick((selectedImageIndex + 1) % gallery.length)
            }
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
          >
            <img src={rightArrow} alt="Right Arrow" />
          </button>
        </div>
      </div>
    );
  }
}

export default Gallery;
