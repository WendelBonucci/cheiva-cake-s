import Carousel from "./Sections/Carousel/Carousel"
import ContentIlustrative from "./Sections/UI/ContentIlustrative"

export default function HomeMain() {
    return (
        <main className="flex flex-col">
            <Carousel />
            <ContentIlustrative />
        </main>
    )
}