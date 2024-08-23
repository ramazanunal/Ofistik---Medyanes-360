import prisma from '@/lib/prisma'

const handler = async (req, res) => {
  if (req.method === 'GET') {
    const { id } = req.query
    console.log(id)

    // ID kontrolü
    if (!id) {
      return res.status(400).json({
        status: 'error',
        message: 'ID parametresi gereklidir',
      })
    }

    const include = {
      user: {
        select: {
          email: true,
          birthdate: true, // Sadece email alanını seçiyoruz
        },
      },
      comments: true,
    }

    try {
      // Kullanıcıyı bul
      const user = await prisma.user.findUnique({
        where: { id: id },
      })

      if (!user) {
        return res.status(404).json({
          status: 'error',
          message: 'Kullanıcı bulunamadı',
        })
      }

      // HizmetAlan verisini getir
      const serviceReceiver = await prisma.hizmetAlan.findUnique({
        where: { userId: id },
        include: include,
      })

      if (!serviceReceiver) {
        return res.status(404).json({
          status: 'error',
          message: 'HizmetAlan bulunamadı',
        })
      }

      return res.status(200).json({
        status: 'success',
        data: serviceReceiver,
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
