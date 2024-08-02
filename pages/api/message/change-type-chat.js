import prisma from '@/lib/prisma'

export default async (req, res) => {
  if (req.method === 'POST') {
    const { chatId } = req.body
    if (!chatId) {
      return res.status(400).json({ error: 'Eksik chatId bilgisi' })
    }

    try {
      // Belirli bir sohbeti getir
      const chat = await prisma.chat.findUnique({
        where: { id: chatId },
      })

      if (!chat) {
        return res.status(404).json({ error: 'Chat bulunamadı' })
      }

      // Sohbetin mevcut durumuna göre yeni durumu belirle
      const newStatus = chat.status === 'ACTIVE' ? 'ARCHIVED' : 'ACTIVE'

      // Sohbetin durumunu güncelle
      await prisma.chat.update({
        where: { id: chatId },
        data: { status: newStatus },
      })

      res
        .status(200)
        .json({ message: `Chat statusu ${newStatus} olarak güncellendi` })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Sunucu hatası' })
    }
  } else {
    res.status(405).json({ error: 'Yalnızca POST metodu destekleniyor' })
  }
}
