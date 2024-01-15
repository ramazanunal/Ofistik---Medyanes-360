import prisma from '@/lib/prisma';
import EncryptPassword from '@/lib/encryptPassword';
import { getToken } from 'next-auth/jwt';

export default async function handler(req, res) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    // Eğer kullanıcı giriş yapmışsa bu sayfaya erişemez
    // Eğer rol admin ise bu sayfaya istek atabilir.
    if (token || token.user.role !== 'admin') {
      return res.status(403).json({
        statusCode: 403,
        message: 'Forbidden',
      });
    } else {
      if (req.method === 'POST') {
        const data = req.body;
        data.role = 'customer';

        //! Body'den gelen verileri kontrol et (Validation)

        // Bu kullanıcı daha önce kayıt olmuş mu?
        const isUserExist = await prisma.user.findUnique({
          where: {
            email: data.email,
          },
        });

        // Eğer kullanıcı varsa hata döndür
        if (isUserExist) {
          return res.status(400).json({
            statusCode: 400,
            message: 'This user already exists',
          });
        }

        // Password ve PasswordConfirm aynı mı?
        const passwordsMatch =
          data.password === data.passwordConfirm
            ? delete data.passwordConfirm
            : false;

        if (!passwordsMatch) {
          return res.status(400).json({
            statusCode: 400,
            message: 'Passwords do not match',
          });
        }

        // Password'ü hashle
        data.password = await EncryptPassword(data.password);

        if (!data.password || data.password.error) {
          throw new Error('An unexpected error. Code: OFREG-ECP');
        }

        // Kullanıcıyı veritabanına kaydet
        const user = await prisma.user.create({
          data: {
            ...data,
          },
        });

        // Eğer kullanıcı oluşturulamadıysa hata döndür
        if (!user) {
          throw new Error('User creation failed. Please try again.');
        }

        // Kullanıcı oluşturulduysa başarılı mesajı döndür
        return res.status(201).json({
          statusCode: 201,
          message: 'User created successfully',
        });
      } else {
        return res
          .status(405)
          .json({ statusCode: 405, message: 'Method Not Allowed' });
      }
    }
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: error.message });
  }
}
