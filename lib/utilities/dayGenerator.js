export const generateAvailabilityData = (startDate, days) => {
    const availabilityData = [];

    // Başlangıç tarihini oluştur
    const currentDate = new Date(startDate);

    for (let i = 0; i < days; i++) {
        // Her gün için saat ve müsaitlik durumu oluştur
        const dailyAvailability = [
            { time: "9.00", isAvailable: true },
            { time: "10.00", isAvailable: false },
            { time: "11.00", isAvailable: true },
            { time: "12.00", isAvailable: false },
            { time: "13.00", isAvailable: true },
            { time: "14.00", isAvailable: true },
            { time: "15.00", isAvailable: false },
            { time: "16.00", isAvailable: true },
            { time: "17.00", isAvailable: false },
        ];

        const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
        availabilityData.push({
            date: formattedDate, // Tarihi "dd/mm/yyyy" formatına çevir
            availability: dailyAvailability,
        });

        // Bir sonraki günü işle
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return availabilityData;
};
