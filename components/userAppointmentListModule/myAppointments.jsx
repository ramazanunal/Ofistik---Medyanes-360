import React, { useEffect, useState } from "react";
import MyAppointmentBox from "./myAppointmentBox";
import "../../style/myAppointments.css";
import resim from "../../images/service.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import EditModal from "./editModal";
import Swal from "sweetalert2";
import { getAPI } from "@/services/fetchAPI";

function MyAppointments() {
  const [formData, setFormData] = useState([]); // tüm randevuleri atadığımız array
  const [openEditModal, setOpenEditModal] = useState(false);
  const [appointmentDataValue, setAppointmentDataValue] = useState();

  const handleOpenEditModal = (selectedAppointment) => {
    setAppointmentDataValue(selectedAppointment);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const handleDelete = async (selectedAppointment) => {
    Swal.fire({
      title: "Emin misiniz!",
      text: "Randevuyu iptal etmek istediğinize emin misiniz?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Evet",
      cancelButtonText: "Hayır",
    }).then(async (result) => {
      if (result.isConfirmed) {

        const selectedTimes = await getSelectedTimes()

        const dateParts = selectedAppointment.time.split(" ");
        const datePart = dateParts[0].split(".");
        const timePart = dateParts[2];

        const year = parseInt(datePart[2], 10);
        const month = parseInt(datePart[1], 10) - 1;
        const day = parseInt(datePart[0], 10);

        const timeParts = timePart.split(":");
        const hours = parseInt(timeParts[0], 10);
        const minutes = parseInt(timeParts[1], 10);

        const originalDate = new Date(year, month, day, hours, minutes);

        const formattedDate = originalDate.toISOString().split("T")[0];
        const formattedTime = originalDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        const result1 = {
          date: formattedDate,
          time: formattedTime,
        };

        Swal.fire({
          title: "Başarılı !",
          text: "Randevu başarılı bir şekilde silindi.",
          icon: "success",
          confirmButtonText: "Kapat",
        });

        const updatedSelectedTimes = selectedTimes.map((appointment) => {
          if (
            appointment.date === result1.date &&
            appointment.time === result1.time
          ) {
            return { ...appointment, active: true };
          }
          return appointment;
        });

        await postAPI("/selectedtimes", updatedSelectedTimes, "POST") // GÜNCELLENMİŞ SAATLERİ YENİDEN DATABASE E GÖNDERECEĞİZ

        // Form datayı güncelle
        const dates = await getDatas(true)
        dates.forEach(async (appointment) => {
          if (
            appointment.date !== selectedAppointment.date ||
            appointment.time !== selectedAppointment.time
          ) {
            await postAPI("/date", {
              id: appointment.id,
              data: {
                delete: true
              }
            }, "PUT")
          }
        });

        await getDatas()
      }
    });
  };

  const renderSwiper = (appointments) => {
    //en fazla alt alta 3 tane randevu görüntülememizi sağlayan kod
    const swiperSlides = [];
    for (let i = 0; i < appointments.length; i += 3) {
      const currentAppointments = appointments.slice(i, i + 3);
      const swiperSlide = (
        <SwiperSlide key={i}>
          <div className="flex flex-col items-center justify-center appointmentBoxArea">
            {currentAppointments.map((appointmentData, index) => (
              <>
                <MyAppointmentBox
                  key={index}
                  image={resim}
                  infos={{
                    ...appointmentData,
                    duration: appointmentData.duration || "0", // duration bilgisini ekledik
                  }}
                  onDelete={handleDelete}
                  handleOpenEditModal={() =>
                    handleOpenEditModal(appointmentData)
                  }
                />
              </>
            ))}
          </div>
        </SwiperSlide>
      );
      swiperSlides.push(swiperSlide);
    }
    return (
      <Swiper
        navigation={{
          prevEl: ".custom-swiper-button-prev", // Class or element for the back button
          nextEl: ".custom-swiper-button-next", // Class or element for the next button
        }}
        modules={[Navigation]}
        className="mySwiper"
      >
        {swiperSlides}
      </Swiper>
    );
  };

  return (
    <>
      <div className="myAppointments bg-dayComponentBg flex flex-col items-center justify-center p-3 relative lg:w-[56rem] mr-auto ml-auto mt-[50px] h-auto">
        <h1 className="text-center text-2xl font-semibold text-deepSlateBlue p-3">
          Randevularım
        </h1>
        <div className="swipperAppointments h-auto sm:w-[27rem] lg:w-[35rem]">
          {formData.length > 3 ? (
            renderSwiper(formData)
          ) : (
            <>
              {formData.map((appointmentData, index) => (
                <>
                  <MyAppointmentBox
                    key={index}
                    image={resim}
                    infos={{
                      ...appointmentData,
                      duration: appointmentData.duration || "0", // duration bilgisini ekledik
                    }}
                    onDelete={handleDelete}
                    handleOpenEditModal={() =>
                      handleOpenEditModal(appointmentData)
                    }
                  />
                </>
              ))}
            </>
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
        randevuTarih={
          appointmentDataValue && appointmentDataValue.time.split(" ")[0]
        }
        randevuSaat={
          appointmentDataValue && appointmentDataValue.time.split(" ")[2]
        }
      />
    </>
  );
}

export default MyAppointments;
