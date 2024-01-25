import prisma from '@/lib/prisma';
import EncryptPassword from '@/lib/encryptPassword';
import { getToken } from 'next-auth/jwt';

export default async function handler(req, res) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    // Eğer kullanıcı giriş yapmışsa bu sayfaya erişemez
    // Eğer rol admin ise bu sayfaya istek atabilir.
    if (token && token?.user?.role !== 'admin') {
      return res.status(403).json({
        statusCode: 403,
        message: 'Forbidden',
      });
    } else {
      if (req.method === 'POST') {
        const { name, surname, email, phone, password, passwordConfirm } =
          req.body;
        //! Body'den gelen verileri kontrol et (Validation)

        // Bu kullanıcı daha önce kayıt olmuş mu?
        const isUserExist = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });

        // Eğer kullanıcı varsa hata döndür
        if (isUserExist) {
          return res.status(400).json({
            statusCode: 400,
            message:
              'Bu mail adresi zaten kayıtlı. Lütfen daha farklı bir mail adresi deneyin.',
          });
        }

        // Password ve PasswordConfirm aynı mı?
        const passwordsMatch = password === passwordConfirm;

        if (!passwordsMatch) {
          return res.status(400).json({
            statusCode: 400,
            message: 'Şifreler eşleşmiyor.',
          });
        }

        // Password'ü hashle
        const hashPassword = await EncryptPassword(password);
        if (!hashPassword || hashPassword.error) {
          throw new Error(
            'Bilinmeyen bir hata oluştu. Lütfen yetkili birisiyle iletişime geçin. Code: OFREG-ECP'
          );
        }

        //Benzersiz kullanıcı adı oluştur.

        // Türkçe karakterleri temizle ve boşlukları düzenle
        const cleanedName = normalizeAndRemoveSpaces(name);
        const cleanedSurname = normalizeAndRemoveSpaces(surname);
        const username = await generateUniqueUsername(
          cleanedName,
          cleanedSurname
        );

        //Kullanıcıyı veritabanına kaydet
        const user = await prisma.user.create({
          data: {
            email: email,
            password: hashPassword,
            username: username,
            profile: {
              create: {
                name: name,
                surname: surname,
                phone: phone,
              },
            },
          },
        });

        // Eğer kullanıcı oluşturulamadıysa hata döndür
        if (!user) {
          throw new Error('Kullanıcı oluşturulamadı. Lütfen tekrar deneyin.');
        }

        // Kullanıcı oluşturulduysa başarılı mesajı döndür
        return res.status(201).json({
          statusCode: 201,
          message: 'Kullanıcı başarıyla oluşturuldu.',
        });
      } else {
        return res
          .status(405)
          .json({ statusCode: 405, message: 'Bu metoda izin verilmedi.' });
      }
    }
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: error.message });
  }
}

function normalizeAndRemoveSpaces(str) {
  return str
    .normalize('NFD') // Unicode Normalization Form D
    .replace(/[\u0300-\u036f]/g, '') // Remove combining diacritical marks
    .toLowerCase()
    .replace(/\s+/g, ''); // Remove spaces
}

async function generateUniqueUsername(name, surname) {
  const usernameBase = `${name}${surname}`;
  let username = normalizeAndRemoveSpaces(usernameBase);
  let counter = 1;

  const existingUsernames = await getExistingUsernames(username);

  while (existingUsernames.has(username)) {
    // Eğer kullanıcı adı zaten varsa, sayıyı arttır ve tekrar dene
    counter++;
    username = `${normalizeAndRemoveSpaces(usernameBase)}${counter}`;
  }

  return username;
}

async function getExistingUsernames(prefix) {
  const existingUsers = await prisma.user.findMany({
    where: {
      username: {
        startsWith: prefix,
      },
    },
    select: {
      username: true,
    },
  });

  return new Set(existingUsers.map((user) => user.username));
}
