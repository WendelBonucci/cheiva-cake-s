"use client"
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from "swiper/modules";

import 'swiper/css';
import 'swiper/css/pagination';

export default function Carousel() {
    type CarouselType = {
        id: number;
        desktopImage: string;
        mobileImage: string;
        alt: string;
    }

    const bannerItems: CarouselType[] = [
        { id: 1, desktopImage: '/slide01.png', mobileImage: '/banner1-mobile.png', alt: 'Destaque Bolos Caseiros' },
        { id: 2, desktopImage: '/slide02.png', mobileImage: '/banner2-mobile.png', alt: 'Sobremesas Especiais' },
        { id: 3, desktopImage: '/slide03.png', mobileImage: '/banner3-mobile.png', alt: 'Faça seu Pedido' },
    ]

    return (
        <section className="w-full pt-28 md:pt-36 overflow-hidden bg-white">
            <div className="w-full relative aspect-9/16 md:aspect-1920/650">
                <Swiper
                    modules={[Pagination, Autoplay]}
                    slidesPerView={1}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true
                    }}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    loop
                    className="w-full h-full custom-swiper"
                >
                    {bannerItems.map((item) => (
                        <SwiperSlide key={item.id} className="w-full h-full relative">

                            <div className="hidden md:block w-full h-full relative">
                                <Image
                                    src={item.desktopImage}
                                    fill
                                    alt={item.alt}
                                    className="object-container select-none"
                                    priority={item.id === 1}
                                    sizes="100vw"
                                    quality={100}
                                />
                            </div>

                            <div className="block md:hidden w-full h-full relative">
                                <Image
                                    src={item.mobileImage || '/placeholder-mobile.png'} // Evita quebrar enquanto exporta
                                    fill
                                    alt={item.alt}
                                    className="object-cover select-none"
                                    priority={item.id === 1}
                                    sizes="100vw"
                                    quality={100}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Injeção de estilo customizado para as bolinhas do Swiper baterem com sua paleta */}
                <style jsx global>{`
                    .custom-swiper .swiper-pagination-bullet-active {
                        background: #dfc013 !important;
                        width: 24px !important;
                        border-radius: 6px !important;
                        transition: all 0.3s ease;
                    }
                    .custom-swiper .swiper-pagination-bullet {
                        background: #0D0D0D;
                        opacity: 0.3;
                    }
                    .custom-swiper .swiper-pagination-bullet-active {
                        opacity: 1;
                    }
                `}</style>
            </div>
        </section>
    )
}