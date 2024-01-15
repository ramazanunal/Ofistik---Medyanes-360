'use client'
import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';
import {SessionProvider} from "next-auth/react";

export default function RootLayout({children, session}) {
    return (<html lang='en'>
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
