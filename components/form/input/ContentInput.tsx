import React, { useEffect, useState } from "react";

import { Textarea } from "@/components/ui/textarea";

function ContentTextarea({
  onChange,
  value,
  isError,
}: {
  onChange: (value: string) => void;
  value: string;
  isError?: boolean;
}) {
  const [text, setText] = useState(value);

  useEffect(() => {
    setText(value);
  }, [value]);

  useEffect(() => {
    onChange(text);
  }, [text, onChange]);

  return (
    <div className="w-[756px] tablet:w-[672px] mobile:w-272 flex flex-col gap-4">
      <Textarea
        id="content"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className={`w-full h-[211px] bg-bg-02 resize-none placeholder:text-text-05 tablet:h-[214px] border border-line-02 rounded-12 px-16 py-16 focus-visible:ring-0 focus-visible:ring-offset-0 focus:bg-white focus:border focus:border-line-01 ${isError && "bg-input-error border-0"}`}
        placeholder="모집 내용을 작성해 주세요"
      />
    </div>
  );
}

export default ContentTextarea;