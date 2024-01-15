import '@/styles/globals.css';
import Providers from '@/providers';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <Providers>
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
        </Providers>
      </body>
    </html>
  );
}
