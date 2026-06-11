import Carousel from "./Sections/Carousel/Carousel"
import InformationBar from "./Sections/UI/InformationBar"
import ContentIlustrative from "./Sections/UI/ContentIlustrative"
import CardsProducts from "./Sections/Cards/CardsProducts"
import About from "./Sections/AboutHome/About"

export default function HomeMain() {

    return (
        <main className="w-full h-full flex flex-col overflow-hidden">
            <Carousel />
            <InformationBar />
            <ContentIlustrative />
            <CardsProducts />
            <About   />
        </main>
    )
}