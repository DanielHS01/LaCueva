import MenuGrid from "@/components/MenuGrid";
import { getProducts, getCategories } from "@/lib/data";

export default async function MenuPage() {
  // Traemos productos y categorías en paralelo para mayor velocidad
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <main className="min-h-screen bg-black pt-20">
      <MenuGrid products={products} categories={categories} />
    </main>
  );
}
