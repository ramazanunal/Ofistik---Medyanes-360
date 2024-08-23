import React from 'react'
import { Formik, Field, Form } from 'formik'
import Swal from 'sweetalert2'
import Image from 'next/image'
import { getAPI, postAPI } from '@/services/fetchAPI'

// Örnek bir unique randevu numarası oluşturma fonksiyonu
const generateUniqueNumber = () => {
  return `RND-${Math.floor(Math.random() * 1000000)}`
}

const EditModal = ({ isOpen, onClose, event }) => {
  if (!event) return null
  console.log(event)

  // Tarih formatını YYYY-MM-DD şeklinde dönüştürme fonksiyonu
  function formatDate(inputDate) {
    if (!inputDate) return ''
    const parts = inputDate.split('.')
    const day = parts[0]
      ? parts[0].length === 1
        ? `0${parts[0]}`
        : parts[0]
      : '01'
    const month = parts[1]
      ? parts[1].length === 1
        ? `0${parts[1]}`
        : parts[1]
      : '01'
    const year = parts[2] || '0000'
    return `${year}-${month}-${day}`
  }

  // Saatleri karşılaştırarak çakışma olup olmadığını kontrol eden fonksiyon
  function areTimesOverlapping(time1, time2, duration1, duration2) {
    const [hours1, minutes1] = time1.split(':').map(Number)
    const [hours2, minutes2] = time2.split(':').map(Number)

    const totalMinutes1 = hours1 * 60 + minutes1 + duration1
    const totalMinutes2 = hours2 * 60 + minutes2 + duration2
    return totalMinutes1 > hours2 * 60 && totalMinutes2 > hours1 * 60
  }

  // Formu gönderirken yapılacak işlemler
  const submitForm = async (values) => {
    const storedEvents = await getAPI('/date')
    const newDate = values.time.date
    const newTime = values.time.time
    const convertedTime = `${newDate} ${newTime} ${values.time.status}`

    const isDuplicate = storedEvents.some(
      (storedEvent) =>
        storedEvent.id !== values.id && storedEvent.time === convertedTime
    )

    const isOverlapping = storedEvents.some((storedEvent) => {
      if (storedEvent.id !== values.id) {
        const oldDate = storedEvent.time.split(' ')[0]
        const oldTime = storedEvent.time.split(' ')[1]
        const oldDuration = storedEvent.duration
        if (newDate === oldDate) {
          return areTimesOverlapping(
            newTime,
            oldTime,
            values.duration,
            oldDuration
          )
        }
      }
      return false
    })

    if (isDuplicate || isOverlapping) {
      const errorMessage = isDuplicate
        ? 'Bu saatte başka bir randevu var.'
        : 'Bu saat başka bir randevu zamanı ile çakışıyor.'
      await Swal.fire({
        title: 'Hata!',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'Kapat',
      })
    } else {
      values.time = convertedTime
      await postAPI(`/date/${values.id}`, values, 'PUT')
      onClose()
    }
  }

  // Modal'ın görünürlük durumu
  const modalClass = isOpen
    ? 'fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-600 bg-opacity-50'
    : 'hidden'

  // Eğer event.time null veya undefined ise varsayılan değerler döndür
  const [eventDate = '', eventTime = '', eventStatus = ''] = event.time
    ? event.time.split(' ')
    : ['', '', '']

  // Unique randevu numarası oluştur
  const uniqueAppointmentNumber = generateUniqueNumber()

  return (
    <div className={modalClass} onClick={onClose}>
      <div className="absolute w-full h-full flex items-center justify-center">
        <div
          className="relative w-[430px] max-[768px]:w-[375px] p-5 bg-white rounded-2xl shadow-lg animate__animated animate__fadeInDown"
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
              id: uniqueAppointmentNumber, // Unique randevu numarası
              notes: event.notes || '',
              forWhom: event.forWhom || '',
              time: {
                date: formatDate(eventDate),
                time: eventTime || '',
                status: eventStatus || '',
              },
            }}
            onSubmit={submitForm}
          >
            {({ resetForm }) => (
              <Form>
                <div className="flex items-center justify-center relative mb-4">
                  <h1 className="text-center text-2xl font-bold">
                    Randevu Detayları
                  </h1>
                  <button
                    type="button"
                    onClick={() => {
                      resetForm() // Formu sıfırla
                      onClose() // Modalı kapat
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
                <div className="space-y-4">
                  <div className="flex justify-around items-center">
                    <div className="w-[100px]">
                      <Image
                        src="/images/pp.png"
                        width={100}
                        height={100}
                        quality={100}
                        alt="Profile"
                      />
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="flex mb-1">
                        <i className="fa-solid fa-user text-deepSlateBlue"></i>
                        <h2 className="text-lg font-bold ml-2">İsim Soyisim</h2>
                      </div>
                      <div className="flex space-x-2">
                        <Field
                          type="text"
                          name="firstName"
                          className="text-sm w-[120px] p-2 border-2 border-gray-300 rounded-lg"
                        />
                        <Field
                          type="text"
                          name="lastName"
                          className="text-sm p-2 w-[120px] border-2 border-gray-300 rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-around">
                    <div>
                      <div className="flex items-center mb-1">
                        <i className="fa-solid fa-calendar-day text-deepSlateBlue"></i>
                        <h2 className="text-lg font-bold ml-2">
                          Randevu Tarihi
                        </h2>
                      </div>
                      <div className="flex space-x-2">
                        <Field
                          type="date"
                          name="time.date"
                          className="text-sm p-2 border-2 border-gray-300 rounded-lg"
                        />
                        <Field
                          type="time"
                          name="time.time"
                          className="text-sm p-2 border-2 border-gray-300 rounded-lg"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center mb-1">
                        <i className="fa-solid fa-user text-deepSlateBlue"></i>
                        <h2 className="text-lg font-bold ml-2">Kim İçin</h2>
                      </div>
                      <Field
                        as="select"
                        name="forWhom"
                        className="text-sm p-2 border-2 border-gray-300 rounded-lg"
                      >
                        <option value="KENDIM_ICIN" label="Kendim İçin" />
                        <option value="BASKASI_ICIN" label="Başkası İçin" />
                      </Field>
                    </div>
                  </div>
                  <div className="flex justify-around">
                    <div>
                      <div className="flex items-center mb-1">
                        <i className="fa-solid fa-earth-americas text-deepSlateBlue"></i>
                        <h2 className="text-lg font-bold ml-2">Dil</h2>
                      </div>
                      <Field
                        as="select"
                        name="language"
                        className="text-sm p-2 border-2 border-gray-300 rounded-lg"
                      >
                        <option value="TURKCE" label="Türkçe" />
                        <option value="INGILIZCE" label="İngilizce" />
                      </Field>
                    </div>
                    <div>
                      <div className="flex items-center mb-1">
                        <i className="fa-solid fa-id-badge text-deepSlateBlue"></i>
                        <h2 className="text-lg font-bold ml-2">
                          Randevu Numarası
                        </h2>
                      </div>
                      <Field
                        type="text"
                        name="id"
                        className="text-sm text-center w-[200px] p-2 border-2 border-gray-300 rounded-lg"
                        disabled // ID alanını sadece görüntüleme amaçlı, düzenlenemez
                      />
                    </div>
                  </div>
                  <div className="mt-5 border-2 border-gray-300 rounded-lg">
                    <div className="p-3">
                      <div className="flex items-center mb-2">
                        <i className="fa-solid fa-book text-xl text-deepSlateBlue"></i>
                        <h2 className="text-xl ml-2 text-deepSlateBlue">
                          Notlar
                        </h2>
                      </div>
                      <Field
                        name="notes"
                        as="textarea"
                        className="w-full p-2 border-2 border-gray-300 rounded-lg"
                        rows="4"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end mt-5">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
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
