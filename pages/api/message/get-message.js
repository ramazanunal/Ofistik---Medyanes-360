import prisma from '@/lib/prisma'

export default async (req, res) => {
  if (req.method === 'POST') {
    const { chatId, receiverId } = req.body
    if (!chatId || !receiverId) {
      return res
        .status(400)
        .json({ error: 'Eksik chatId veya receiverId bilgisi' })
    }

    try {
      // Belirli bir sohbeti ve o sohbetteki mesajları getir
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

      // Belirli receiverId ile eşleşen ve isRead alanı false olan mesajları güncelle
      await prisma.message.updateMany({
        where: {
          chatId: chatId,
          receiverId: receiverId,
          isRead: false,
        },
        data: {
          isRead: true,
        },
      })

      res.status(200).json(chat.messages)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Sunucu hatası' })
    }
  } else {
    res.status(405).json({ error: 'Yalnızca POST metodu destekleniyor' })
  }
}
