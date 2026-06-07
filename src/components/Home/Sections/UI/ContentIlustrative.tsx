"use client";
import Image from "next/image";

export default function ContentIlustrative() {
    type ImagesType = {
        id: number;
        image: string;
        alt: string;
    }

    const Images: ImagesType[] = [
        { id: 1, image: '/ilustrativeImg1.png', alt: 'Nossos ingredientes selecionados' },
        { id: 2, image: '/ilustrativeImg3.png', alt: 'Processo artesanal de produção' },
        { id: 3, image: '/ilustrativeImg2.png', alt: 'Amor em cada detalhe confeitado' },
    ]

    return (
        <section className="w-full bg-white py-12 md:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 justify-items-center">
                    {Images.map((item) => (
                        <div key={item.id} className="relative w-full max-w-100 aspect-2/3 rounded-2xl overflow-hidden shadow-sm group border border-black/5">
                            <Image
                                src={item.image}
                                fill
                                alt={item.alt}
                                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 400px"
                                quality={90}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}   