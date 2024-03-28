import prisma from '@/lib/prisma';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import DecryptPassword from '@/lib/decryptPassword';

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        try {
          const { email, password } = credentials;

          // email ve password boş ise hata fırlatıyoruz.
          if (!email || !password) {
            throw new Error('Please enter your email and password');
          }

          // email adresi veritabanında kayıtlı mı kontrol ediyoruz.
          const findUser = await prisma.user.findUnique({
            where: { email: email },
          });

          // email adresi veritabanında kayıtlı değilse hata fırlatıyoruz.
          if (!findUser) {
            throw new Error('Kullanıcı bulunamadı.');
          }

          // Veritabanındaki şifre ile giriş yapan kullanıcının girdiği şifreyi karşılaştırıyoruz.
          const passwordDecrypt = await DecryptPassword(
            password,
            findUser.password
          );

          // Şifreler eşleşmiyorsa hata fırlatıyoruz.
          if (!passwordDecrypt) {
            throw new Error('Şifre yanlış.');
          }

          return findUser;
        } catch (error) {
          throw new Error(error.message);
        }
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    encryption: true,
  },

  // kullanıcı giriş yaptıktan sonra giriş yapan kullanıcının bilgilerini token değişkenine atıyoruz.
  session: {
    strategy: 'jwt',
    maxAge: 1 * 24 * 60 * 60, // 1 days * 24 hours * 60 minutes * 60 seconds
  },

  callbacks: {
    // jwt fonksiyonu ile kullanıcı giriş yaptıktan sonra giriş yapan kullanıcının bilgilerini token değişkenine atıyoruz.
    // bu bilgileri session fonksiyonunda kullanacağız.
    async jwt({ token, user }) {
      if (user) {
        token.user = { ...user };
      }
      return token;
    },

    // Client Component içerisinde kullanılır.
    async session({ session, token }) {
      if (token?.user) {
        session.user = token.user;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
