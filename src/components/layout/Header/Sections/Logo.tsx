import Link from "next/link"

export default function Logo() {
    return (
        <div className="flex items-center">
            <Link href="/" className="group relative flex items-center gap-1 select-none">

                <span className="text-2xl md:text-2xl font-black tracking-tight text-black transition-colors duration-300">
                    Cheiva
                    <span className="text-black/60 font-light italic group-hover:text-black transition-colors duration-300">
                        {" "}Cake's
                    </span>
                </span>

                <span className="w-2 h-2 rounded-full bg-yellow animate-pulse self-end mb-1.5" />

                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow transition-all duration-300 group-hover:w-full" />
            </Link>
        </div>
    )
}