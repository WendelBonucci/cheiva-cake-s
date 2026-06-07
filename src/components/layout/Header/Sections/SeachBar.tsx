"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import Fuse from "fuse.js";
import Link from "next/link";

const MOCK_PRODUTOS = [
    {
        id: "1",
        nome: "Bolo de Chocolate Artesanal",
        preco: 79.90,
        categoria: "Bolos",
    },
    {
        id: "2",
        nome: "Bolo de Aniversário Red Velvet",
        preco: 89.9,
        categoria: "Bolos",
    },
    {
        id: "3",
        nome: "Pudim de Leite Condensado Cremoso",
        preco: 18.0,
        categoria: "Sobremesas",
    },
    {
        id: "4",
        nome: "Delícia de Abacaxi no Pote",
        preco: 12.5,
        categoria: "Sobremesas",
    },
    {
        id: "5",
        nome: "Mini Bolo Confeitado de Ninho",
        preco: 45.0,
        categoria: "Bolos",
    },
];

export default function SeachBar() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<typeof MOCK_PRODUTOS>([]);
    const [isOpen, setIsOpen] = useState(false);

    const searchRef = useRef<HTMLDivElement>(null);

    const fuse = useMemo(
        () =>
            new Fuse(MOCK_PRODUTOS, {
                keys: ["nome", "categoria"],
                threshold: 0.4,
            }),
        []
    );

    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        const searchResults = fuse
            .search(query)
            .map((result) => result.item);

        setResults(searchResults);
    }, [query, fuse]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () =>
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
    }, []);

    const handleClear = () => {
        setQuery("");
        setResults([]);
    };

    return (
        <div ref={searchRef} className="relative w-full z-40">
            <form onSubmit={(e) => e.preventDefault()} className="w-full">
                <div className="relative flex items-center w-full bg-background border border-black/5 rounded-2xl focus-within:border-yellow focus-within:bg-white focus-within:shadow-[0_4px_20px_rgba(35,183,217,0.1)] transition-all duration-300 group">
                    <div className="pl-4 text-black/40 group-focus-within:text-yellow transition-colors duration-300">
                        <FiSearch size={20} />
                    </div>

                    <input
                        className="w-full bg-transparent px-3 py-3.5 text-base font-medium text-black placeholder-black/40 outline-none select-none"
                        placeholder="Busque seu bolo ou sobremesa favorita..."
                        type="text"
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setIsOpen(true);
                        }}
                        onFocus={() => setIsOpen(true)}
                    />

                    {query && (
                        <button type="button" onClick={handleClear} className="pr-4 text-black/40 hover:text-red transition-colors duration-200">
                            <FiX size={18} />
                        </button>
                    )}
                </div>
            </form>

            {isOpen && query.trim() && (
                <div className="absolute top-full left-0 w-full mt-2 bg-white/95 backdrop-blur-md border border-black/5 rounded-2xl p-2 shadow-[0_10px_30px_rgba(0,0,0,0.1)] overflow-hidden max-h-80 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
                    {results.length > 0 ? (
                        <ul>
                            {results.map((produto) => (
                                <li key={produto.id}>
                                    <Link href={`/produto/${produto.id}`}
                                        onClick={() =>
                                            setIsOpen(false)
                                        }
                                        className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-beige/40 transition-colors duration-200 group"
                                    >
                                        <div className="flex flex-col">
                                            <span className="text-sm font-semibold text-black">
                                                {produto.nome}
                                            </span>

                                            <span className="text-xs text-black/40">
                                                {produto.categoria}
                                            </span>
                                        </div>

                                        <span className="text-sm font-bold text-green group-hover:scale-105 transition-transform duration-200">
                                            R$ {produto.preco.toFixed(2)}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="p-4 text-center text-sm text-black/40 font-medium">
                            Nenhum doce encontrado para "{query}" 😢
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}