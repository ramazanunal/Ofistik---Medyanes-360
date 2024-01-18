'use client'
import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';
import {SessionProvider} from "next-auth/react";

export default function RootLayout({children, session}) {
    return (<html lang='en'>
    <header>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
              integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
              crossOrigin="anonymous" referrerpolicy="no-referrer"/>
    </header>
    <body>
    <SessionProvider session={session}>
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
    </SessionProvider>
    </body>
    </html>);
}
