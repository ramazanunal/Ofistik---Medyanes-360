import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import io from 'socket.io-client'

export default function SocketClient() {
    const { data } = useSession()

    useEffect(() => {
        let socket;
        const userId = data?.user?.id;

        if (userId) {
            // Establish Socket.IO connection
            socket = io();

            // Event handlers
            socket.on("connect", () => {
                console.log("Connected to socket server");
                // Emit 'set_user' event when connected
                socket.emit('set_user', userId);
            });

            socket.on('disconnect', () => {
                console.log('Disconnected from socket server');
            });
        }

        // Cleanup function
        return () => {
            if (socket) {
                socket.disconnect();
                console.log('Socket disconnected');
            }
        };
    }, [data]);

    return <></>; // Placeholder JSX
}