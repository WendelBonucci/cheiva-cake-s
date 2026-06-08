import ProductPage from "@/components/Home/Sections/Product/Product"; // Ajuste o caminho para onde está o seu componente de estilização

interface PageProps {
  readonly params:
  | Promise<{
    readonly id: string;
  }>
  | {
    readonly id: string;
  };
}

// Esta é a página que o Next.js encontra quando você acessa /produto/ID_DO_BOLO
export default async function Page({ params }: PageProps) {
  return (
    <main className="min-h-screen bg-white">
      <ProductPage params={params} />
    </main>
  );
}