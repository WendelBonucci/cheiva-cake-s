"use client";
import Link from 'next/link';
import { FiPercent, FiTruck, FiUserPlus, FiGift } from 'react-icons/fi';
import { IconType } from 'react-icons';

export default function InformationBar() {
    type InformativeBar = {
        id: number;
        title: string;
        text: string;
        icon: IconType;
        href: string;
    }

    const Informative: InformativeBar[] = [
        {
            id: 1,
            title: '10% de Desconto',
            text: 'Na primeira compra do site',
            icon: FiPercent,
            href: '/'
        },
        {
            id: 2,
            title: 'Frete Grátis',
            text: 'Consulte o valor mínimo de encomenda',
            icon: FiTruck,
            href: '/'
        },
        {
            id: 3,
            title: 'Cadastre-se',
            text: 'Crie sua conta e ganhe mimos',
            icon: FiUserPlus,
            href: '/'
        },
        {
            id: 4,
            title: 'Clube Cheiva',
            text: 'Compre e acumule pontos em doces',
            icon: FiGift,
            href: '/'
        },
    ];

    return (
        <section className="w-full bg-white border-y border-beige/60 py-20 md:py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 division-x">
                    {Informative.map((item) => {
                        const Icon = item.icon; // Instanciando o ícone dinamicamente
                        return (
                            <li key={item.id} className="flex items-start gap-4 p-2 transition-all duration-350 hover:-translate-y-0.5">
                                <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-green/10 text-green">
                                    <Icon size={20} />
                                </div>

                                <div className="flex flex-col gap-0.5">
                                    <Link href={item.href} className="text-sm font-bold text-black hover:text-green transition-colors inline-block tracking-wide">
                                        {item.title}
                                    </Link>
                                    <p className="text-xs text-black/60 font-medium leading-relaxed">
                                        {item.text}
                                    </p>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}