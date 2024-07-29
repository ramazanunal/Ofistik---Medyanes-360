import prisma from '@/lib/prisma'

const handler = async (req, res) => {
  if (!req) {
    return res
      .status(500)
      .json({ status: 'error', message: 'Bir hata oluştu!' })
  }

  if (req.method === 'POST' && req.body) {
    const { resumeText, hizmetVerenId } = req.body

    try {
      const existingResume = await prisma.resume.findUnique({
        where: { hizmetVerenId },
      })

      let result
      if (existingResume) {
        result = await prisma.resume.update({
          where: { hizmetVerenId },
          data: { text: resumeText },
        })
        return res.status(200).json({ status: 'UPDATED', data: result })
      } else {
        result = await prisma.resume.create({
          data: { text: resumeText, hizmetVerenId },
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
