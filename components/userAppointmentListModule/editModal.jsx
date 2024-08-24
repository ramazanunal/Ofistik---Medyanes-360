import React from 'react'
import { Formik, Field, Form } from 'formik'
import Swal from 'sweetalert2'
import Image from 'next/image'
import { getAPI, postAPI } from '@/services/fetchAPI'

const generateUniqueNumber = () => {
  return `RND-${Math.floor(Math.random() * 1000000)}`
}

const EditModal = ({ isOpen, onClose, event }) => {
  if (!event) return null

  const formatDate = (inputDate) => {
    if (!inputDate) return ''
    const parts = inputDate.split('.')
    const day = parts[0] ? parts[0].padStart(2, '0') : '01'
    const month = parts[1] ? parts[1].padStart(2, '0') : '01'
    const year = parts[2] ? parts[2].substring(0, 4) : '0000'
    return `${year}-${month}-${day}`
  }

  const [eventDate = '0000-01-01', eventTime = '00:00'] = event.time
    ? event.time.trim().split(' ')
    : ['0000-01-01', '00:00']

  const submitForm = async (values) => {
    try {
      const response = await postAPI(
        '/appointment/receiver/update-appointment',
        { values }
      )

      if (response.status === 'conflict') {
        await Swal.fire({
          title: 'Çakışma Uyarısı!',
          text: response.message,
          icon: 'error',
          confirmButtonText: 'Kapat',
        })
      } else if (response.status === 'success') {
        await Swal.fire({
          title: 'Başarılı!',
          text: response.message,
          icon: 'success',
          confirmButtonText: 'Kapat',
        })
        onClose()
      }
    } catch (error) {
      console.error('Randevu güncellenirken bir hata oluştu:', error)
      await Swal.fire({
        title: 'Hata!',
        text: 'Randevu güncellenirken bir hata oluştu. Lütfen tekrar deneyin.',
        icon: 'error',
        confirmButtonText: 'Kapat',
      })
    }
  }

  const modalClass = isOpen
    ? 'fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-600 bg-opacity-50'
    : 'hidden'

  const uniqueAppointmentNumber = generateUniqueNumber()

  return (
    <div className={modalClass} onClick={onClose}>
      <div className="absolute w-full h-full flex items-center justify-center">
        <div
          className="relative w-[430px] max-[768px]:w-[375px] p-6 bg-white rounded-xl shadow-2xl transform transition-all duration-300 ease-in-out"
          onClick={(e) => e.stopPropagation()}
        >
          <Formik
            initialValues={{
              firstName: event.firstName || '',
              lastName: event.lastName || '',
              gender: event.gender || '',
              dateOfBirth: event.dateOfBirth || '',
              service: event.service || '',
              language: event.language || '',
              duration: event.duration || '',
              id: event.id,
              notes: event.notes || '',
              forWhom: event.forWhom || '',
              time: {
                date: formatDate(eventDate),
                time: eventTime || '',
              },
            }}
            onSubmit={submitForm}
          >
            {({ resetForm }) => (
              <Form className="space-y-5">
                <div className="flex items-center justify-center relative mb-6">
                  <h1 className="text-center text-3xl font-semibold text-gray-800">
                    Randevu Detayları
                  </h1>
                  <button
                    type="button"
                    onClick={() => {
                      resetForm()
                      onClose()
                    }}
                    className="absolute top-0 right-0 p-2 text-gray-500 hover:text-gray-700"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </button>
                </div>
                <div className="space-y-5">
                  <div className="flex justify-around ">
                    <div className="w-[100px]">
                      <Image
                        src="/images/pp.png"
                        width={100}
                        height={100}
                        quality={100}
                        alt="Profile"
                        className="rounded-full"
                      />
                    </div>
                    <div className="flex flex-col ">
                      <div className="flex mb-2 items-center">
                        <i className="fa-solid fa-user text-deepSlateBlue"></i>
                        <h2 className="text-lg font-semibold ml-2 text-gray-700">
                          İsim Soyisim
                        </h2>
                      </div>
                      <div className="flex space-x-3">
                        <Field
                          type="text"
                          name="firstName"
                          className="text-sm w-[120px] p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <Field
                          type="text"
                          name="lastName"
                          className="text-sm p-2 w-[120px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-around">
                    <div>
                      <div className="flex items-center mb-2">
                        <i className="fa-solid fa-calendar-day text-deepSlateBlue"></i>
                        <h2 className="text-lg font-semibold ml-2 text-gray-700">
                          Randevu Tarihi
                        </h2>
                      </div>
                      <div className="flex space-x-3">
                        <Field
                          type="date"
                          name="time.date"
                          className="text-sm p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <Field
                          type="time"
                          name="time.time"
                          className="text-sm p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center mb-2">
                        <i className="fa-solid fa-user text-deepSlateBlue"></i>
                        <h2 className="text-lg font-semibold ml-2 text-gray-700">
                          Kim İçin
                        </h2>
                      </div>
                      <Field
                        as="select"
                        name="forWhom"
                        className="text-sm p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="KENDIM_ICIN" label="Kendim İçin" />
                        <option value="BASKASI_ICIN" label="Başkası İçin" />
                      </Field>
                    </div>
                  </div>
                  <div className="flex justify-around">
                    <div>
                      <div className="flex items-center mb-2">
                        <i className="fa-solid fa-earth-americas text-deepSlateBlue"></i>
                        <h2 className="text-lg font-semibold ml-2 text-gray-700">
                          Dil
                        </h2>
                      </div>
                      <Field
                        as="select"
                        name="language"
                        className="text-sm p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="TURKCE" label="Türkçe" />
                        <option value="INGILIZCE" label="İngilizce" />
                      </Field>
                    </div>
                    <div>
                      <div className="flex items-center mb-2">
                        <i className="fa-solid fa-id-badge text-deepSlateBlue"></i>
                        <h2 className="text-lg font-semibold ml-2 text-gray-700">
                          Randevu Numarası
                        </h2>
                      </div>
                      <Field
                        type="text"
                        name="id"
                        className="text-sm text-center w-[200px] p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        disabled
                      />
                    </div>
                  </div>
                  <div className="flex justify-around">
                    <div>
                      <div className="flex items-center mb-2">
                        <i className="fa-solid fa-hourglass-half text-deepSlateBlue"></i>
                        <h2 className="text-lg font-semibold ml-2 text-gray-700">
                          Süre
                        </h2>
                      </div>
                      <Field
                        type="number"
                        name="duration"
                        min="0"
                        step="15"
                        className="text-sm w-[100px] p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Dakika"
                      />
                    </div>
                    <div>
                      <div className="flex items-center mb-2">
                        <i className="fa-solid fa-pen text-deepSlateBlue"></i>
                        <h2 className="text-lg font-semibold ml-2 text-gray-700">
                          Notlar
                        </h2>
                      </div>
                      <Field
                        as="textarea"
                        name="notes"
                        className="text-sm w-[200px] h-[80px] p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Eklemek istediğiniz notlar"
                      />
                    </div>
                  </div>
                  <div className="flex justify-center mt-4">
                    <button
                      type="submit"
                      className="w-full bg-deepSlateBlue text-white py-2 px-4 rounded-lg hover:bg-slate-700 transition duration-300"
                    >
                      Kaydet
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default EditModal
