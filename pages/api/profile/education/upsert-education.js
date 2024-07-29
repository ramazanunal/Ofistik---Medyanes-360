import prisma from '@/lib/prisma'

const handler = async (req, res) => {
  if (!req) {
    return res
      .status(500)
      .json({ status: 'error', message: 'Bir hata oluştu!' })
  }

  if (req.method === 'POST' && req.body) {
    const { university, year, id, hizmetVerenId } = req.body

    try {
      let result
      if (id) {
        // Update existing record
        result = await prisma.educationInfo.update({
          where: { id },
          data: { university, year },
        })
        return res.status(200).json({ status: 'UPDATED', data: result })
      } else {
        // Create new record
        result = await prisma.educationInfo.create({
          data: {
            university,
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
