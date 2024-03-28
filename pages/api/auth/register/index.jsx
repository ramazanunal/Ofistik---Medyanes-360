import prisma from '@/lib/prisma';
import EncryptPassword from '@/lib/encryptPassword';
import schema from '@/validations/backend/RegisterValidation';
import { getToken } from 'next-auth/jwt';
import { transporter, mailOptions } from '@/pages/api/mail/nodemailer';

export default async function handler(req, res) {
    try {
        const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
        // Eğer kullanıcı giriş yapmışsa bu sayfaya erişemez
        // Eğer rol admin ise bu sayfaya istek atabilir.
        if (token && token?.user?.role !== 'admin') {
            return res.status(403).json({
                statusCode: 403,
                status: 'error',
                message: 'Giriş yapmış kullanıcılar bu sayfaya erişemez.',
            });
        } else {
            if (req.method === 'POST') {
                const {
                    name,
                    surname,
                    email,
                    phone,
                    password,
                    passwordConfirm,
                    certificates,
                    serviceAreas,
                    educationInfo,
                    resume,
                    price,
                    languages,
                    jobStatus
                } =
                    req.body;

                // Frontend'den gelen verileri kontrol et (Validation)
                const { error } = schema.validate({
                    name,
                    surname,
                    email,
                    phone,
                    password,
                    passwordConfirm,
                });

                if (error) {
                    return res.status(400).json({
                        statusCode: 400,
                        status: 'error',
                        message: error.message,
                    });
                }

                // Bu kullanıcı daha önce kayıt olmuş mu? ve hesabını doğrulamış mı?
                const isUserExist = await prisma.user.findUnique({
                    where: {
                        email: email,
                        isVerified: true,
                    },
                });

                // Eğer kullanıcı varsa hata döndür
                if (isUserExist) {
                    return res.status(409).json({
                        statusCode: 409,
                        status: 'error',
                        message:
                            'Bu mail adresi zaten kayıtlı. Lütfen daha farklı bir mail adresi deneyin.',
                    });
                }

                // Password'ü hashle
                const hashPassword = await EncryptPassword(password);
                if (!hashPassword || hashPassword.error) {
                    throw new Error(
                        'Bilinmeyen bir hata oluştu. Lütfen yetkili birisiyle iletişime geçin. Code: OFREG-ECP'
                    );
                }

                // Benzersiz doğrulama kodu oluştur.
                const uniqueCode = generateUniqueCode();

                // Benzersiz kullanıcı adı oluştur.
                // Türkçe karakterleri temizle ve boşlukları düzenle
                const cleanedName = normalizeAndRemoveSpaces(name);
                const cleanedSurname = normalizeAndRemoveSpaces(surname);
                const username = await generateUniqueUsername(
                    cleanedName,
                    cleanedSurname
                );

                const expirationTime = generateExpirationTime();

                //Kullanıcıyı veritabanına kaydet
                const user = await prisma.user.create({
                    data: {
                        email: email,
                        password: hashPassword,
                        username: username,
                        hizmetAlan: {
                            create: {
                                name: name,
                                surname: surname,
                                phone: phone,
                                totalAppointments: 0,
                                price: price,
                                languages: languages,
                                jobStatus: jobStatus,
                                onlineStatus: false
                            },
                        },
                        VerificationCode: {
                            create: {
                                code: uniqueCode,
                                expirationTime: expirationTime,
                            },
                        },
                    },
                });

                // Eğer kullanıcı oluşturulamadıysa hata döndür
                if (!user) {
                    throw new Error('Kullanıcı oluşturulamadı. Lütfen tekrar deneyin.');
                }

                //mail gönderme işlemi
                transporter.sendMail({
                    ...mailOptions,
                    subject: `${process.env.NEXT_PUBLIC_COMPANY_NAME} Kayıt işlemi`,
                    text: `${process.env.NEXT_PUBLIC_COMPANY_NAME} Kayıt işlemi`,
                    to: email,
                    html: `<p>Sevgili</p>
                 <h3 style='color:green'>${name} ${surname}</h3>
                 <p>${email} mail adresinin Kayıt işlemi -- tarihinde, -- saatinde başarıyla yapıldı!</p>
                 <p>Kayıt edilen telefon: ${phone}</p>
                 <p>Doğrulama Kodunuz: ${uniqueCode}</p>
                `,
                });

                // Kullanıcı oluşturulduysa başarılı mesajı döndür
                return res.status(201).json({
                    statusCode: 201,
                    message:
                        'Kullanıcı başarıyla oluşturuldu. Mail adresinizi doğrulamak için lütfen mailinizi kontrol edin.',
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

function generateUniqueCode() {
    const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    const code = Array.from({ length: 6 }, () => {
        const randomIndex = Math.floor(Math.random() * characters.length);
        return characters.charAt(randomIndex);
    }).join('');

    return code;
}

function generateExpirationTime() {
    const currentTime = new Date();
    const expirationTime = new Date(currentTime.getTime() + 5 * 60000); // 5 dakika = 5 * 60,000 milisaniye

    return expirationTime;
}
