import Image from "next/image";
import React, { useRef } from "react";
import Slider from "react-slick";

function PreviousNextMethods() {
  const sliderRef = useRef<Slider | null>(null);

  const next = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const previous = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };
  return (
    <div className="slider-container !flex flex-col gap-40 w-full">
      <div
        style={{
          textAlign: "end",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <span>국내여행</span>
        </div>
        <div className="flex gap-24">
          <button
            className="button flex justify-center items-center w-44 h-44 p-10 border-[1.5px] border-[#0EA5E9] rounded-full bg-white"
            onClick={previous}
          >
            <Image
              src="icons/chevron_left.svg"
              alt="캐러셀다음버튼"
              width={24}
              height={24}
              objectFit="fill"
            />
          </button>
          <button
            className="button flex justify-center items-center w-44 h-44 p-10 border-[1.5px] border-[#0EA5E9] rounded-full bg-white"
            onClick={next}
          >
            <Image
              src="icons/chevron_right.svg"
              alt="캐러셀다음버튼"
              width={24}
              height={24}
              objectFit="fill"
            />
          </button>
        </div>
      </div>
      <Slider ref={sliderRef} {...settings}>
        <div className="flex w-40 h-40 border-2 border-black">
          <h3>1</h3>
        </div>
        <div className="flex w-40 h-40 border-2 border-black">
          <h3>2</h3>
        </div>
        <div className="flex w-40 h-40 border-2 border-black">
          <h3>3</h3>
        </div>
        <div className="flex w-40 h-40 border-2 border-black">
          <h3>4</h3>
        </div>
        <div className="flex w-40 h-40 border-2 border-black">
          <h3>5</h3>
        </div>
        <div className="flex w-40 h-40 border-2 border-black">
          <h3>6</h3>
        </div>
        <div className="flex w-40 h-40 border-2 border-black">
          <h3>7</h3>
        </div>
        <div className="flex w-40 h-40 border-2 border-black">
          <h3>8</h3>
        </div>
      </Slider>
    </div>
  );
}

export default PreviousNextMethods;
