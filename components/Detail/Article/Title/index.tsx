import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

import AlertModal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import {
  deleteBookMarks,
  getBookMarks,
  postBookMarks,
} from "@/lib/api/bookmarks";
import {
  deleteParticipants,
  getParticipants,
  postParticipants,
} from "@/lib/api/detail";
import { DetailDataType } from "@/lib/api/detail/type";
import { getUserMe } from "@/lib/api/userMe";

function DetailTitle({ data }: DetailDataType) {
  const queryClient = useQueryClient();
  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUserMe(),
  });

  const router = useRouter();
  const isOwner = userData?.id === data?.id;

  const {
    data: applyData,
    status,
    error,
  } = useQuery({
    queryKey: ["apply", data?.id],
    queryFn: () => getParticipants(data.id, isOwner ? "PENDING" : "ACCEPTED"),
  });

  const isApply = status;
  console.log(applyData, status, error);
  const isSubmit = false;

  const titleData = {
    title: data?.title,
    nickname: data?.nickname,
  };

  const { data: bookMarkData } = useQuery({
    queryKey: ["mybookmark"],
    queryFn: () => getBookMarks(),
  });
  const myBookMark = bookMarkData?.[0]?.myBookmark ?? false;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCancleModalOpen, setIsCancleModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(myBookMark);

  const { mutate: applyMutate } = useMutation({
    mutationFn: () => postParticipants(data.id),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const { mutate: cancelMutate } = useMutation({
    mutationFn: () => deleteParticipants(data.id),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const { mutate: postbookmark } = useMutation({
    mutationFn: () => postBookMarks(data.id),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const { mutate: deletebookmark } = useMutation({
    mutationFn: () => deleteBookMarks(data.id),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const applyParticipants = () => {
    applyMutate();
  };

  const cancelParticipants = () => {
    cancelMutate();
  };

  const toggleBookmark = (e: any) => {
    if (myBookMark) {
      e.preventDefault();
      deletebookmark();
    } else {
      e.preventDefault();
      postbookmark();
    }
    setIsBookmarked(!isBookmarked);
  };

  const handleClick = (e: any) => {
    toggleBookmark(e);
    setIsRotating(true);
    setTimeout(() => setIsRotating(false), 500);
  };

  const handleModal = () => {
    if (status === "success") {
      setIsCancleModalOpen(true);
    } else {
      setIsModalOpen(true);
    }
  };

  const handleCancleModal = () => {
    setIsCancleModalOpen(true);
  };

  const handleEdit = () => {
    router.push(`/travel/${data.id}/detail/edit`);
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const handleProfile = () => {
    setIsProfileModalOpen(true);
  };

  return (
    <>
      <div className="mx-auto my-0 flex h-136 w-full flex-col gap-10 rounded-24 bg-white px-32 py-24 tablet:h-128 mobile:h-194 mobile:px-20">
        <div className="flex items-center justify-between mobile:relative mobile:flex-col mobile:items-start mobile:justify-normal">
          <div className="text-20 font-bold tablet:text-18">
            {titleData.title}
          </div>
          <div>
            {isOwner ? (
              <div className="flex h-44 items-center gap-8 mobile:absolute mobile:right-0 mobile:top-110">
                <button
                  type="button"
                  className="relative h-24 w-24"
                  onClick={handleEdit}
                >
                  <Image
                    src="/icons/writeEdit.svg"
                    alt="수정 버튼"
                    fill
                    className="absolute"
                  />
                </button>
                <button
                  type="button"
                  className="relative h-21 w-24"
                  onClick={handleDelete}
                >
                  <Image
                    src="/icons/writeDelete.svg"
                    alt="삭제 버튼"
                    fill
                    className="absolute"
                  />
                </button>
              </div>
            ) : (
              <div className="mx-auto flex w-full gap-16 mobile:absolute mobile:top-110">
                <button
                  type="button"
                  className={`relative h-44 w-44 ${isRotating ? "heartRotate" : ""} tablet:h-36 tablet:w-36`}
                  onClick={handleClick}
                >
                  <Image
                    src={
                      myBookMark
                        ? "/icons/heart-notEmpty.svg"
                        : "/icons/heart-empty.svg"
                    }
                    alt="찜 버튼"
                    fill
                    className="absolute"
                  />
                </button>
                <Button
                  type="button"
                  className="h-44 w-91 tablet:h-36 tablet:w-83 tablet:text-14 mobile:w-220"
                  onClick={handleModal}
                >
                  신청하기
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-12">
          <div className="relative h-32 w-32 rounded-full border border-line-02">
            <Image
              src={
                data?.profilePath
                  ? `https://gildongmuu.s3.ap-northeast-2.amazonaws.com/${data.profilePath}`
                  : "/icons/defaultProfile.png"
              }
              alt="Profile"
              fill
              className="absolute rounded-full object-cover"
            />
          </div>
          <button
            type="button"
            className="flex items-center gap-3"
            onClick={handleProfile}
          >
            <span className="text-16 tablet:text-14">{titleData.nickname}</span>
            <div className="relative h-20 w-20">
              <Image
                src="/icons/profileArrow.svg"
                alt="화살표"
                fill
                className="absolute"
              />
            </div>
          </button>
        </div>
      </div>
      {isModalOpen && (
        <AlertModal
          modalType="travelApply"
          onClose={() => {
            setIsModalOpen(false);
          }}
          onCancel={() => {
            setIsModalOpen(false);
          }}
          onConfirm={() => {
            applyParticipants();
            setIsModalOpen(false);
          }}
        />
      )}
      {isCancleModalOpen && (
        <AlertModal
          modalType="noticeDisabledApply"
          onClose={() => {
            setIsCancleModalOpen(false);
          }}
        />
      )}
      {isDeleteModalOpen && (
        <AlertModal
          modalType="writingDelete"
          onClose={() => {
            setIsDeleteModalOpen(false);
            router.back();
          }}
        />
      )}
      {isProfileModalOpen && (
        <AlertModal
          data={data}
          modalType="userProfile"
          onClose={() => {
            setIsProfileModalOpen(false);
          }}
        />
      )}
    </>
  );
}

export default DetailTitle;
