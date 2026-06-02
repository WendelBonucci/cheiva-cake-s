"use client"
import Link from "next/link"
import { FiChevronDown } from "react-icons/fi"

export default function Navigation() {
    type DropItem = {
        id: number;
        label: string;
        href: string;
    }

    type NavigationItem = {
        id: number;
        label: string;
        href: string;
        drop?: DropItem[];
    }

    const navigationItems: NavigationItem[] = [
        { id: 1, label: 'Home', href: '/' },
        { id: 2, label: 'Sobre Nós', href: '/' },
        {
            id: 3, label: 'Bolos', href: '#',
            drop: [
                { id: 1, label: 'Bolo Caseiro', href: '/' },
                { id: 2, label: 'Bolos de Aniversário', href: '/' },
                { id: 3, label: 'Mini Bolos Confeitados', href: '/' },
            ],
        },
        {
            id: 4, label: 'Sobremesas', href: '#',
            drop: [
                { id: 4, label: 'Pudim', href: '/' },
                { id: 5, label: 'Delícia de Abacaxi', href: '/' },
                { id: 6, label: 'Delícia de Morango', href: '/' },
                { id: 7, label: 'Din Dins', href: '/' },
            ],
        },
        { id: 5, label: 'Orçamento', href: '/' },
    ];

    return (
        <nav className="relative">
            <ul className="flex items-center gap-6 lg:gap-8">
                {navigationItems.map((item) => (
                    <li key={item.id} className="relative group py-2">
                        {item.drop ? (
                            <div className="flex items-center gap-1 text-sm font-medium text-black/70 hover:text-black cursor-pointer select-none transition-colors duration-200">
                                <span>{item.label}</span>
                                <FiChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180 text-black/40 group-hover:text-black" />
                            </div>
                        ) : (
                            <Link href={item.href} className="text-sm font-medium text-black/70 hover:text-black transition-colors duration-200">
                                {item.label}
                            </Link>
                        )}

                        {item.drop && (
                            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-56 opacity-0 pointer-events-none invisible group-hover:opacity-100 group-hover:pointer-events-auto group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                                <ul className="bg-white/95 backdrop-blur-md border border-black/5 rounded-2xl p-2 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
                                    
                                    {item.drop.map((subItem) => (
                                        <li key={subItem.id}>
                                            <Link href={subItem.href} className="block px-4 py-2.5 text-sm font-medium text-black/70 hover:text-black hover:bg-beige/40 rounded-xl transition-all duration-200">
                                                {subItem.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    )
}