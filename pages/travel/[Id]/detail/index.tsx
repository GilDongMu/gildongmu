import Image from "next/image";
import React from "react";

import Article from "@/components/detail/article";
import Header from "@/components/detail/header/index";

function Detail() {
  return (
    <div className="flex w-full flex-col bg-sky-50">
      <Header />
      <Article />
      <div
        className="fixed bottom-40 right-40 h-64 w-64 animate-bounce cursor-pointer tablet:h-56 tablet:w-56 mobile:bottom-20 mobile:right-20"
        onClick={scrollToTop}
      >
        <Image src="/icons/rocket.svg" alt="로켓 이미지" fill />
      </div>
    </div>
  );
}

export default Detail;

export function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
