"use client";
import { useState, useEffect, useRef } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import Fuse from "fuse.js";
import Link from "next/link";
import { getProducts } from "@/services/Product/Product";

// Definindo a tipagem com base no que vem do seu Firebase
type ProductType = {
    id: string;
    nome: string;
    preco: number | string;
    categoria?: string;
    descricao?: string;
};

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const [products, setProducts] = useState<ProductType[]>([]);
    const [results, setResults] = useState<ProductType[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [fuseInstance, setFuseInstance] = useState<Fuse<ProductType> | null>(null);

    const searchRef = useRef<HTMLDivElement>(null);

    // busca os produtos do Firebase ao montar o componente
    useEffect(() => {
        async function fetchProducts() {
            try {
                const data = await getProducts();

                setProducts((data ?? []) as ProductType[]);
            } catch (error) {
                console.error("Erro ao carregar produtos na busca:", error);
            }
        }

        fetchProducts();
    }, []);

    // inicializa ou atualiza o Fuse.js assim que os produtos do Firebase carregarem
    useEffect(() => {
        if (products.length > 0) {
            const fuse = new Fuse(products, {
                keys: ["nome", "categoria", "descricao"],
                threshold: 0.4, // Sensibilidade da busca aproximada
            });
            setFuseInstance(fuse);
        }
    }, [products]);

    // Executa a busca toda vez que o usuário digita algo
    useEffect(() => {
        if (!query.trim() || !fuseInstance) {
            setResults([]);
            return;
        }

        const searchResults = fuseInstance
            .search(query)
            .map((result) => result.item);

        setResults(searchResults);
    }, [query, fuseInstance]);

    // Closes the dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleClear = () => {
        setQuery("");
        setResults([]);
    };

    return (
        <div ref={searchRef} className="relative w-full z-50">
            <form onSubmit={(e) => e.preventDefault()} className="w-full">

                <div className="relative flex items-center w-full bg-background/50 border border-black/5 rounded-2xl focus-within:border-yellow focus-within:bg-white focus-within:shadow-[0_10px_25px_rgba(31,166,90,0.08)] transition-all duration-300 group">
                    <div className="pl-4 text-black/40 group-focus-within:text-yellow transition-colors duration-300">
                        <FiSearch size={20} />
                    </div>

                    <input
                        className="w-full bg-transparent px-3 py-3.5 text-sm md:text-base font-semibold text-black placeholder-black/40 outline-none"
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
                        <button type="button" onClick={handleClear} className="pr-4 text-black/40 hover:text-red-500 transition-colors duration-200">
                            <FiX size={18} />
                        </button>
                    )}
                </div>
            </form>

            {isOpen && query.trim() && (
                <div className="absolute top-full left-0 w-full mt-2 bg-white/95 backdrop-blur-md border border-black/5 rounded-2xl p-2 shadow-[0_15px_35px_rgba(0,0,0,0.08)] overflow-hidden max-h-80 overflow-y-auto transition-all duration-200">
                    {results.length > 0 ? (
                        <ul className="space-y-1">
                            {results.map((produto) => {
                                // Força a formatação caso venha número puro do banco
                                const priceValue =
                                    typeof produto.preco === 'number'
                                        ? produto.preco
                                        : Number.parseFloat(produto.preco) || 0;

                                return (
                                    <li key={produto.id}>
                                        <Link href={`/produtos/${produto.id}`} onClick={() => setIsOpen(false)}
                                            className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-beige/30 transition-colors duration-200 group">
                                            <div className="flex flex-col gap-0.5">
                                                <span className="text-sm font-bold text-black group-hover:text-yellow transition-colors">
                                                    {produto.nome}
                                                </span>
                                                {produto.categoria && (
                                                    <span className="text-xs text-black/50 font-medium">
                                                        {produto.categoria}
                                                    </span>
                                                )}
                                            </div>

                                            <span className="text-sm font-black text-green whitespace-nowrap">
                                                R$ {priceValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                            </span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    ) : (
                        <div className="p-6 text-center text-xs md:text-sm text-black/50 font-medium select-none">
                            Nenhum doce encontrado para <span className="font-bold text-black">"{query}"</span> 😢
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}