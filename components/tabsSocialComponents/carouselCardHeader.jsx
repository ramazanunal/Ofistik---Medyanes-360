import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { FaPlus, FaCheck, FaXmark } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RiSpam2Fill } from "react-icons/ri";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import reports from "./mock/reports";
import { useProfileStore } from "@/store/useProfileStore";
import { MdDelete } from "react-icons/md";
import { useSession } from "next-auth/react";
import { MdEdit } from "react-icons/md";
import axios from "axios";
import Swal from "sweetalert2";

function CarouselCardHeader({
  post,
  className,
  type,
  popoverRef,
  openCarouselRef,
  dialogContentRef,
  openCommentPage,
  options,
}) {
  const [open, setOpen] = useState(false);
  const [valueIdInDialog, setValueIdInDialog] = useState(undefined);
  const [radioSelectedValue, setRadioSelectedValue] = useState(null);
  const [reportHeader, setReportHeader] = useState(null);
  const setUsersData = useProfileStore((state) => state.setUsers);
  const usersData = useProfileStore((state) => state.users);
  const { data: session } = useSession();
  const id = session?.user.id;
  const [userInfo, setUserInfo] = useState(null); // Ensure default state is null
  const [isFollowing, setIsFollowing] = useState(false); // Follow state

  const footerData = [
    {
      id: 1,
      name: "Takibi bırak",
      onclick: (userName) => {
        setUsersData(
          usersData.map((user) =>
            user.username === userName ? { ...user, follow: false } : user
          )
        );
      },
    },
  ];

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`/api/profile/${id}/get-info`);
        setUserInfo(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    if (id) {
      fetchProfile();
    }
  }, [id]);

  const updateFollowStatus = useCallback(() => {
    const isFollowingUser = userInfo?.following.some(
      (follow) => follow.followingId === post.userID
    );
    setIsFollowing(isFollowingUser);
  }, [userInfo, post.userID]);

  useEffect(() => {
    updateFollowStatus();
  }, [updateFollowStatus]);

  const handleFollow = async (userIdToFollow) => {
    try {
      const response = await axios.post("/api/follow", {
        userIdToFollow,
        followerId: id,
      });

      if (response.data.message === "Followed successfully") {
        Swal.fire({
          icon: "success",
          title: "Başarılı",
          text: "Takip edildi!",
          timer: 2000,
          showConfirmButton: false,
        });

        // Update follow status
        setIsFollowing(true);

        // Update the users data store
        setUsersData(
          usersData.map((user) =>
            user.id === userIdToFollow ? { ...user, follow: true } : user
          )
        );
      } else if (response.data.message === "Unfollowed successfully") {
        Swal.fire({
          icon: "success",
          title: "Başarılı",
          text: "Takipten Çıkıldı!",
          timer: 2000,
          showConfirmButton: false,
        });

        // Update follow status
        setIsFollowing(false);

        // Update the users data store
        setUsersData(
          usersData.map((user) =>
            user.id === userIdToFollow ? { ...user, follow: false } : user
          )
        );
      }
    } catch (error) {
      console.error("Failed to follow/unfollow:", error);
      Swal.fire({
        icon: "error",
        title: "Hata",
        text: "Bir hata oluştu. Lütfen tekrar deneyin.",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  useEffect(() => {
    const scrollEvent = () => {
      setOpen(false);
    };
    const handleOutsideClick = (e) => {
      if (openCarouselRef?.current) {
        if (
          (!(
            dialogContentRef.current &&
            dialogContentRef.current.contains(e.target)
          ) &&
            !(
              dialogContentRef.current &&
              !dialogContentRef.current.contains(e.target)
            ) &&
            !(popoverRef.current && popoverRef.current.contains(e.target))) ||
          (dialogContentRef.current &&
            !dialogContentRef.current.contains(e.target))
        ) {
          setOpen(false);
          setReportHeader(null);
          setRadioSelectedValue(null);
          setTimeout(() => {
            setValueIdInDialog(undefined);
          }, 200);
        }
      }
    };

    openCarouselRef?.current?.childNodes[0]?.addEventListener(
      "scroll",
      scrollEvent
    );
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      openCarouselRef?.current?.childNodes[0]?.removeEventListener(
        "scroll",
        scrollEvent
      );
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (openCommentPage !== undefined) {
      setOpen(false);
      setRadioSelectedValue(null);
      setReportHeader(null);
    }
  }, [openCommentPage]);

  useEffect(() => {
    if (reportHeader !== null && valueIdInDialog !== null) {
      if (
        reportHeader === "spam" ||
        reportHeader === "Sadece bundan hoşlanmadım" ||
        reportHeader === "Sahtecilik veya dolandırıcılık"
      ) {
        handleSubmit();
      }
    }
  }, [reportHeader, valueIdInDialog]);

  const handleSubmit = () => {
    console.log(reportHeader != null ? reportHeader : "");
    console.log(radioSelectedValue != null ? radioSelectedValue : "");
  };

  const goBack = () => {
    setRadioSelectedValue(null);
    setReportHeader(null);
    const id = Number(valueIdInDialog.id.split(".")[0]);
    let idWithGoBack = reports[id];
    if (valueIdInDialog.id.split(".").length <= 2) {
      setValueIdInDialog(undefined);
    } else {
      for (let i = 0; i < valueIdInDialog.id.split(".").length - 2; i++) {
        idWithGoBack = idWithGoBack.child;
      }
      setValueIdInDialog(idWithGoBack);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setReportHeader(null);
    setRadioSelectedValue(null);
    setTimeout(() => {
      setValueIdInDialog(undefined);
    }, 200);
  };
  return (
    <div className={`flex justify-between items-center p-2 ${className}`}>
      <div className="flex items-center gap-3 text-white py-1">
        <Image
          src={
            usersData.find((user) => user.username === post.username)
              ?.profile_picture.src
          }
          className="rounded-full w-[35px] h-[35px] sm:w-[40px] sm:h-[40px] xl:w-[50px] xl:h-[50px]"
          width={60}
          height={60}
          loading="lazy"
          alt="Profile of the author"
        />
        <div className="flex flex-col items-start">
          <span className="text-sm sm:text-base xl:text-xl">
            {post.username}
          </span>
          <span className="text-white/70 text-xs sm:text-sm font-light xl:text-lg">
            Lorem ipsum.
          </span>
        </div>
      </div>
      <div className="flex gap-2">
        {post.userID !== session.user.id && (
          <button
            onClick={() => handleFollow(post.userID)}
            className="flex flex-nowrap justify-center items-center gap-2 md:gap-1 xl:gap-2 text-white border text-sm h-fit w-fit p-1 rounded-lg transition-all ease-in-out duration-200 hover:text-black hover:bg-white/80 md:scale-90 xl:scale-100"
          >
            {isFollowing ? (
              <>
                Takiptesin <FaCheck />
              </>
            ) : (
              <>
                Takip et <FaPlus />
              </>
            )}
          </button>
        )}
        {type === "horizontalPage" && (
          <Popover open={open} className="">
            <PopoverTrigger onClick={() => setOpen(!open)}>
              <BsThreeDots className="text-white" />
            </PopoverTrigger>
            <PopoverContent
              ref={popoverRef}
              className="flex flex-col gap-2 p-0 w-fit z-[46]"
            >
              <Dialog className="">
                {options === 1 && (
                  <DialogTrigger className="flex items-center rounded-xl gap-2 p-3 hover:bg-premiumOrange transition-all duration-500">
                    <RiSpam2Fill />
                    <span>Şikayet et</span>
                  </DialogTrigger>
                )}
                {options === 2 && (
                  <>
                    <DialogTrigger className="flex items-center rounded-xl gap-1 p-3 hover:bg-premiumOrange transition-all duration-500 hover:text-white/70">
                      <MdEdit />
                      <span>Düzenle</span>
                    </DialogTrigger>
                    <DialogTrigger className="flex items-center rounded-xl gap-2 p-3 hover:bg-premiumOrange transition-all duration-500 hover:text-white/70">
                      <MdDelete />
                      <span>Sil</span>
                    </DialogTrigger>
                  </>
                )}
                <DialogContent
                  ref={dialogContentRef}
                  className="overflow-auto no-scrollbar sm:max-w-lg max-h-[80vh] sm:h-fit z-[90]"
                  onEscapeKeyDown={handleClose}
                  onInteractOutside={handleClose}
                >
                  <DialogHeader className="justify-start">
                    <DialogTitle>Gönderiyi şikayet et</DialogTitle>
                    <DialogDescription>
                      <p>
                        <b>{post.username}</b> adlı kullanıcının{" "}
                        <b>
                          {type === "horizontalPage"
                            ? post?.images?.length === 1
                              ? "fotoğrafını"
                              : "gönderisini"
                            : "yorumunu"}
                        </b>{" "}
                        neden şikayet ettiğini seç.
                      </p>
                      <div className="mt-5 border-t pt-5">
                        {valueIdInDialog === undefined ? (
                          <ul className="grid gap-2">
                            {reports.map((report, index) => (
                              <li key={report.id}>
                                <button
                                  onClick={() => {
                                    setValueIdInDialog(report);
                                    setReportHeader(report.header);
                                  }}
                                  className="flex items-center gap-3 w-full hover:bg-premiumOrange/50 transition-all duration-200 text-start p-3 rounded-xl"
                                >
                                  <span className="bg-red-200 p-2 rounded-full">
                                    <RiSpam2Fill />
                                  </span>
                                  <span>{report.header}</span>
                                  <IoIosArrowForward className="ml-auto" />
                                </button>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <div>
                            <button
                              onClick={goBack}
                              className="flex gap-1 items-center p-1 text-white/60 transition-all duration-200 hover:text-white"
                            >
                              <IoIosArrowBack />
                              Geri git
                            </button>
                            <ul className="grid gap-2 mt-5">
                              {valueIdInDialog?.child.map((subReport) => (
                                <li key={subReport.id}>
                                  <button
                                    onClick={() =>
                                      setRadioSelectedValue(subReport.header)
                                    }
                                    className="flex items-center gap-3 w-full hover:bg-premiumOrange/50 transition-all duration-200 text-start p-3 rounded-xl"
                                  >
                                    <RadioGroup
                                      defaultValue=""
                                      value={radioSelectedValue}
                                      className="flex items-center gap-3"
                                    >
                                      <RadioGroupItem
                                        value={subReport.header}
                                        id={subReport.id}
                                        className="bg-white"
                                      />
                                      <span>{subReport.header}</span>
                                    </RadioGroup>
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                  {reportHeader !== null &&
                    valueIdInDialog !== null &&
                    reportHeader !== "spam" &&
                    reportHeader !== "Sadece bundan hoşlanmadım" &&
                    reportHeader !== "Sahtecilik veya dolandırıcılık" && (
                      <button
                        onClick={handleSubmit}
                        className="bg-premiumOrange hover:bg-premiumOrange/70 transition-all duration-200 text-white w-full p-3 mt-5 rounded-xl"
                      >
                        Şikayet et
                      </button>
                    )}
                </DialogContent>
              </Dialog>
              {footerData.map((item) => (
                <button
                  key={item.id}
                  onClick={() => item.onclick(post.username)}
                  className="flex items-center gap-2 p-3 hover:bg-premiumOrange transition-all duration-500 rounded-b-xl"
                >
                  <FaXmark />
                  <span>{item.name}</span>
                </button>
              ))}
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
}

export default CarouselCardHeader;
