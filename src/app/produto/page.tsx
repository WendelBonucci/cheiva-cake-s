import { getProducts } from "@/services/Product/Product";

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="min-h-screen w-full flex items-center justify-center">
      <h1>Produtos</h1>

      {products.map((product: any) => (
        <div key={product.id}>
          <p>{product.nome}</p>
          <p>R$ {product.preco}</p>
        </div>
      ))}
    </main>
  );
}