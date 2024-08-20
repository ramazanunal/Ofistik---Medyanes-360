import EncryptPassword from '@/lib/encryptPassword'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'

const handler = async (req, res) => {
  if (!req || req.method !== 'POST' || !req.body) {
    return res.status(500).json({ status: 'error', message: 'Geçersiz istek!' })
  }

  const { userId, currentPassword, newPassword } = req.body

  try {
    // Get the user from the database
    const user = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Kullanıcı bulunamadı!' })
    }

    // Compare the current password with the stored password hash
    const isMatch = await bcrypt.compare(currentPassword, user.password)
    if (!isMatch) {
      return res
        .status(400)
        .json({ status: 'error', message: 'Mevcut şifre yanlış!' })
    }

    // Encrypt the new password
    const hashedNewPassword = await EncryptPassword(newPassword)
    if (!hashedNewPassword || hashedNewPassword.error) {
      throw new Error(
        'Bilinmeyen bir hata oluştu. Lütfen yetkili birisiyle iletişime geçin. Code: OFREG-ECP'
      )
    }

    // Update the user's password in the database
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { password: hashedNewPassword },
    })

    return res.status(200).json({
      status: 'UPDATED',
      message: 'Şifre güncellendi!',
      data: updatedUser,
    })
  } catch (error) {
    console.error('Database request failed:', error)
    return res.status(500).json({ status: 'error', message: error.message })
  }
}

export default handler
