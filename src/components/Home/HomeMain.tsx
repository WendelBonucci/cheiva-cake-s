import Carousel from "./Sections/Carousel/Carousel"
import InformationBar from "./Sections/UI/InformationBar"
import ContentIlustrative from "./Sections/UI/ContentIlustrative"

export default function HomeMain() {
    return (
        <main className="flex flex-col">
            <Carousel />
            <InformationBar />
            <ContentIlustrative />
        </main>
    )
}