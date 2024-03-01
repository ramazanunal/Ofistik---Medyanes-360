"use cleint"
import React, { use, useEffect, useRef, useState } from 'react'
import { Field, Form, Formik } from 'formik';
import Image from 'next/image';
import { useProfileStore } from '@/store/useProfileStore';

function AddPostComp() {
    const [fileData, setFileData] = useState(false)
    const [fileName, setFileName] = useState(false)
    const [fileType, setFileType] = useState(false)
    const videoRef = useRef(null);
    const formRef = useRef(null);
    const setOpenAddPost = useProfileStore((state) => state.setOpenAddPost)
    const openAddPost = useProfileStore((state) => state.openAddPost)

    const handleClose = () => {
        setOpenAddPost(false)
    }

    useEffect(() => {
        const handleClick = (e) => {
            if (formRef.current && !formRef.current.contains(e.target)) {
                handleClose()
                if (openAddPost == false) {
                    document.body.style.overflow = "hidden";
                } else {
                    document.body.style.overflow = "auto";
                }
            }
        }

        document.addEventListener('mousedown', handleClick)
        return () => {
            document.removeEventListener('mousedown', handleClick)
        }
    }, [])


    return (
        <div
            className={`w-full h-screen fixed  top-0 left-0 bg-white/60 backdrop-blur-sm flex justify-center items-center z-[45] md:items-center ${openAddPost != false ? "block" : "hidden"}`}>
            <Formik
                initialValues={{
                    file: '',
                    description: '',
                }}
                onSubmit={async (values) => {
                    await new Promise((r) => setTimeout(r, 500));
                    alert(JSON.stringify(values, null, 2));
                }}
            >
                {props =>
                    <Form
                        ref={formRef}
                        className='flex relative flex-col items-center bg-primary px-4 py-16 md:p-16 gap-5 text-white w-[95%] md:w-[40%] rounded-md'
                    >
                        <button
                            type='button'
                            className='flex items-center justify-center text-lg text-primary font-bold absolute top-4 right-4 md:top-5 md:right-5 bg-white/80  border border-white/75 p-1 w-8 h-8 rounded-full active:scale-95'
                            onClick={() => handleClose()}
                        >
                            x
                        </button>
                        {console.log(props.values)}
                        <div className='flex gap-2 flex-col w-full '>
                            <label htmlFor="file" className='flex items-center flex-col gap-2 w-full cursor-pointer' >
                                <div className=' w-[200px] h-[200px] relative '>
                                    <div className={` w-[200px] h-[200px] relative ${fileType == 'image' ? "block" : "hidden"}`}>
                                        <Image
                                            src={fileData && fileType == "image" ? fileData : '/images/placeholder.png'}
                                            fill
                                            alt="resim"
                                            className={`bg-white/10 ${fileData == false && "p-8"} object-cover rounded-md`}
                                        />
                                    </div>
                                    <video
                                        width={200}
                                        height={200}
                                        className={`w-[200px] h-[200px] relative ${fileType == 'video' ? "block" : "hidden"} object-cover`}
                                        ref={videoRef}
                                        muted
                                    />
                                    <div className={` w-[200px] h-[200px] relative ${fileType == false ? "block" : "hidden"}`}>
                                        <Image
                                            src={'/images/placeholder.png'}
                                            fill
                                            alt="resim"
                                            className={`bg-white/10 ${fileData == false && "p-8"} object-cover rounded-md`}
                                        />
                                    </div>
                                </div>
                                <div className='border border-dashed text-center p-5 w-full'>
                                    {fileName ? fileName : "Tıkla Resim - Video seç"}
                                </div>
                            </label>
                            {fileData && <button type='button' onClick={() => {
                                props.setFieldValue("file", "");
                                fileType == 'image' ? setFileData(false) : videoRef.current.src = ""
                                setFileType(false)
                                setFileName(false)
                                setFileData(false)
                            }}>
                                {fileType == 'image' ? <span>Resmi Sil</span> : <span>Videoyu Sil</span>}
                            </button>}
                            <Field
                                className="hidden"
                                id="file"
                                name="file"
                                type="file"
                                accept="image/*, video/*"
                                onChange={(e) => {
                                    props.handleChange(e)
                                    const file = e.target.files[0]
                                    const reader = new FileReader()
                                    setFileName(file.name)
                                    setFileType(file.type.split('/')[0])
                                    reader.onloadend = () => {
                                        setFileData(reader.result)
                                        if (file.type.split('/')[0] == 'video' && videoRef.current) {
                                            videoRef.current.src = URL.createObjectURL(file)
                                            videoRef.current.play()
                                            console.log(videoRef.current.src);
                                        }

                                    }
                                    reader.readAsDataURL(file)
                                }}
                            />
                        </div>
                        <div className='flex gap-2 flex-col w-full'>
                            <label htmlFor="description">Açıklama</label>
                            <Field id="description"
                                name="description"
                                as="textArea"
                                placeholder="Açıklama..."
                                className='bg-secondary text-black p-2 rounded-md w-full'
                            />
                        </div>

                        <button
                            className='bg-secondary text-black p-2 rounded-md w-full'
                            type="submit"
                        >Post ekle</button>
                    </Form>
                }
            </Formik>
        </div>
    )
}

export default AddPostComp