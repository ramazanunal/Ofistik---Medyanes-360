import { Server } from 'socket.io'

let users = {}; // Object to store user IDs and their corresponding socket IDs

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

            socket.on('disconnect', () => {
                const userId = Object.keys(users).find(key => users[key] === socket.id);
                if (userId) {
                    delete users[userId]; // Remove disconnected user from the users object
                    console.log("User disconnected:", userId);
                }
            })
        })

        res.socket.server.io = io
    } else {
        console.log('socket.io already running')
    }
    res.end("Hello world") // Changed from res.send to res.end
}

export const config = {
    api: {
        bodyParser: false
    }
}

export default ioHandler;