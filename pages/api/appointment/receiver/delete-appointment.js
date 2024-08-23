import prisma from '@/lib/prisma'

export default async (req, res) => {
  if (req.method === 'POST') {
    const id = req.body
    console.log(id)

    if (!id) {
      return res.status(400).json({ error: 'Eksik bilgi: id' })
    }

    try {
      // Randevuyu sil
      const deletedAppointment = await prisma.appointment.delete({
        where: { id },
      })

      res.status(200).json({
        status: 'Success',
        message: 'Randevu başarıyla silindi',
        deletedAppointment,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Sunucu hatası' })
    }
  } else {
    res.status(405).json({ error: 'Yalnızca POST metodu destekleniyor' })
  }
}
