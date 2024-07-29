import prisma from '@/lib/prisma'

const handler = async (req, res) => {
  if (!req) {
    return res
      .status(500)
      .json({ status: 'error', message: 'Bir hata oluştu!' })
  }

  if (req.method === 'POST' && req.body) {
    const { certificate, year, id, hizmetVerenId } = req.body

    try {
      let result
      if (id) {
        result = await prisma.certificate.update({
          where: { id },
          data: { certificate, year },
        })
        return res.status(200).json({ status: 'UPDATED', data: result })
      } else {
        result = await prisma.certificate.create({
          data: {
            certificate,
            year,
            hizmetVerenId,
          },
        })
        return res.status(200).json({ status: 'ADDED', data: result })
      }
    } catch (error) {
      console.error('Database request failed:', error)
      return res.status(500).json({ status: 'error', message: error.message })
    }
  } else {
    return res
      .status(405)
      .json({ status: 'error', message: 'Method Not Allowed' })
  }
}

export default handler
