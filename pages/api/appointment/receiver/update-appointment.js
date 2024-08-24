import prisma from '@/lib/prisma'

const areTimesOverlapping = (time1, time2, duration1, duration2) => {
  const [hours1, minutes1] = time1.split(':').map(Number)
  const [hours2, minutes2] = time2.split(':').map(Number)

  const startMinutes1 = hours1 * 60 + minutes1
  const endMinutes1 = startMinutes1 + duration1

  const startMinutes2 = hours2 * 60 + minutes2
  const endMinutes2 = startMinutes2 + duration2

  // İki zaman aralığı çakışıyor mu kontrolü
  return (
    (startMinutes1 < endMinutes2 && endMinutes1 > startMinutes2) ||
    (startMinutes2 < endMinutes1 && endMinutes2 > startMinutes1)
  )
}

export default async function handler(req, res) {
  if (!req || req.method !== 'POST' || !req.body) {
    return res
      .status(400)
      .json({ status: 'error', message: 'Invalid request!' })
  }

  const { values } = req.body
  const { date, time } = values.time

  // Format date as day.month.year
  const formattedDate = date.split('-').reverse().join('.')
  const newTime = time
  const convertedTime = `${formattedDate} ${newTime}`.trim()

  try {
    // Veritabanındaki mevcut randevuları getir
    const storedEvents = await prisma.appointment.findMany({
      where: {
        hizmetVerenId: values.hizmetVerenId,
        time: {
          contains: formattedDate,
        },
      },
    })

    // Çakışan veya tekrar eden randevuları kontrol et
    const conflictingEvent = storedEvents.find((storedEvent) => {
      // Aynı ID'ye sahip randevu çakışma kontrolünden çıkarılıyor
      if (storedEvent.id === values.id) {
        return false
      }

      const [oldDate, oldTime] = storedEvent.time.split(' ')
      const oldDuration = storedEvent.duration

      const isDuplicate = storedEvent.time === convertedTime

      const isOverlapping =
        formattedDate === oldDate &&
        areTimesOverlapping(newTime, oldTime, values.duration, oldDuration)

      return isDuplicate || isOverlapping
    })

    if (conflictingEvent) {
      const [oldDate, oldTime] = conflictingEvent.time.split(' ')
      const errorMessage = `Bu saatte (${oldDate} ${oldTime} - ${conflictingEvent.duration} dakika) başka bir randevu var veya bu saat başka bir randevu ile çakışıyor. Lütfen başka bir saat seçin.`

      return res.status(409).json({ status: 'conflict', message: errorMessage })
    } else {
      // Randevuyu güncelle
      const updatedAppointment = await prisma.appointment.update({
        where: { id: values.id },
        data: {
          firstName: values.firstName,
          lastName: values.lastName,
          gender: values.gender,
          dateOfBirth: values.dateOfBirth,
          service: values.service,
          language: values.language,
          duration: values.duration,
          notes: values.notes,
          forWhom: values.forWhom,
          time: convertedTime,
        },
      })

      return res.status(200).json({
        status: 'success',
        message: 'Randevu başarıyla güncellendi.',
        appointment: updatedAppointment,
      })
    }
  } catch (error) {
    console.error('Database request failed:', error)
    return res.status(500).json({ status: 'error', message: error.message })
  }
}
