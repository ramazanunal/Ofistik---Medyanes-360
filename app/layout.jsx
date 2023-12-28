'use client';
import '@/styles/globals.css';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export default function RootLayout({ children }) {
  return (
    <html lang='en' className='scroll-smooth focus:scroll-auto'>
      <body className='overflow-y-auto scroll-smooth overflow-x-hidden flex flex-col font-sans bg-primary'>
        <Provider store={store}>
          {children}
          {/* Toastify */}
          <ToastContainer
            position='bottom-right'
            autoClose={500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='colored'
          />
        </Provider>
      </body>
    </html>
  );
}
