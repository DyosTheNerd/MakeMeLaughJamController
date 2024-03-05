import { Typography, Button } from "@material-tailwind/react";
import {getJoke} from "@/service/JokesService";

export type CardIf = {
    id: number;
    type: string;
    intensity: number;
    text: string;
}

// a functional react component to render a card

export default function Card(props: { card: CardIf, selector: (val: CardIf) => void }) {
    const {card} = props

    return  <div className="relative  max-h-screen max-w-screen">
        <img
            src="/images/index.png"
            alt="image 1"
            className=" object-cover  h-screen w-full"
        />

        <div className="absolute inset-0 grid  place-items-center bg-black/50 h-full">
            <div className="w-3/4 text-center flex-grow ">
                <Typography
                    variant="h1"
                    color="black"
                    className="mb-4 text-2xl md:text-4xl lg:text-2xl font-permanent-marker text-left "
                    placeholder={undefined}                >
                    Type: {card.type}<br></br>
                    Intensity: {card.intensity}
                </Typography>
                <Typography
                    variant="lead"
                    color="black"
                    className="mb-12 opacity-80 text-left font-permanent-marker"
                    placeholder={undefined}
                >
                    {getJoke(card)}
                </Typography>

            </div>
            <div className="justify-center p-0">
                <Button size="lg" color="white" onClick={() => {
                    props.selector(props.card);
                }}  placeholder={undefined}>
                    Make this joke
                </Button>
            </div>
        </div>

    </div>
}