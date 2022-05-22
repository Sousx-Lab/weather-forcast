import React from "react";
import Slider from "react-slick";

export default function CardSlider({ children }: { children: React.ReactNode }): JSX.Element {
  
  const settings = {
    dots: false,
    slidesToShow: 4,
    slidesPerRow:1,
    initialSlide: 0,
    rows:1,
    adaptiveHeight: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          slidePerRow: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidePerRow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return(
    <Slider {...settings}>
      {children}
    </Slider>
  )
}