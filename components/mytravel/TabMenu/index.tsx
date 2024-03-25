export default function TabMenu() {
  return (
    <div className="absolute top-120 z-20 flex h-72 w-[480px] items-center justify-center rounded-36 bg-white px-48 py-10 shadow-md tablet:h-64 tablet:w-[420px] mobile:h-56 mobile:w-312 mobile:px-24">
      <div className="flex items-center justify-center gap-8">
        <button className="line-height-130 letter-spacing--0.6 flex h-60 w-150 items-center justify-center text-center text-18 font-bold focus:rounded-36 focus:bg-[#E0E7FF] focus:text-[#6366F1] tablet:h-52 tablet:w-130 mobile:h-44 mobile:w-94">
          참여 중
        </button>
        <button className="line-height-130 letter-spacing--0.6 flex h-60 w-150 items-center justify-center text-center text-18 font-bold focus:rounded-36 focus:bg-[#E0E7FF] focus:text-[#6366F1] tablet:h-52 tablet:w-130 mobile:h-44 mobile:w-94">
          모집 중
        </button>
        <button className="line-height-130 letter-spacing--0.6 flex h-60 w-150 items-center justify-center text-center text-18 font-bold focus:rounded-36 focus:bg-[#E0E7FF] focus:text-[#6366F1] tablet:h-52 tablet:w-130 mobile:h-44 mobile:w-94">
          찜
        </button>
      </div>
    </div>
  );
}