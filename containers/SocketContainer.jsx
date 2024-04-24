'use client'
import { useSocket } from '@/store/useSocket'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import io from 'socket.io-client'

export default function SocketClient() {
    const { data } = useSession()
    const { setSocket, socket: stateSocket } = useSocket()

    useEffect(() => {
        const userId = data?.user?.id;

        if (true) {
            let socket;

            fetch('/api/socketio').then(() => {
                if (!stateSocket) {
                    socket = io();
                    setSocket(socket);

                    socket.on("connect", () => {
                        // sonrasında userId kullanılacak
                        socket.emit('set_user', crypto.randomUUID()); // Bağlantı tamamlandığında 'set_user' olayını emit et
                    });
                }
            })

            return () => {
                if (socket) {
                    socket.disconnect();
                }
            };
        }
    }, [stateSocket]);

    return <></>; // Placeholder JSX
}
