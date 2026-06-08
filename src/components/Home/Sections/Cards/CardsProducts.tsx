import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { getProducts } from "@/services/Product/Product";

// Interface para garantir a consistência das propriedades vindas do banco
interface ProductType {
    id: string;
    nome: string;
    preco: number | string;
    descricao?: string;
}

export default async function CardsProducts() {
    // Tipamos explicitamente o retorno do Firebase
    const products = (await getProducts()) as ProductType[];

    // 1. Mapeamento de Imagens Locais usando o ID do documento no Firebase
    const localImages: Record<string, string> = {
        "4xmSmhkRPw60BaHTBplN": "/bolodechocolate.png",
        "Vj3uoWiYqIeyyauvxqfP": "/bolodelimao.png",
        "pdNbqvN8SIeYFRzu8WV7": "/bolodemorango.png",
        "HLh9oRtWMVEk6eoPmzei": "/bolodechocolatebranco.png",
    };

    const defaultImage = "/produtos/placeholder-cake.png";

    return (
        <section className="w-full bg-white py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-12 md:mb-16">
                    <span className="text-xs font-bold tracking-[0.2em] text-green uppercase block mb-2">
                        Cardápio Exclusivo
                    </span>
                    <h2 className="text-2xl md:text-4xl font-extrabold text-black tracking-tight">
                        Conheça nosso Cardápio de Bolos Artesanais
                    </h2>
                    <div className="h-1 w-16 bg-beige mx-auto mt-4 rounded-full" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
                    {products.map((product) => {
                        const productImage = localImages[product.id] || defaultImage;

                        const formattedPrice =
                            typeof product.preco === 'number'
                                ? product.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })
                                : Number.parseFloat(product.preco).toLocaleString('pt-BR', {
                                    minimumFractionDigits: 2,
                                });

                        return (
                            <div key={product.id} className="group flex flex-col justify-between bg-white rounded-2xl border border-black/5 overflow-hidden transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:border-black/10">
                                <div>
                                    <div className="relative w-full aspect-square bg-beige/10 overflow-hidden">
                                        <Image
                                            src={productImage}
                                            fill
                                            alt={product.nome}
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                                        />
                                    </div>

                                    <div className="p-5 flex flex-col gap-2">
                                        <div className="flex items-baseline justify-between gap-2">
                                            <h3 className="font-bold text-base text-black line-clamp-1 group-hover:text-green transition-colors">
                                                {product.nome}
                                            </h3>
                                            <span className="text-sm font-black text-green whitespace-nowrap">
                                                R$ {formattedPrice}
                                            </span>
                                        </div>

                                        <p className="text-xs text-black/60 font-medium leading-relaxed line-clamp-2 min-h-8">
                                            {product.descricao || "Preparado com ingredientes selecionados de forma 100% artesanal."}
                                        </p>
                                    </div>
                                </div>

                                <div className="px-5 pb-5 pt-1">
                                    <Link href={`/produtos/${product.id}`} className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-bold tracking-wide text-black border border-black/10 bg-white hover:bg-beige/20 hover:border-beige/60 transition-all duration-200">
                                        <span>Detalhes do Produto</span>
                                        <FiArrowRight size={14} className="text-black/60 transition-transform group-hover:translate-x-0.5" />
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}