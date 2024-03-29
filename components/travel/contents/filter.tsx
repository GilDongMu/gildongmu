import { useState } from "react";

import FilterBtn from "@/components/travel/contents/filterBtn";
const filterMock = [
  "전체",
  "여자만",
  "남자만",
  "여자/남자",
  "모집 중",
  "모집 완료",
];
// interface FilterProps {
//   search: string;
// }

function Filter() {
  const [search, setSearch] = useState("전체");
  return (
    <div className="relative border-b border-line-02 bg-white font-bold tracking-tight text-text-01">
      <div
        className="m-auto w-full max-w-[1200px] mobile:overflow-x-scroll"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="m-auto flex w-max justify-center gap-12 px-36 py-20 mobile:justify-start">
          {filterMock.map((item, index) => (
            <FilterBtn
              key={index}
              text={item}
              search={search}
              setSearch={setSearch}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
export default Filter;
