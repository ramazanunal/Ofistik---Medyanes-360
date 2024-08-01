import prisma from '@/lib/prisma'

export default async (req, res) => {
  if (req.method === 'POST') {
    const { senderId, receiverId, content } = req.body

    if (!senderId || !receiverId || !content) {
      return res
        .status(400)
        .json({ error: 'Eksik bilgi: senderId, receiverId veya content' })
    }

    try {
      // Mevcut bir chat'i kontrol et
      let chat = await prisma.chat.findFirst({
        where: {
          OR: [
            { starterId: senderId, participantId: receiverId },
            { starterId: receiverId, participantId: senderId },
          ],
          status: 'ACTIVE',
        },
      })

      // Eğer chat yoksa, yeni bir chat oluştur
      if (!chat) {
        chat = await prisma.chat.create({
          data: {
            starterId: senderId,
            participantId: receiverId,
            status: 'ACTIVE',
          },
        })
      }

      // Mesajı chat'e ekle
      const message = await prisma.message.create({
        data: {
          content,
          senderId,
          receiverId,
          chatId: chat.id,
        },
      })

      // Yeni mesajı döndür
      const newMessage = await prisma.message.findUnique({
        where: { id: message.id },
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
      })

      res.status(201).json(newMessage)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Sunucu hatası' })
    }
  } else {
    res.status(405).json({ error: 'Yalnızca POST metodu destekleniyor' })
  }
}
