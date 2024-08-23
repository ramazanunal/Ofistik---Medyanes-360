'use client'

import MyAppointmentBox from './myAppointmentBox'
import '../../style/myAppointments.css'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import EditModal from './editModal'
import Swal from 'sweetalert2'
import { getAPI, postAPI } from '@/services/fetchAPI'
import { useEffect, useState } from 'react'

function MyAppointments({ appointments }) {
  console.log(appointments)

  const [formData, setFormData] = useState(appointments || [])
  const [openEditModal, setOpenEditModal] = useState(false)
  const [appointmentDataValue, setAppointmentDataValue] = useState()

  const handleOpenEditModal = (selectedAppointment) => {
    setAppointmentDataValue(selectedAppointment)
    setOpenEditModal(true)
  }

  const handleCloseEditModal = () => {
    setOpenEditModal(false)
  }

  useEffect(() => {
    setFormData(appointments)
  }, [appointments])

  const handleDelete = async (selectedAppointment) => {
    Swal.fire({
      title: 'Emin misiniz!',
      text: 'Randevuyu iptal etmek istediğinize emin misiniz?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Evet',
      cancelButtonText: 'Hayır',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const id = selectedAppointment.id
          const response = await postAPI(
            `/appointment/receiver/delete-appointment`,
            id
          )
          console.log(response)

          if (response.status === 'Success') {
            // Başarı mesajını göster
            Swal.fire({
              title: 'Başarılı!',
              text: 'Randevu başarılı bir şekilde silindi.',
              icon: 'success',
              confirmButtonText: 'Kapat',
            })

            // Form datayı güncelle
            const updatedFormData = formData.filter(
              (appointment) => appointment.id !== selectedAppointment.id
            )
            setFormData(updatedFormData)
          } else {
            // Hata durumunda kullanıcıya bilgi ver
            Swal.fire({
              title: 'Hata!',
              text: 'Randevu silinirken bir hata oluştu.',
              icon: 'error',
              confirmButtonText: 'Kapat',
            })
          }
        } catch (error) {
          // Ağ hatası veya diğer hatalar için yakalama
          Swal.fire({
            title: 'Hata!',
            text: 'Randevu silinirken bir hata oluştu.',
            icon: 'error',
            confirmButtonText: 'Kapat',
          })
        }
      }
    })
  }

  const renderSwiper = (appointments) => {
    const swiperSlides = []
    for (let i = 0; i < appointments.length; i += 3) {
      const currentAppointments = appointments.slice(i, i + 3)
      const swiperSlide = (
        <SwiperSlide key={i}>
          <div className="flex flex-col items-center justify-center appointmentBoxArea">
            {currentAppointments.map((appointmentData, index) => (
              <MyAppointmentBox
                key={index}
                image={''}
                infos={appointmentData}
                onDelete={handleDelete}
                handleOpenEditModal={() => handleOpenEditModal(appointmentData)}
              />
            ))}
          </div>
        </SwiperSlide>
      )
      swiperSlides.push(swiperSlide)
    }
    return (
      <Swiper
        navigation={{
          prevEl: '.custom-swiper-button-prev',
          nextEl: '.custom-swiper-button-next',
        }}
        modules={[Navigation]}
        className="mySwiper"
      >
        {swiperSlides}
      </Swiper>
    )
  }

  return (
    <>
      <div className="myAppointments bg-dayComponentBg flex flex-col items-center justify-center p-3 relative lg:w-[56rem] mr-auto ml-auto mt-[50px] h-auto">
        <div className="swipperAppointments h-auto sm:w-[27rem] lg:w-[35rem]">
          {formData.length > 0 ? (
            formData.length > 3 ? (
              renderSwiper(formData)
            ) : (
              formData.map((appointmentData, index) => (
                <MyAppointmentBox
                  key={index}
                  image={''}
                  infos={appointmentData}
                  onDelete={handleDelete}
                  handleOpenEditModal={() =>
                    handleOpenEditModal(appointmentData)
                  }
                />
              ))
            )
          ) : (
            <div className="no-appointments-message text-center mt-6">
              Herhangi bir randevu bulunamadı.
            </div>
          )}
        </div>
        {formData.length > 3 && (
          <>
            <div className="custom-swiper-button-prev absolute left-3 text-xl text-deepSlateBlue cursor-pointer z-[2]">
              <i className="fa-solid fa-arrow-left" alt="Previous"></i>
            </div>
            <div className="custom-swiper-button-next absolute right-3 text-xl text-deepSlateBlueue cursor-pointer z-[2]">
              <i className="fa-solid fa-arrow-right" alt="Next"></i>
            </div>
          </>
        )}
      </div>
      <EditModal
        isOpen={openEditModal}
        onClose={handleCloseEditModal}
        event={appointmentDataValue}
        randevuTarih={appointmentDataValue?.time?.split(' ')[0]}
        randevuSaat={appointmentDataValue?.time?.split(' ')[1]}
      />
    </>
  )
}

export default MyAppointments
