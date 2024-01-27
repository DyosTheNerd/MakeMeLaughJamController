
export type CardIf = {
    id: number;
    type: string;
    intensity: number;
    text: string;
}

// a functional react component to render a card

export default function Card(props: { card: CardIf, selector: (val: CardIf)=>void }) {
    const {card} = props
    return <div className="flex flex-col items-center justify-center w-64 h-64 bg-gray-200 rounded-md shadow-lg"
                onClick={()=>props.selector(card)}>
        <div className="text-2xl font-bold">{card.type}</div>
        <div className="text-2xl font-bold">{card.intensity}</div>
    </div>
}