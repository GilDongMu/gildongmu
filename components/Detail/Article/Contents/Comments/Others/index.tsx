import Image from "next/image";
import { useState } from "react";

import CommentOfComment from "@/components/Detail/Article/Contents/Comments/Others/CommentOfComment";
import RegistCommentOfComment from "@/components/Detail/Article/Contents/Comments/Register/CommentOfComment";
import SecretComment from "@/components/Detail/Article/Contents/Comments/Secret";
import WriterTag from "@/components/Detail/Tag";
import { Button } from "@/components/ui/button";

export default function OthersComment({ data, user, cardId }: any) {
  const [showReply, setShowReply] = useState(false);
  const [animationClass, setAnimationClass] = useState("");

  const toggleReply = () => {
    if (showReply) {
      setAnimationClass("animate-fade-out-down");
      setTimeout(() => {
        setShowReply(false);
        setAnimationClass("");
      }, 500);
    } else {
      setShowReply(true);
      setAnimationClass("animate-fade-down");
    }
  };
  const commentOfcomment = data.children;

  const shouldDisplay =
    (data.secret &&
      (user?.id === cardId || user?.nickname === data.nickname)) ||
    !data.secret;

  return shouldDisplay ? (
    <>
      <div className="flex flex-col items-start gap-8 self-stretch">
        <div className="flex items-center self-stretch py-2">
          <div className="flex items-center gap-12">
            <div className="relative h-32 w-32 rounded-full tablet:h-24 tablet:w-24">
              <Image
                src={
                  data?.profilePath
                    ? `https://gildongmuu.s3.ap-northeast-2.amazonaws.com/${data.profilePath}`
                    : "/icons/defaultProfile.png"
                }
                alt="댓글 작성자 이미지"
                fill
                sizes="32px"
              />
            </div>
            <span className="text-18 leading-[27px] tracking-[-0.6px] text-text-01 tablet:text-16 tablet:leading-[20.8px]">
              {data.nickname}
            </span>
            {data.secret && (
              <div className="relative h-20 w-20">
                <Image
                  src="/icons/lock.svg"
                  alt="자물쇠 이미지"
                  fill
                  sizes="20px"
                />
              </div>
            )}
            {data.owner && <WriterTag />}
          </div>
        </div>
        <div className="flex items-start gap-8 self-stretch overflow-auto py-12">
          <span className="text-16 font-normal leading-6 tracking-[-0.6px]">
            {data.content}
          </span>
        </div>
        <Button
          variant={"outline"}
          className="h-36 w-72 rounded-lg"
          onClick={toggleReply}
        >
          <span className="text-14 font-extrabold leading-5">답글</span>
        </Button>
        {showReply && (
          <div className={`${animationClass} w-full`}>
            <RegistCommentOfComment
              data={data}
              user={user}
              cardId={cardId}
              setShowReply={setShowReply}
            />
          </div>
        )}
      </div>
      {commentOfcomment?.map((item: any) => (
        <CommentOfComment
          key={item.id}
          data={item}
          user={user}
          cardId={cardId}
        />
      ))}
      <div className="h-[1px] self-stretch bg-sky-200"></div>
    </>
  ) : (
    <SecretComment />
  );
}
