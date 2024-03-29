import CardGrid from "@/components/travel/contents/cardGrid";
import PagingSetting from "@/components/travel/contents/pagingSetting";

function Paging() {
  return (
    <div className="bg-white tracking-tight text-text-01 relative font-bold border-b border-line-03">
      <div className="max-w-[1200px] w-full m-auto px-24 pt-40 tablet:pt-24 pb-80 tablet:pb-40 mobile:pb-24 relative">
        <PagingSetting />
        <CardGrid />
      </div>
    </div>
  );
}

export default Paging;
