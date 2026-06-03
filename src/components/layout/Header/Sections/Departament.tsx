"use client"
import Link from "next/link"
import { FiMenu, FiChevronDown } from "react-icons/fi"

export default function Departament() {
    type DepartamentLinks = {
        id: number;
        label: string;
        href: string;
    }

    const departamentLinks: DepartamentLinks[] = [
        { id: 1, label: 'Bolos Caseiros', href: '/' },
        { id: 2, label: 'Bolos de Festas', href: '/' },
        { id: 3, label: 'Sobremesas', href: '/' },
        { id: 4, label: 'Tortas', href: '/' },
        { id: 5, label: 'Solicite um Orçamento', href: '/' },
    ]

    return (
        <div className="relative group py-2">
            <button type="button" className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-black text-white hover:bg-yellow font-semibold text-sm tracking-wide transition-all duration-300 select-none cursor-pointer shadow-sm">
                <FiMenu size={18} />
                <span>Menu de Opções</span>
                <FiChevronDown size={16} className="transition-transform duration-300 group-hover:rotate-180 opacity-70" />
            </button>

            <div className="absolute top-full left-0 pt-2 w-64 opacity-0 pointer-events-none invisible group-hover:opacity-100 group-hover:pointer-events-auto group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                
                <ul className="bg-white/95 backdrop-blur-md border border-black/5 rounded-2xl p-2 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
                    {departamentLinks.map((link) => (
                        <li key={link.id}>
                            <Link href={link.href} className="block px-4 py-3 text-sm font-medium text-black/70 hover:text-black hover:bg-beige/50 rounded-xl transition-all duration-200">
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}