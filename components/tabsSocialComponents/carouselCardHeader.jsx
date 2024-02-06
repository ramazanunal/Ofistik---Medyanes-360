import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { FaPlus, FaCheck, FaRegCircleCheck, FaXmark } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import { RiSpam2Fill } from "react-icons/ri";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import reports from './mock/reports';


function CarouselCardHeader({
    post,
    usersData,
    setUsersData,
    className,
    type,
    popoverRef,
    openCarouselRef,
    dialogContentRef,
    openCommentPage,
}) {
    const [open, setOpen] = useState(false);
    const [valueIdInDialog, setValueIdInDialog] = useState(undefined);
    const [radioSelectedValue, setRadioSelectedValue] = useState(null);
    const [reportHeader, setReportHeader] = useState(null)
    const footerData = [
        {
            id: 1,
            name: "Takibi bırak",
            onclick: (userName) => {
                setUsersData((prevUsers) =>
                    prevUsers.map((user) =>
                        user.username === userName ? { ...user, follow: false } : user
                    )
                );
            }
        },
    ]

    const handleFollow = (userName) => {
        setUsersData((prevUsers) =>
            prevUsers.map((user) =>
                user.username === userName ? { ...user, follow: !user.follow } : user
            )
        );
    }

    useEffect(() => {
        const scrollEvent = () => {
            setOpen(false)
        }
        const handleOutsideClick = (e) => {
            if (openCarouselRef?.current) {
                if ((!(dialogContentRef.current && dialogContentRef.current.contains(e.target)) &&
                    !(dialogContentRef.current && !dialogContentRef.current.contains(e.target)) &&
                    !(popoverRef.current && popoverRef.current.contains(e.target)))
                    || (dialogContentRef.current && !dialogContentRef.current.contains(e.target))) {
                    setOpen(false)
                    setReportHeader(null)
                    setRadioSelectedValue(null)
                    setTimeout(() => {
                        setValueIdInDialog(undefined)
                    }, 200)
                }
            }
        };

        openCarouselRef?.current?.childNodes[0]?.addEventListener("scroll", scrollEvent)
        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            openCarouselRef?.current?.childNodes[0]?.removeEventListener("scroll", scrollEvent)
            document.removeEventListener('mousedown', handleOutsideClick);
            document.removeEventListener('mousedown', handleOutsideClick);
        }
    }, [])

    useEffect(() => {
        if (openCommentPage != undefined) {
            setOpen(false)
            setRadioSelectedValue(null)
            setReportHeader(null)
        }
    }, [openCommentPage])

    useEffect(() => {
        // Her iki state değiştiğinde çalışacak kodlar buraya gelecek
        if (reportHeader !== null && valueIdInDialog !== null) {
            // İlgili işlemleri burada gerçekleştirin
            if (reportHeader === "spam" ||
                reportHeader === "Sadece bundan hoşlanmadım" ||
                reportHeader === "Sahtecilik veya dolandırıcılık"
            ) {
                handleSubmit();
            }
        }
    }, [reportHeader, valueIdInDialog]);

    const handleSubmit = () => {
        // bu kısımda verilerin backende gönderilmesi gerekiyor
        console.log(reportHeader != null ? reportHeader : "");
        console.log(radioSelectedValue != null ? radioSelectedValue : "");
    }

    const goBack = () => {
        setRadioSelectedValue(null)
        setReportHeader(null)
        const id = Number(valueIdInDialog.id.split(".")[0]);
        let idWithGoBack = reports[id];
        if (valueIdInDialog.id.split(".").length <= 2) {
            setValueIdInDialog(undefined)
        } else {
            for (let i = 0; i < valueIdInDialog.id.split(".").length - 2; i++) {
                idWithGoBack = idWithGoBack.child
            }
            setValueIdInDialog(idWithGoBack)
        }
    }

    const handleClose = () => {
        setOpen(false)
        setReportHeader(null)
        setRadioSelectedValue(null)
        setTimeout(() => {
            setValueIdInDialog(undefined)
        }, 200)
    }

    return (
        <div className={`flex justify-between items-center p-2 ${className}`}>
            <div className="flex items-center gap-3 text-white py-1 ">
                <Image
                    src={usersData.find((user) => user.username == post.username)?.profile_picture.src}
                    className="rounded-full w-[35px] h-[35px] telefon:w-[40px] telefon:h-[40px] desktop:w-[50px] desktop:h-[50px]"
                    width={60}
                    height={60}
                    loading='lazy'
                    alt="Profile of the author"
                />
                <div className="flex flex-col items-start">
                    {/* signup tarafında belirli bir uzunluktan sonra kabul etmemesi gerekir */}
                    <span className="text-sm telefon:text-base desktop:text-xl">{post.username}</span>
                    <span className="text-white/70 text-xs telefon:text-sm font-light desktop:text-lg">Lorem ipsum.</span>
                </div>
            </div>
            <div className='flex gap-2'>
                {/* tıklandığında follow && unfollow işlemi yapılacak */}
                <button onClick={() => handleFollow(post.username)} className="flex flex-nowrap justify-center items-center gap-2 miniTablet:gap-1 desktop:gap-2 text-white border text-sm h-fit w-fit p-1 rounded-lg transition-all ease-in-out duration-200 hover:text-black hover:bg-white/80 miniTablet:scale-90 desktop:scale-100">
                    {(usersData.find((user) => user.username == post.username)?.follow == true)
                        ?
                        <><span className="hidden miniTablet:block whitespace-nowrap">Takip ediliyor</span> <FaCheck /></>
                        :
                        <><span className="hidden miniTablet:block">Takip et</span> <FaPlus /> </>
                    }
                </button>
                {type == "horizontalPage" &&
                    <Popover open={open} >
                        <PopoverTrigger onClick={() => setOpen(!open)}><BsThreeDots className="text-white" /></PopoverTrigger>
                        <PopoverContent ref={popoverRef} className="flex flex-col gap-2 p-0 w-fit hover:bg-gray-100" >
                            <Dialog className="" >
                                <DialogTrigger className='flex items-center  gap-2 p-3 '>
                                    <RiSpam2Fill />
                                    <span>Şikayet et</span>
                                </DialogTrigger>
                                <DialogContent onClick={handleClose}
                                    className="bg-primary border-none  w-full max-w-screen-[450px]" ref={dialogContentRef}>
                                    <DialogHeader >
                                        {<DialogTitle className={`text-white flex justify-between border-b px-6 py-4`}>
                                            {<button className={`disabled:opacity-100 opacity-0}`} disabled={(valueIdInDialog != undefined && valueIdInDialog.child == undefined) ? true : false}
                                                onClick={goBack}>
                                                <span className={` ${valueIdInDialog != undefined && valueIdInDialog.child ? 'block' : 'hidden'} `}>
                                                    <IoIosArrowBack />
                                                </span>
                                            </button>}
                                            <span>Şikayet</span>
                                            <button className='justify-self-end' onClick={handleClose}><FaXmark /></button>
                                        </DialogTitle>}
                                        <DialogDescription >
                                            <div className="flex flex-col items-start gap-4 mt-2 px-6 py-2 w-full">
                                                {valueIdInDialog == undefined
                                                    ?
                                                    <>
                                                        <span className='text-white text-lg font-semibold'>
                                                            Bu gönderiyi neden bildiriyorsunuz?
                                                        </span>
                                                        {reports.map((report, index) => (
                                                            <button key={index} onClick={() => {
                                                                setReportHeader(report.name);
                                                                setValueIdInDialog(reports[report.id]?.child);
                                                            }}
                                                                className='flex items-center miniTablet:gap-4 py-1 px-[5px] justify-between w-full text-white text-base '>
                                                                <span className='text-start  '>{report.name}</span>
                                                                <span className='text-gray-400'><IoIosArrowForward /></span>
                                                            </button>
                                                        ))}
                                                    </>
                                                    :
                                                    valueIdInDialog.child == undefined ?
                                                        <div className='flex flex-col items-center gap-2 text-center text-white w-full'>
                                                            <div className='text-green-500 mb-4'><FaRegCircleCheck size={30} /></div>
                                                            <div className='font-semibold  '>{valueIdInDialog.name}</div>
                                                            <div className='text-gray-400 '>{valueIdInDialog.description}</div>
                                                            {usersData.find((user) => user.username == post.username)?.follow == true &&
                                                                <div className="flex flex-col gap-4 mt-8 w-full items-start ">
                                                                    {footerData.map((item, index) => (
                                                                        <button
                                                                            key={index}
                                                                            onClick={() => {
                                                                                setOpen(false)
                                                                                setTimeout(() => {
                                                                                    item.onclick(post.username)
                                                                                }, 100);
                                                                            }}
                                                                            className="mb-2  w-fit border rounded-lg p-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white  transition-all duration-200">
                                                                            {item.name}  {post.username}
                                                                        </button>
                                                                    ))}
                                                                </div>}
                                                            <button
                                                                onClick={handleClose}
                                                                className={`disabled:bg-blue-400/80 w-full text-center rounded-lg  bg-blue-600 text-white py-1 mb-2`}
                                                            > Kapat </button>
                                                        </div>
                                                        :
                                                        <div className='flex flex-col w-full' >
                                                            {valueIdInDialog.name && <div className='font-semibold text-white'>{valueIdInDialog.name}</div>}
                                                            {valueIdInDialog.description && <div className='text-gray-400'>{valueIdInDialog.description}</div>}
                                                            {valueIdInDialog.radioList &&
                                                                <RadioGroup className="text-white border p-4 my-2" onValueChange={(value) => setRadioSelectedValue(value)} >
                                                                    {valueIdInDialog.radioList.map((radio) => (
                                                                        <div key={radio.id} className="flex items-center space-x-2">
                                                                            <RadioGroupItem value={radio.name} id={`r${radio.id}`} />
                                                                            <label htmlFor={`r${radio.id}`}>{radio.name}</label>
                                                                        </div>
                                                                    ))}
                                                                </RadioGroup>
                                                            }
                                                            {valueIdInDialog.listTitle && <div className='text-white my-1'>{valueIdInDialog.listTitle}</div>}
                                                            {valueIdInDialog.listSubtitle && <div className='text-gray-400 font-semibold my-1'>{valueIdInDialog.listSubtitle}</div>}
                                                            {valueIdInDialog.listItems && <ul className='text-gray-400 list-disc list-inside my-1'>
                                                                {valueIdInDialog.listItems.map((item, index) => (
                                                                    <li key={index}>{item}</li>
                                                                ))}
                                                            </ul>}
                                                            {valueIdInDialog.buttons &&
                                                                <div className='flex flex-col gap-4 my-4 w-full'>
                                                                    {valueIdInDialog.buttons.map((button, index) => (
                                                                        <button type='button' key={index}
                                                                            className='flex items-center miniTablet:gap-4 justify-between w-full text-white'
                                                                            onClick={() => {
                                                                                setValueIdInDialog(valueIdInDialog.child);
                                                                                setRadioSelectedValue(button.name)
                                                                                reportHeader == "Yanlış bilgi" && handleSubmit()
                                                                            }}
                                                                        >
                                                                            <span className='text-start'>{button.name}</span>
                                                                            <span className='text-gray-400'><IoIosArrowForward /></span>
                                                                        </button>
                                                                    ))}
                                                                </div>
                                                            }
                                                            {valueIdInDialog.child && valueIdInDialog.child.child == undefined && reportHeader != "Yanlış bilgi" &&
                                                                <button
                                                                    type='submit'
                                                                    className={`disabled:bg-blue-400/80 w-full text-center rounded-lg  bg-blue-600 text-white py-1 my-2`}
                                                                    onClick={() => {
                                                                        setValueIdInDialog(valueIdInDialog.child)
                                                                        valueIdInDialog.child.child == undefined && handleSubmit()
                                                                    }}
                                                                    disabled={valueIdInDialog.radioList && radioSelectedValue == null}
                                                                >
                                                                    Şikayeti gönder
                                                                </button>
                                                            }
                                                        </div>
                                                }
                                            </div>
                                        </DialogDescription>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>
                        </PopoverContent>
                    </Popover>}
            </div>
        </div>
    )
}
export default CarouselCardHeader