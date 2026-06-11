"use client";
import React, { useEffect, useState } from "react";
import { GiCakeSlice } from "react-icons/gi";

interface LoadingScreenProps {
    children: React.ReactNode;
}

export default function LoadingScreen({ children }: LoadingScreenProps) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isLoaded = false;
        let timeoutFinished = false;

        // Função para esconder o loading apenas quando AMBAS as condições forem aceitas
        const checkAndHideLoading = () => {
            if (isLoaded && timeoutFinished) {
                setLoading(false);
            }
        };

        // 1. Monitora o carregamento real dos componentes/imagens
        const handleLoad = () => {
            isLoaded = true;
            checkAndHideLoading();
        };

        if (document.readyState === "complete") {
            isLoaded = true;
        } else {
            window.addEventListener("load", handleLoad);
        }

        // 2. Trava a tela por pelo menos 2000 milissegundos (2 segundos)
        const timer = setTimeout(() => {
            timeoutFinished = true;
            checkAndHideLoading();
        }, 2000);

        // Limpeza dos listeners e do timer ao desmontar o componente
        return () => {
            window.removeEventListener("load", handleLoad);
            clearTimeout(timer);
        };
    }, []);

    if (!loading) return <>{children}</>;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-9999">
            <div className="relative flex flex-col items-center justify-center">

                <div className="relative w-32 h-32 flex items-center justify-center">
                    <svg className="absolute inset-0 w-full h-full -rotate-90">
                        <circle
                            cx="64"
                            cy="64"
                            r="60"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="transparent"
                            className="text-white/5"
                        />
                        <circle
                            cx="64"
                            cy="64"
                            r="60"
                            stroke="currentColor"
                            strokeWidth="3"
                            fill="transparent"
                            strokeDasharray="377"
                            strokeDashoffset="260"
                            strokeLinecap="round"
                            className="text-green animate-[spin_2.5s_linear_infinite]"
                        />
                    </svg>

                    <div className="relative flex items-center justify-center animate-pulse">
                        <GiCakeSlice size={46} className="text-beige" />
                        <div className="absolute inset-0 bg-beige/10 blur-xl rounded-full"></div>
                    </div>
                </div>

                <div className="mt-8 flex flex-col items-center gap-3">
                    <p className="text-white/70 text-[10px] tracking-[0.4em] uppercase font-bold animate-pulse text-center pl-[0.4em]">
                        Preparando Doçuras
                    </p>

                    <div className="w-20 h-0.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                            className="w-full h-full bg-green origin-left rounded-full"
                            style={{
                                animation: 'progressMove 1.8s ease-in-out infinite'
                            }}
                        />
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes progressMove {
                    0% { transform: translateX(-100%); }
                    50% { transform: translateX(-20%); }
                    100% { transform: translateX(100%); }
                }
            `}</style>
        </div>
    );
}