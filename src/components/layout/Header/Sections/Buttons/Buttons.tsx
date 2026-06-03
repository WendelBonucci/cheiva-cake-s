import Cart from "./Sections/Cart"
import Contact from "./Sections/Contact"
import User from "./Sections/User"

export default function Buttons() {
    return (
        <section className="flex items-center gap-4">
            <Cart />
            <User />
            <Contact />
        </section>
    )
}
