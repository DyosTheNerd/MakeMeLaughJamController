'use client'

import {useEffect, useState} from "react";
import  {CardIf} from "@/components/Card";
import {JokeCarousel} from "@/components/JokeCarousel";
import { initJokes} from "@/service/JokesService";
import io from "socket.io-client";

type GameControllerProps = {
    gameId: string;
    playerId: string;
}



// a simple functional react component to render the game state
export default function GameController(props: GameControllerProps) {
    const [hand, setHand] = useState<CardIf[]>([])
    const [roundNumber, setRoundNumber] = useState<number | null>(null)
    const [socket, setSocket] = useState<any>(null)
    const [playerId, setPlayerId] = useState<string | null>(null)
    const [gameId, setGameId] = useState<string | null>(null)
    useEffect(() => {
        initJokes();
        socketInitializer()
    }, [props.gameId, props.playerId,socket, props, gameId, playerId])

    const socketInitializer = async () => {
        if (gameId && gameId === props.gameId && playerId &&  playerId === props.playerId) return

        await fetch('/api/socket/client?id=' + props.gameId + '&playerId=' + props.playerId);

        const localSocket = io()

        localSocket.on('connect', () => {
            console.log('connected')
            localSocket.emit('startClient', JSON.stringify({id: props.gameId, playerId: props.playerId, name: 'player' + props.playerId}))
        })

        localSocket.on('handUpdate', (msg: string) => {
            const update = JSON.parse(msg) as {playerId: string, cards: CardIf[], roundNumber: number}
            if(update.playerId !== props.playerId) return
            setRoundNumber(update.roundNumber)
            setHand(update.cards)
        })
        localSocket.onAny((event: string, ...args:string[]) => {console.log(event, args)})
        setSocket(localSocket)
        setGameId(props.gameId)
        setPlayerId(props.playerId)
    }


    const confirmCard = async (card: CardIf) => {
        socket.emit('playCard', JSON.stringify(
            {
                playerId: props.playerId,
                 cardId: card.id,
                 roundNumber: roundNumber
        }))
        setHand([])
    }


    return <div>
        {hand.length === 0 && <div>Waiting for server</div>}

        {hand.length >0 && <JokeCarousel cards={hand} selector={ confirmCard}></JokeCarousel>}
    </div>
}

