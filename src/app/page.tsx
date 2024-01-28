'use client'

import {useState} from "react";
import {GameResponse} from "@/types/GameResponse";
import {firebaseConfig, toFirebaseObject} from "@/helpers/FirebaseHelper";
import GameController from "@/components/GameController";
import { useRouter } from 'next/navigation';
import {getJoke, initJokes} from "@/service/JokesService";


function successMessage(guessedNumber: number, gameData: GameResponse) {
    if (guessedNumber >= 0 && guessedNumber < gameData.persons.length) {
        const correct = gameData.persons[guessedNumber].role.toLowerCase() === "spy"
        return <p>Your guess {guessedNumber} was {correct ? "right" : "wrong"}</p>
    }
    return <p>Could not read the guess</p>
}

export default function Home() {
    const [apiData, setApiData] = useState<object | null>(null);

    const [gameId, setGameId] = useState<string | null>(null);
    const [playerName, setPlayerName] = useState<string | null>(null);
    const [joined, setJoined] = useState<boolean>(false);
    const [playerId, setPlayerId] = useState<string | null>(Math.random().toString(36).substring(7));
    const router = useRouter();



    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div>
                {joined?
                    <div>
                        <p>Game {gameId}</p>
                        <p>Player {playerName}</p>
                        {
                            <GameController gameId={gameId || ''} playerId={playerId || ''} ></GameController>
                        }
                    </div>
                    :<div>
                        <h1  className="mb-4 text-2xl md:text-4xl lg:text-2xl ">Aliens laughing in earth now </h1>
                        <h2  className="mb-4 text-1xl md:text-3xl lg:text-2xl ">Join game</h2>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">GameId</label> <input type="text" onChange={e => setGameId(e.target.value)} /></div>

                        <div className="mb-4"><label className="block text-gray-700 text-sm font-bold mb-2">Name</label>  <input type="text" onChange={e => setPlayerName(e.target.value)} /></div>
                        {process.env.NODE_ENV === "development" && <div className="mb-4"><label className="block text-gray-700 text-sm font-bold mb-2">PlayerId:</label> <input type="text" onChange={e => setPlayerId(e.target.value)} /></div>}
                        <button  className="mb-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                            onClick={async ()=>{
                            if (!gameId || !playerName || !playerId) return
                            const result:any = await joinGame(gameId, playerName, playerId)
                            if (result?.fields.name.stringValue === playerName) {
                                setJoined(true);
                                await router.push(`/game/${gameId}/player/${playerId}`)
                            }
                        }
                        }>Join</button>
                    </div>
                }
        </div>
</main>
)
}

async function joinGame(gameId: string, playerName: string, playerId: string):Promise<object>{
    const response = await fetch(`${firebaseConfig.baseUrl}/${gameId}/players/${playerId}`, {
        method: 'PATCH',
        body: JSON.stringify(toFirebaseObject({name: playerName, playerId: playerId})),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    initJokes();

    return await response.json();
}
