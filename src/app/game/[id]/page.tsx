import GameComponent from "@/pages/game/[id]";


export default function Game({params}:{params:any}) {

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div>
                <GameComponent params={params}/>
            </div>
        </main>
    )
}

