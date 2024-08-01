import prisma from '@/lib/prisma'

export default async (req, res) => {
  if (req.method === 'GET') {
    const { id } = req.query

    if (!id) {
      return res.status(401).json({ error: 'Yetkisiz erişim' })
    }

    // Kullanıcının katıldığı veya başlattığı tüm sohbetleri al
    const chats = await prisma.chat.findMany({
      where: {
        OR: [{ starterId: id }, { participantId: id }],
      },
      include: {
        messages: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 1, // Her sohbetin son mesajını almak için
        },
        starter: {
          select: {
            id: true,
            username: true,
            email: true,
            createdAt: true,
          },
        },
        participant: {
          select: {
            id: true,
            username: true,
            email: true,
            createdAt: true,
          },
        },
      },
    })

    // Her sohbetin son mesajını almak için
    const lastMessages = chats.map((chat) => ({
      ...chat,
      lastMessage: chat.messages[0] || null,
    }))

    res.status(200).json(lastMessages)
  } else {
    res.status(405).json({ error: 'Yalnızca GET istekleri kabul edilir' })
  }
}
