import React, { useState } from 'react'
import { IoIosAddCircle } from 'react-icons/io'
import { FaPencilAlt } from 'react-icons/fa'
import { TfiWrite } from 'react-icons/tfi'
import { postAPI } from '@/services/fetchAPI'
import { toast } from 'react-toastify'
const ResumeSection = ({ mockData, loading }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [resumeText, setResumeText] = useState(mockData?.resume?.text || '')
  const [initialResumeText, setInitialResumeText] = useState(
    mockData?.resume?.text || ''
  )

  const handleEditClick = () => {
    setInitialResumeText(resumeText)
    setIsEditing(true)
  }

  const handleSaveClick = async () => {
    const data = { hizmetVerenId: mockData.id, resumeText }
    try {
      const res = await postAPI('/profile/general/add-resume', data)
      if (res.status === 'ADDED') {
        toast.success('Özgeçmiş Başarıyla Eklendi')
      } else if (res.status === 'UPDATED') {
        toast.success('Özgeçmiş Başarıyla Güncellendi')
      } else {
        console.log(res.message)
      }
    } catch (error) {
      console.error('API request failed:', error)
    }
    setIsEditing(false)
  }

  const handleCancelClick = () => {
    setResumeText(initialResumeText)
    setIsEditing(false)
  }

  const handleInputChange = (e) => {
    setResumeText(e.target.value)
  }

  return (
    !loading && (
      <>
        <div className="flex items-center gap-2">
          <TfiWrite className="text-[11px] sm:text-sm telefon:text-lg md:text-[15px] text-premiumOrange" />
          <h1 className="text-[11px] sm:text-sm telefon:text-lg md:text-[15px] font-medium text-gray-700">
            Özgeçmiş
          </h1>
        </div>
        <div className="bg-white text-gray-600 p-5 rounded-md shadow-xl text-start text-[11px] w-full">
          {isEditing ? (
            <div>
              <textarea
                className="w-full h-64 p-2 border rounded"
                value={resumeText}
                onChange={handleInputChange}
              />
              <div className="mt-2 flex items-center gap-4">
                <button
                  className="bg-red-500 text-white px-2 py-1 "
                  onClick={handleCancelClick}
                >
                  İptal
                </button>
                <button
                  className="bg-green-500 text-white px-2 py-1 disabled:bg-green-200"
                  disabled={
                    resumeText === initialResumeText || resumeText.trim() === ''
                  }
                  onClick={handleSaveClick}
                >
                  Kaydet
                </button>
              </div>
            </div>
          ) : (
            <div className="">
              <button
                className="text-blue-500 hover:text-blue-400 px-2 py-1 mb-2"
                onClick={handleEditClick}
              >
                {mockData?.resume === '' || mockData?.resume === null ? (
                  <IoIosAddCircle
                    size={25}
                    className="text-blue-600 hover:text-blue-500"
                  />
                ) : (
                  <FaPencilAlt size={15} />
                )}
              </button>
              <p>
                {resumeText ? (
                  resumeText
                ) : (
                  <p>Hernagi Bir Özgeçiş Verisi Bulunamadı</p>
                )}
              </p>
            </div>
          )}
        </div>
      </>
    )
  )
}

export default ResumeSection
