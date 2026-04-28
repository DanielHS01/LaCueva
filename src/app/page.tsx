import AboutUs from "@/components/AboutUs";
import Contact from "@/components/Contact";
import FeaturedMenu from "@/components/FeaturedMenu";
import Hero from "@/components/Hero";
import { get4Products } from "@/lib/data";

export default async function Home() {
  // Obtenemos los productos directamente en el servidor
  const products = await get4Products();
  return (
    <div>
      <Hero />
      <AboutUs />
      <FeaturedMenu initialProducts={products} />
      <Contact />
    </div>
  );
}
