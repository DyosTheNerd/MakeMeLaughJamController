import { Carousel } from "@material-tailwind/react";
import Card, {CardIf} from "@/components/Card";


export type JokeCarouselProps= {
    cards: CardIf[]
    selector: (val: CardIf)=>void
}

export function JokeCarousel(props: JokeCarouselProps) {
    return (
        <Carousel className="rounded-xl" children={props.cards.map(card => <Card card={card} selector={props.selector}></Card>)} placeholder={undefined} >

        </Carousel>
    );
}