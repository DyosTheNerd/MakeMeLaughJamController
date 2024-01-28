import { Typography, Button } from "@material-tailwind/react";

export type CardIf = {
    id: number;
    type: string;
    intensity: number;
    text: string;
}

// a functional react component to render a card

export default function Card(props: { card: CardIf, selector: (val: CardIf) => void }) {
    const {card} = props

    return  <div className="relative  max-h-96">
        <img
            src="/images/index.png"
            alt="image 1"
            className=" object-cover  max-h-96"
        />
        <div className="absolute inset-0 grid  place-items-center bg-black/50">
            <div className="w-3/4 text-center md:w-2/4">
                <Typography
                    variant="h1"
                    color="black"
                    className="mb-4 text-2xl md:text-4xl lg:text-2xl font-customFont text-left"
                    placeholder={undefined}                >
                    Type: {card.type}<br></br>
                    Fun Factor: {card.intensity}
                </Typography>
                <Typography
                    variant="lead"
                    color="black"
                    className="mb-12 opacity-80 text-left"
                    placeholder={undefined}
                >
                    This is a funny joke
                </Typography>
                <div className="flex justify-center gap-2 ">
                    <Button size="lg" color="white" onClick={() => {
                        props.selector(props.card);
                    }}  placeholder={undefined}>
                        Make this joke
                    </Button>
                </div>
            </div>
        </div>

    </div>

    // return <div className="flex flex-col items-center justify-center w-64 h-64 bg-gray-200 rounded-md shadow-lg"
    //             onClick={() => props.selector(card)}>
    //     <div className="text-2xl font-bold">{card.type}</div>
    //     <div className="text-2xl font-bold">{card.intensity}</div>
    // </div>
}