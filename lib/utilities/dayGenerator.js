export const generateAvailabilityData = (startDate, days) => {
  const availabilityData = []

  // Başlangıç tarihini oluştur
  const currentDate = new Date(startDate)

  for (let i = 0; i < days; i++) {
    // Her gün için saat ve müsaitlik durumu oluştur
    const dailyAvailability = [
      { time: '9.00', isAvailable: true },
      { time: '10.00', isAvailable: false },
      { time: '11.00', isAvailable: true },
      { time: '12.00', isAvailable: false },
      { time: '13.00', isAvailable: true },
      { time: '14.00', isAvailable: true },
      { time: '15.00', isAvailable: false },
      { time: '16.00', isAvailable: true },
      { time: '17.00', isAvailable: false },
    ]

    const formattedDate = `${currentDate.getDate()}/${
      currentDate.getMonth() + 1
    }/${currentDate.getFullYear()}`
    availabilityData.push({
      date: formattedDate, // Tarihi "dd/mm/yyyy" formatına çevir
      availability: dailyAvailability,
    })

    // Bir sonraki günü işle
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return availabilityData
}

export const formatMessageDate = (messageDate) => {
  const now = new Date()
  const messageTime = new Date(messageDate)

  const isToday = now.toDateString() === messageTime.toDateString()
  const isThisWeek =
    now.getTime() - messageTime.getTime() < 7 * 24 * 60 * 60 * 1000

  if (isToday) {
    return messageTime.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })
  } else if (isThisWeek) {
    return messageTime.toLocaleDateString([], { weekday: 'long' })
  } else {
    return messageTime.toLocaleDateString([], {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
  }
}

export const formatDate = (date) => {
  const messageDate = new Date(date)
  const today = new Date()

  const isToday = messageDate.toDateString() === today.toDateString()
  const isThisWeek =
    messageDate > new Date(today.setDate(today.getDate() - today.getDay()))

  if (isToday) {
    return 'Bugün'
  }

  if (isThisWeek) {
    return messageDate.toLocaleDateString('tr-TR', { weekday: 'long' })
  }

  return messageDate.toLocaleDateString('tr-TR', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
