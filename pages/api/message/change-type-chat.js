import prisma from '@/lib/prisma'

export default async (req, res) => {
  if (req.method === 'POST') {
    const { chatId, userId } = req.body
    if (!chatId || !userId) {
      return res.status(400).json({ error: 'Eksik chatId veya userId bilgisi' })
    }

    try {
      // Check if the chat exists
      const chat = await prisma.chat.findUnique({
        where: { id: chatId },
      })

      if (!chat) {
        return res.status(404).json({ error: 'Chat bulunamadı' })
      }

      // Check if the user has already archived this chat
      const archivedChat = await prisma.chatArchive.findUnique({
        where: {
          userId_chatId: {
            userId,
            chatId,
          },
        },
      })

      if (archivedChat) {
        // If it's already archived, unarchive it
        await prisma.chatArchive.delete({
          where: {
            userId_chatId: {
              userId,
              chatId,
            },
          },
        })

        res.status(200).json({ message: 'Chat arşivden çıkarıldı' })
      } else {
        // If it's not archived, archive it
        await prisma.chatArchive.create({
          data: {
            userId,
            chatId,
          },
        })

        res.status(200).json({ message: 'Chat arşive alındı' })
      }
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Sunucu hatası' })
    }
  } else {
    res.status(405).json({ error: 'Yalnızca POST metodu destekleniyor' })
  }
}
