import Link from "next/link";
import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";

export default function About() {
    return (
        <section className="w-full bg-white py-16 md:py-28 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    
                    <div className="lg:col-span-7 flex flex-col gap-6 order-2 lg:order-1">
                        
                        <div className="flex flex-col gap-2">
                            <span className="text-xs font-bold tracking-[0.2em] text-green uppercase block">Nossa Essência</span>
                            <h2 className="text-3xl md:text-5xl font-black text-black tracking-tight">Sobre Nossa Confeitaria</h2>
                            <div className="h-1 w-16 bg-beige mt-2 rounded-full" />
                        </div>

                        <div className="flex flex-col gap-4 text-sm md:text-base text-black/70 font-medium leading-relaxed">
                            <p>
                                Fundada em 2021, a <span className="text-black font-bold">Cheiva Cake's</span> nasceu com um propósito único: criar bolos personalizados para todos os tipos de celebração. Seja para aniversários, casamentos ou momentos especiais, nossa missão é transformar cada comemoração em uma experiência inesquecível, oferecendo produtos de qualidade, bom gosto e atenção aos mínimos detalhes.
                            </p>
                            <p>
                                Trabalhamos com os melhores ingredientes do mercado para garantir qualidade em cada criação. Nosso propósito é oferecer bolos e sobremesas personalizados que vão além da beleza, proporcionando um sabor único e marcante para as suas comemorações. Afinal, não basta apenas encantar os olhos, é essencial conquistar o paladar.
                            </p>
                            <p className="text-black font-semibold bg-beige/20 p-4 rounded-xl border-l-4 border-green">
                                Quer conhecer mais sobre a nossa história ou experimentar nossos deliciosos bolos e sobremesas? Não perca tempo! Solicite seu orçamento agora mesmo e descubra como podemos tornar sua comemoração ainda mais especial.
                            </p>
                        </div>

                        <div className="pt-2">
                            <Link href="#" className="inline-flex items-center justify-center gap-2 border-green hover:bg-green/90 text-white font-bold text-sm tracking-wide py-4 px-8 rounded-xl shadow-[0_4px_15px_rgba(31,166,90,0.15)] transition-all duration-200 hover:scale-[1.01] group">
                                <span>Solicitar Orçamento</span>
                                <FiArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                            </Link>
                        </div>
                    </div>

                    <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
                        <div className="relative p-3 bg-beige/30 rounded-3xl border border-beige/60 shadow-xs">
                            <div className="relative rounded-2xl overflow-hidden bg-neutral-100" style={{ width: '400px', height: '600px' }}>
                                <Image
                                    className="object-cover transition-transform duration-700 hover:scale-102"
                                    alt="Detalhe do trabalho artesanal na Cheiva Cakes"
                                    src="/cheiva.png"
                                    width={400}
                                    height={600}
                                    priority
                                    sizes="400px"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}