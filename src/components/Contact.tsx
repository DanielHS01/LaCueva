import { MapPin, Phone, Clock } from "lucide-react";

const contactInfo = [
  {
    icon: <MapPin className="w-10 h-10 text-orange-500" />,
    title: "Dirección",
    details: [
      "Calle 15 N° 19 b - 36,",
      "Al frente de la Universidad de Cundinamarca",
      "Facatativá",
    ],
  },
  {
    icon: <Phone className="w-10 h-10 text-orange-500" />,
    title: "Teléfono",
    details: ["318 423 8562", "WhatsApp: 318 423 8562"],
  },
  {
    icon: <Clock className="w-10 h-10 text-orange-500" />,
    title: "Horarios",
    details: [
      "Lun - Jue: 12:00 PM - 9:00 PM",
      "Vie - Sáb: 12:00 PM - 11:00 PM",
      "Dom: No hay servicio",
    ],
  },
];

export default function Contact() {
  return (
    <section className="py-24 bg-mauve-900 text-white">
      <div className="container mx-auto px-6">
        {/* Encabezado con línea naranja */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 inline-block relative">
            Visítanos
            <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-20 h-1 bg-orange-600 rounded-full" />
          </h2>
        </div>

        {/* Grid de Información */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {contactInfo.map((item, index) => (
            <div
              key={index}
              className="bg-mauve-700 p-12 rounded-xl border border-neutral-800 flex flex-col items-center text-center transition-colors hover:border-orange-900/40"
            >
              <div className="mb-6">{item.icon}</div>
              <h3 className="text-2xl font-bold mb-4 tracking-tight">
                {item.title}
              </h3>
              <div className="space-y-1">
                {item.details.map((line, i) => (
                  <p key={i} className="text-gray-400 text-lg">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
