import Cart from "../Buttons/Cart"
import Contact from "../Buttons/Contact"
import User from "../Buttons/User"

export default function Buttons() {
    return (
        <section className="">
            <div className="flex items-center gap-4">
                <Cart />
                <User />
                <Contact />
            </div>
        </section>
    )
}
