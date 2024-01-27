'use client'

import {useEffect, useState} from "react";
import Card, {CardIf} from "@/components/Card";
import {cardsFromFirebaseObject, firebaseConfig, toFirebaseObject} from "@/helpers/FirebaseHelper";
import ConfirmCardButton from "@/components/ConfirmCardButton";

type GameControllerProps = {
    gameId: string;
    playerId: string;
}


// a simple functional react component to render the game state
export default function GameController(props: GameControllerProps) {
    const [hand, setHand] = useState<CardIf[]>([])

    const [selectedCard, setSelectedCard] = useState<CardIf | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [lastUpdate, setLastUpdate] = useState<string | null>(null)


    const confirmCard = async () => {
        const result = await fetch(`${firebaseConfig.baseUrl}/${props.gameId}/actions/action_${props.playerId}`,
            {
                method: "PATCH", body: JSON.stringify(toFirebaseObject({
                    id: selectedCard?.id, playerId: props.playerId,
                }))
            })
        const resultJson: any = await result.json()
        if (parseInt(resultJson?.fields?.id?.integerValue) !== selectedCard?.id) {
            setError("Could not confirm card")
        } else {
            setHand([])
            setError(null)
        }

    }


    useEffect(() => {
        // Function to fetch data from the API
        const fetchData = async () => {

            try {
                if (error || hand.length > 0) return
                const response = await fetch(`${firebaseConfig.baseUrl}/${props.gameId}/hands/hand_${props.playerId}`)
                const responseJson = await response.json()

                if (responseJson.updateTime === lastUpdate) return
                setLastUpdate(responseJson.updateTime)

                const cards = cardsFromFirebaseObject(responseJson)
                setHand(cards);
            } catch (error: any) {
                setError(error.message)
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

        const intervalId = setInterval(fetchData, 5000);

        return () => clearInterval(intervalId);
    }, [error, hand, lastUpdate, props.gameId, props.playerId]);

    return <div>
        {hand.map((card: CardIf) => <Card card={card} selector={setSelectedCard}></Card>)}

        {<ConfirmCardButton card={selectedCard} confirmCard={confirmCard}/>}

        {error && <div>{error}</div>}
    </div>
}

