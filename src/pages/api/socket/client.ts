import {Server} from 'socket.io'

const players = new Map<string, Map<string, string>>()
export default async function GET(req: any, res: any) {

    if (res.socket.server.io) {
        console.log('Socket already initialized');
    } else {
        console.log('Socket is initializing')
        const io = new Server(res.socket.server)
        res.socket.server.io = io

        io.on('connection', socket => {

            socket.on('startServer', (msg) => {
                    console.log(`startServer: ${msg}`)
                    const serverData = JSON.parse(msg) as { id: string }
                    players.set(serverData.id, new Map())
                    console.log(players.get(serverData.id))
                    socket.join(`game-${serverData.id}-server`)
                    socket.onAny((topic, msg) => {
                        const topicParts = topic.split('-')
                        if (topicParts.length > 1) {
                            const playerId = topicParts[topicParts.length - 1]
                            socket.to(`game-${serverData.id}-${playerId}`).emit(topicParts[0], msg)
                        } else {
                            socket.to(`game-${serverData.id}-client`).emit(topic, msg)
                        }
                    })
                }
            )
            socket.on('startClient', (msg) => {

                const playerData = JSON.parse(msg) as { id: string, playerId: string, name: string }
                console.log(`startClient: ${msg}`)
                console.log(playerData)

                const lobby = players.get(playerData.id)
                if (!lobby) {
                    socket.emit('error', 'No game found')
                    return
                }
                socket.join(`game-${playerData.id}-client`)
                socket.join(`game-${playerData.id}-${playerData.playerId}`)
                socket.onAny((topic, msg) => {
                    socket.to(`game-${playerData.id}-server`).emit(topic, msg)
                })
                lobby.set(playerData.playerId, playerData.name)
                const lobbyList: { name: string, id: string }[] = []
                lobby.forEach((name, id) => {
                    lobbyList.push({name, id})
                })

                socket.to(`game-${playerData.id}-server`).emit('playerJoined', JSON.stringify({players: lobbyList}))

            })


        })
    }
    res.end()
}

