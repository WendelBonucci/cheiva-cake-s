import Image from "next/image";
import Link from "next/link";
import { FiShoppingBag, FiArrowLeft, FiClock, FiCheckCircle } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { getProducts } from "@/services/Product/Product";

// 1. Definição estrita do tipo do Produto vindo do Firebase
interface ProductType {
    id: number | string;
    nome: string;
    preco: number | string;
    categoria?: string;
    descricao?: string;
}

interface ProductPageProps {
    readonly params: Promise<{ readonly id: string }> | { readonly id: string };
}

export default async function ProductMain({ params }: ProductPageProps) {
    const resolvedParams = await params;
    const productId = resolvedParams.id;

    // Busca os produtos e tipa o retorno explicitamente como um array de ProductType
    const products = (await getProducts()) as ProductType[];

    // O TypeScript agora reconhece perfeitamente todos os campos do produto encontrado
    const product = products.find((p) => p.id === productId);

    const localImages: Record<string, string> = {
        "4xmSmhkRPw60BaHTBplN": "/bolodechocolate.png",
        "Vj3uoWiYqIeyyauvxqfP": "/bolodelimao.png",
        "pdNbqvN8SIeYFRzu8WV7": "/bolodemorango.png",
        "HLh9oRtWMVEk6eoPmzei": "/bolodechocolatebranco.png",
    };

    const productImage = localImages[productId] || "/produtos/placeholder-cake.png";
    const whatsappNumber = "5511999999999";

    if (!product) {
        return (
            <div className="w-full text-center py-20 bg-white">
                <p className="text-sm font-bold text-black/50">Produto não encontrado ou indisponível. 😢</p>
                <Link href="/" className="mt-4 inline-block text-xs font-bold text-green underline">
                    Voltar ao catálogo
                </Link>
            </div>
        );
    }

    const formattedPrice =
        typeof product.preco === 'number'
            ? product.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })
            : Number.parseFloat(product.preco).toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
            });

    const whatsappMessage = encodeURIComponent(
        `Olá! Gostaria de encomendar o doce: *${product.nome}* (R$ ${formattedPrice}). Como funciona a entrega?`
    );

    return (
        <section className="w-full min-h-screen flex items-center bg-white py-8 md:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-black/60 hover:text-green transition-colors group">
                        <FiArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
                        <span>Voltar para o Cardápio</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">

                    <div className="lg:col-span-6 w-full">
                        <div className="relative w-full aspect-square bg-beige/20 rounded-2xl overflow-hidden border border-black/5 shadow-xs">
                            <Image
                                src={productImage}
                                fill
                                alt={product.nome}
                                className="object-cover"
                                priority
                                sizes="(max-width: 1024px) 100vw, 600px"
                            />
                        </div>
                    </div>

                    <div className="lg:col-span-6 flex flex-col gap-6 pt-2">

                        <div className="flex flex-col gap-2">
                            <span className="inline-self-start bg-green/10 text-green text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full w-fit">
                                {product.categoria || "Confeitaria Artesanal"}
                            </span>
                            <h1 className="text-2xl md:text-4xl font-black text-black tracking-tight">
                                {product.nome}
                            </h1>
                        </div>

                        <div className="py-2 border-y border-black/5 flex items-center justify-between">
                            <span className="text-xs font-bold text-black/40 uppercase tracking-wider">Valor unitário</span>
                            <span className="text-2xl md:text-3xl font-black text-green">
                                R$ {formattedPrice}
                            </span>
                        </div>

                        <div className="flex flex-col gap-2">
                            <h3 className="text-xs font-black text-black uppercase tracking-wider">Sobre o Doce</h3>
                            <p className="text-sm md:text-base text-black/70 leading-relaxed font-medium">
                                {product.descricao || "Nossos doces são preparados com ingredientes selecionados de alta qualidade, garantindo sabor fresco e textura inigualável para o seu dia."}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3 bg-beige/20 p-4 rounded-xl border border-beige/50">
                            <div className="flex items-center gap-2 text-black/80">
                                <FiClock size={16} className="text-green shrink-0" />
                                <span className="text-xs font-bold">Preparo Fresco</span>
                            </div>
                            <div className="flex items-center gap-2 text-black/80">
                                <FiCheckCircle size={16} className="text-green shrink-0" />
                                <span className="text-xs font-bold">100% Artesanal</span>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 mt-4">
                            <Link href={`https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer"
                                className="flex-1 flex items-center justify-center gap-2 bg-green hover:bg-green/90 text-white font-bold text-sm tracking-wide py-4 px-6 rounded-xl shadow-[0_4px_15px_rgba(31,166,90,0.2)] transition-all duration-200 hover:scale-[1.01]">
                                <FaWhatsapp size={18} />
                                <span>Encomendar via WhatsApp</span>
                            </Link>

                            <Link href="/" className="flex items-center justify-center gap-2 bg-white border border-black/10 text-black font-bold text-sm tracking-wide py-4 px-6 rounded-xl hover:bg-beige/10 transition-colors">
                                <FiShoppingBag size={16} />
                                <span>Outros Sabores</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}