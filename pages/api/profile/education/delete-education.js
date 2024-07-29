const handler = async (req, res) => {
  if (!req) {
    return res
      .status(500)
      .json({ status: 'error', message: 'Bir hata oluştu!' })
  }

  if (req.method === 'POST' && req.body) {
    const { id } = req.body
    console.log(id)

    try {
      if (id) {
        const result = await prisma.educationInfo.delete({
          where: { id },
        })
        return res.status(200).json({ status: 'DELETED', data: result })
      } else {
        return res
          .status(400)
          .json({ status: 'error', message: 'ID is required' })
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
