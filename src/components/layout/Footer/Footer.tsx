import Link from "next/link";
import { FaInstagram, FaFacebookF, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
    type FooterType = {
        id: number;
        label: string;
        href: string;
        icon?: React.ReactNode;
    };

    // Adicionado ícones para as redes sociais e preenchimento de hrefs genéricos para teste
    const SocialLink: FooterType[] = [
        { id: 1, label: 'Instagram', href: '#', icon: <FaInstagram size={18} /> },
        { id: 2, label: 'Facebook', href: '#', icon: <FaFacebookF size={16} /> },
        { id: 3, label: 'WhatsApp', href: '#', icon: <FaWhatsapp size={18} /> },
    ];

    const InstitucionalLink: FooterType[] = [
        { id: 1, label: 'Contato', href: '#' },
        { id: 2, label: 'Suporte', href: '#' },
        { id: 3, label: 'Sobre Nós', href: '#' },
        { id: 4, label: 'Política de Privacidade', href: '#' },
    ];

    return (
        <footer className="w-full bg-black/80 text-white/70 pt-16 pb-8 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-12 border-b border-white/5">

                    <div className="md:col-span-5 flex flex-col gap-3">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-yellow">A melhor Confeitaria do Ceará</span>
                        <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                            Cheiva <span className="text-beige font-light italic">Cake's</span>
                            <span className="text-yellow">.</span>
                        </h1>
                        <p className="text-xs text-white/50 max-w-sm font-medium leading-relaxed mt-1">
                            Transformando momentos simples em memórias inesquecíveis através de bolos e doces artesanais preparados com amor e ingredientes premium.
                        </p>
                    </div>

                    <div className="md:col-span-4 flex flex-col gap-4">
                        <h3 className="text-xs font-black text-white uppercase tracking-wider">Explorar</h3>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5">
                            {InstitucionalLink.map((item) => (
                                <li key={item.id}>
                                    <Link href={item.href} className="text-xs font-medium text-white/60 hover:text-yellow transition-colors">
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:col-span-3 flex flex-col gap-4">
                        <h3 className="text-xs font-black text-white uppercase tracking-wider">Redes Sociais</h3>
                        <ul className="flex items-center gap-3">
                            {SocialLink.map((item) => (
                                <li key={item.id}>
                                    <Link href={item.href} aria-label={item.label} className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-yellow hover:border-yellow transition-all duration-300">
                                        {item.icon}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-medium text-white/40">
                    <div>
                        &copy; {new Date().getFullYear()} Cheiva Cake's. Todos os direitos reservados.
                    </div>
                    <div className="flex items-center gap-1">
                        <span>Desenvolvido por</span>
                        <Link href="#" className="font-bold text-white/60 hover:text-yellow transition-colors tracking-wide">
                            NextSolve
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}