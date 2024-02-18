import { Server } from 'socket.io';
// route to initialize socket connection
export default async function GET (req: any,res: any ) {
    if(res.socket.server.io){
        console.log('Socket already initialized');
    }
    else {
        console.log('Socket is initializing')
        const io = new Server(res.socket.server)
        res.socket.server.io = io

        io.on('connection', socket => {
            socket.on('input-change', msg => {
                console.log(msg)
                socket.broadcast.emit('update-input', `${msg} modified by server`)

            })
        })
    }
    res.end()
}

