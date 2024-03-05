'use client'

import {useRouter} from "next/router";
import GameController from "@/components/GameController";

export default function GameComponent({params}: { params: any }) {
    const gameId  = `${useRouter().query.gameId}`;
    const playerId = `${useRouter().query.playerId}`;

    return (<div>{gameId}<br></br>{playerId}
                    <GameController gameId={gameId || ''} playerId={playerId || ''} ></GameController>
        </div>
    )
}