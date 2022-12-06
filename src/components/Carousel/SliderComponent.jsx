import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import buildMacrosPic from "../../assets/images/build-macro-pic.jpg";
import "./SliderComponent.scss";

export default function SliderComponent() {
  const settings = {
    infinite: true,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: true,
    autoplay: false,
    autoplaySpeed: 2000,
  };
  return (
    <>
      <div className="slider">
        <Slider {...settings}>
          <div>
            <img
              className="slider__image"
              src={buildMacrosPic}
              alt="build-macro-pic"
            />
          </div>
          <div>
            <img className="slider__image" src="" alt="" />
          </div>
          <div>
            <img className="slider__image" src="" alt="" />
          </div>
          <div>
            <img className="slider__image" src="" alt="" />
          </div>
        </Slider>
      </div>
    </>
  );
}
