import { useEffect, useState } from "react";
import "./Gallery.css";
import PropTypes from "prop-types";
import Slider from "react-slick";
const Gallery = ({ singleProduct }) => {
  const [currentImage, setCurrentImage] = useState({
    img: singleProduct.img[0],
    imgIndex: 0,
  });

  useEffect(() => {
    setCurrentImage({
      img: singleProduct.img[0],
      imgIndex: 0,
    });
  }, [singleProduct.img]);

  function NextBtn({ onClick }) {
    return (
      <button
        className="glide__arrow glide__arrow--right"
        data-glide-dir=">"
        onClick={onClick}
        style={{
          zIndex: "2",
        }}
      >
        <i className="bi bi-chevron-right"></i>
      </button>
    );
  }

  NextBtn.propTypes = {
    onClick: PropTypes.func,
  };

  function PrevBtn({ onClick }) {
    return (
      <button
        className="glide__arrow glide__arrow--left"
        data-glide-dir="<"
        onClick={onClick}
        style={{
          zIndex: "2",
        }}
      >
        <i className="bi bi-chevron-left"></i>
      </button>
    );
  }

  PrevBtn.propTypes = {
    onClick: PropTypes.func,
  };

  const sliderSettings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextBtn />,
    prevArrow: <PrevBtn />,
    autoplaySpeed: 3000,
    autoplay: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="product-gallery">
      <div className="single-image-wrapper">
        <img src={`${currentImage.img}`} id="single-image" alt="" />
      </div>
      <div className="product-thumb">
        <div className="glide__track" data-glide-el="track">
          <ol className="gallery-thumbs glide__slides">
            <Slider {...sliderSettings}>
              {singleProduct.img.map((itemImg, index) => (
                <li
                  className="glide_slideglide__slide--active"
                  key={index}
                  onClick={() =>
                    setCurrentImage({
                      img: itemImg,
                      imgIndex: index,
                    })
                  }
                >
                  <img
                    src={`${itemImg}`}
                    alt=""
                    className={`img-fluid ${
                      index === currentImage.imgIndex ? "active" : ""
                    }`}
                  />
                </li>
              ))}
            </Slider>
          </ol>
        </div>
        <div className="glide__arrows" data-glide-el="controls"></div>
      </div>
    </div>
  );
};

export default Gallery;

Gallery.propTypes = {
  singleProduct: PropTypes.object,
};
