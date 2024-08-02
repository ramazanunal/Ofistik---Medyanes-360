import prisma from '@/lib/prisma'

export default async (req, res) => {
  if (req.method === 'GET') {
    const { id, queryType } = req.query

    if (!id) {
      return res.status(401).json({ error: 'Yetkisiz erişim' })
    }

    try {
      let chats

      switch (queryType) {
        case 'unread':
          chats = await prisma.chat.findMany({
            where: {
              OR: [{ starterId: id }, { participantId: id }],
              messages: {
                some: {
                  receiverId: id,
                  isRead: false,
                },
              },
            },
            include: {
              messages: {
                orderBy: {
                  createdAt: 'desc',
                },
                take: 1,
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
          break

        case 'archive':
          chats = await prisma.chat.findMany({
            where: {
              OR: [{ starterId: id }, { participantId: id }],
              status: 'ARCHIVED',
            },
            include: {
              messages: {
                orderBy: {
                  createdAt: 'desc',
                },
                take: 1,
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

          break
          break

        case 'inbox':
        default:
          chats = await prisma.chat.findMany({
            where: {
              OR: [{ starterId: id }, { participantId: id }],
            },
            include: {
              messages: {
                orderBy: {
                  createdAt: 'desc',
                },
                take: 1,
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
          break
      }

      const chatsWithUnreadCount = await Promise.all(
        chats.map(async (chat) => {
          const unreadMessagesCount = await prisma.message.count({
            where: {
              chatId: chat.id,
              receiverId: id,
              isRead: false,
            },
          })

          return {
            ...chat,
            lastMessage: chat.messages[0] || null,
            unreadMessagesCount,
          }
        })
      )

      res.status(200).json(chatsWithUnreadCount)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Sunucu hatası' })
    }
  } else {
    res.status(405).json({ error: 'Yalnızca GET istekleri kabul edilir' })
  }
}
