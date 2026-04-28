import { Flame, Star, Clock } from "lucide-react";

const features = [
  {
    icon: <Flame className="w-10 h-10 text-orange-500" />,
    title: "+15 Sabores",
    description:
      "Desde las clásicas buffalo hasta las más exóticas creaciones.",
  },
  {
    icon: <Star className="w-10 h-10 text-orange-500" />,
    title: "5 Estrellas",
    description: "Calificación promedio de nuestros clientes satisfechos.",
  },
  {
    icon: <Clock className="w-10 h-10 text-orange-500" />,
    title: "Entrega Rápida",
    description: "Tus alitas calientes y crujientes en menos de 30 minutos.",
  },
];

export default function AboutUs() {
  return (
    <section className="py-24 bg-mauve-900 text-white">
      <div className="container mx-auto px-6">
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 inline-block relative">
            Sobre Nosotros
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-1 bg-orange-600 rounded-full" />
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed mt-8">
            En La Cueva cocinamos como en casa. Desde 2022, nuestras alitas y
            comida rápida están pensadas para compartir, con ingredientes
            frescos y mucho sabor en cada bocado.
          </p>
        </div>

        {/* Grid de Características */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-mauve-700/50 p-10 rounded-2xl border border-neutral-800 flex flex-col items-center text-center hover:border-orange-900/50 transition-all hover:-translate-y-2"
            >
              <div className="mb-6">{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
