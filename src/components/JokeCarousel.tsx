import { Carousel } from "@material-tailwind/react";
import Card, {CardIf} from "@/components/Card";


export type JokeCarouselProps= {
    cards: CardIf[]
    selector: (val: CardIf)=>void
}

export function JokeCarousel(props: JokeCarouselProps) {
    return (
        <Carousel className="rounded-xl"  placeholder={undefined} >
            {props.cards.map((card,index) => <Card key={index} card={card} selector={props.selector}></Card>)}
        </Carousel>
    );
}