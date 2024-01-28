'use client'

import {useRouter} from "next/router";
import GameController from "@/components/GameController";

export default function GameComponent({params}: { params: any }) {
    const gameId  = `${useRouter().query.gameId}`;
    const playerId = `${useRouter().query.playerId}`;

    return (
            <main className="flex min-h-screen flex-col items-center justify-between p-24">

                    <GameController gameId={gameId || ''} playerId={playerId || ''} ></GameController>
            </main>
    )
}