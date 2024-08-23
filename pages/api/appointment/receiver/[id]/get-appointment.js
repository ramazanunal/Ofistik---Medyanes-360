import prisma from '@/lib/prisma'

const handler = async (req, res) => {
  if (req.method === 'GET') {
    const { id } = req.query
    console.log(id)

    if (!id) {
      return res.status(400).json({
        status: 'error',
        message: 'Hizmet Alan ID parametresi gereklidir',
      })
    }

    try {
      const appointments = await prisma.appointment.findMany({
        where: { hizmetAlanId: id },
      })

      if (!appointments || appointments.length === 0) {
        return res.status(404).json({
          status: 'error',
          message: 'Randevular bulunamadı',
          data: [],
        })
      }

      return res.status(200).json({
        status: 'success',
        data: appointments,
      })
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'Veritabanında bir hata oluştu!',
        error: error.message,
      })
    }
  }

  return res.status(405).json({
    status: 'error',
    message: 'Method not allowed',
  })
}

export default handler
