'use client'

import {useState} from "react";
import {GameResponse} from "@/types/GameResponse";


function successMessage(guessedNumber: number, gameData: GameResponse) {
    if (guessedNumber >= 0 && guessedNumber < gameData.persons.length) {
        const correct = gameData.persons[guessedNumber].role.toLowerCase() === "spy"
        return <p>Your guess {guessedNumber} was {correct ? "right" : "wrong"}</p>
    }
    return <p>Could not read the guess</p>
}

export default function Home() {
    const [apiData, setApiData] = useState<GameResponse | null>(null);
    const [revealedEntries, setRevealedEntries] = useState(0);
    const [allRevealed, setAllRevealed] = useState(false)
    const [guessedNumber, setGuessedNumber] = useState<number>(-1)
    const [requested, setRequested] = useState(false)

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div>


                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        onClick={() => {
                            async function fetchData() {
                                try {
                                    setRequested(true)
                                    const response = await fetch('/api/gamedata');
                                    if (response.ok) {
                                        const data = await response.json();
                                        setApiData(data);
                                        setRevealedEntries(1);
                                    } else {
                                        console.error('Failed to fetch data');
                                    }
                                } catch (error) {
                                    console.error('An error occurred:', error);
                                }
                            }

                            fetchData();
                        }}>
                    Generate new game.
                </button>

        </div>
</main>
)
}
