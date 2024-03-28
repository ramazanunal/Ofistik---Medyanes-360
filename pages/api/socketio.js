import { Server } from 'socket.io'

let users = {}; // Kullanıcı kimliklerini ve bunların karşılık gelen soket kimliklerini depolamak için bir nesne

const ioHandler = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    if (!res.socket.server.io) {
        console.log('*First use, starting socket.io')

        const io = new Server(res.socket.server, {
            cors: {
                origin: "*"
            },
        })

        io.on('connection', socket => {
            console.log("Connected new user.")

            socket.on('set_user', (userId) => {
                users[userId] = socket.id
                console.log("New user's data:", users)
            })

            socket.on("updateSavedTimes", (newTimes) => {
                // Tüm kullanıcıların soketlerine yeni zamanları gönder
                Object.values(users).forEach(userSocketId => {
                    io.to(userSocketId).emit("savedTimes", newTimes);
                });
            })

            socket.on("updateSelectedTimes", (newTimes) => {
                // Tüm kullanıcıların soketlerine yeni zamanları gönder
                Object.values(users).forEach(userSocketId => {
                    io.to(userSocketId).emit("selectedTimes", newTimes);
                });
            })
            
            socket.on("newDate", (date) => {
                // Tüm kullanıcıların soketlerine yeni zamanları gönder
                Object.values(users).forEach(userSocketId => {
                    io.to(userSocketId).emit("date", date);
                });
            })

            socket.on('disconnect', () => {
                const userId = Object.keys(users).find(key => users[key] === socket.id);
                if (userId) {
                    delete users[userId]; // Bağlantısı kesilen kullanıcıyı kullanıcılar nesnesinden kaldır
                    console.log("User disconnected:", userId);
                }
            })
        })

        res.socket.server.io = io
    } else {
        console.log('socket.io already running')
    }
    res.end("Hello world")
}

export const config = {
    api: {
        bodyParser: false
    }
}

export default ioHandler;