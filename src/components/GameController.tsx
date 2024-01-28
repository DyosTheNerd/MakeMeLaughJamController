'use client'

import {useEffect, useState} from "react";
import Card, {CardIf} from "@/components/Card";
import {cardsFromFirebaseObject, firebaseConfig, toFirebaseObject} from "@/helpers/FirebaseHelper";
import ConfirmCardButton from "@/components/ConfirmCardButton";
import {JokeCarousel} from "@/components/JokeCarousel";
import {getJoke} from "@/service/JokesService";

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


    const confirmCard = async (card:CardIf) => {
        const result = await fetch(`${firebaseConfig.baseUrl}/${props.gameId}/actions/action_${props.playerId}`,
            {
                method: "PATCH", body: JSON.stringify(toFirebaseObject({
                    id: card.id, playerId: props.playerId,
                }))
            })
        const resultJson: any = await result.json()
        if (parseInt(resultJson?.fields?.id?.integerValue) !== card.id) {
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

                // expect that hand might not exist, do nothing and return
                if(responseJson.error?.code === 404) return

                const cards = cardsFromFirebaseObject(responseJson)
                setHand(cards);
            } catch (error: any) {
                setError(error.message)
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

        getJoke({id: 2, text: "test", type:"dadJoke", intensity:2});

        const intervalId = setInterval(fetchData, 5000);

        return () => clearInterval(intervalId);
    }, [error, hand, lastUpdate, props.gameId, props.playerId]);

    return <div>
        {hand.length === 0 && <div>Waiting for server</div>}

        {hand.length >0 && <JokeCarousel cards={hand} selector={ confirmCard}></JokeCarousel>}


        {error && <div>{error}</div>}

    </div>
}

