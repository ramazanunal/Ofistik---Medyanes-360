'use client'
import { useSocket } from '@/store/useSocket'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import io from 'socket.io-client'

export default function SocketClient() {
    const { data } = useSession()
    const { setSocket } = useSocket()

    useEffect(() => {
        const userId = data?.user?.id;

        if (true) {
            const socket = io();
            setSocket(socket);

            socket.on("connect", () => {
                socket.emit('set_user', crypto.randomUUID()); // Bağlantı tamamlandığında 'set_user' olayını emit et
            });

            return () => {
                socket.disconnect();
            };
        }
    }, []);

    return <></>; // Placeholder JSX
}
