import prisma from '@/lib/prisma'

export default async (req, res) => {
  if (req.method === 'POST') {
    const { chatId } = req.body
    if (!chatId) {
      return res.status(400).json({ error: 'Eksik chatId bilgisi' })
    }

    try {
      const chat = await prisma.chat.findUnique({
        where: { id: chatId },
        include: {
          messages: {
            include: {
              sender: {
                select: {
                  id: true,
                  username: true,
                  email: true,
                  createdAt: true,
                },
              },
              receiver: {
                select: {
                  id: true,
                  username: true,
                  email: true,
                  createdAt: true,
                },
              },
            },
          },
        },
      })

      if (!chat) {
        return res.status(404).json({ error: 'Chat bulunamadı' })
      }

      res.status(200).json(chat.messages)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Sunucu hatası' })
    }
  } else {
    res.status(405).json({ error: 'Yalnızca POST metodu destekleniyor' })
  }
}
