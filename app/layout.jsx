'use client';
import '@/styles/globals.css';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Header from '@/containers/Home/_components/header';
import Footer from '@/containers/Home/_components/footer';

export default function RootLayout({ children }) {
  return (
    <html lang='en' className='scroll-smooth'>
      <head>
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css'
          integrity='sha512-Avb2QiuDEEvB4bZJYdft2mNjVShBftLdPG8FJ0V7irTLQ8Uo0qcPxh4Plq7G5tGm0rU+1SPhVotteLpBERwTkw=='
          crossOrigin='anonymous'
          referrerPolicy='no-referrer'
        />
      </head>

      <body className='scroll-smooth overflow-x-hidden flex flex-col font-sans bg-primary'>
        <Provider store={store}>
          {children}
          {/* Toastify */}
          <ToastContainer
            position='top-right'
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='dark'
          />
        </Provider>
      </body>
    </html>
  );
}
