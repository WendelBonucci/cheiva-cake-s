import Carousel from "./Sections/Carousel/Carousel"
import InformationBar from "./Sections/UI/InformationBar"
import ContentIlustrative from "./Sections/UI/ContentIlustrative"

import CardsProducts from "./Sections/Cards/CardsProducts"

export default function HomeMain() {
    return (
        <main className="flex flex-col">
            <Carousel />
            <InformationBar />
            <ContentIlustrative />
            
            <CardsProducts />
        </main>
    )
}