"use client";

import { TestimonialsSection } from "@/components/ui/testimonials-with-marquee";

const REVIEWS = [
  {
    author: {
      name: "Carlos M.",
      handle: "@CarlosM",
      avatar: "https://i.pravatar.cc/150?u=carlos",
    },
    text: "Compré el VIP Gold y la entrega fue inmediata. El servidor es increíble, muy recomendado.",
  },
  {
    author: {
      name: "María G.",
      handle: "@MariaG",
      avatar: "https://i.pravatar.cc/150?u=maria",
    },
    text: "Excelente atención al cliente. Tuve un problema con mi compra y lo resolvieron en menos de 5 minutos por Discord.",
  },
  {
    author: {
      name: "Alejandro R.",
      handle: "@AlejandroR",
      avatar: "https://i.pravatar.cc/150?u=alejandro",
    },
    text: "Los paquetes de dinero son geniales. La economía del servidor está muy bien balanceada y el dinero comprado se refleja al instante.",
  },
  {
    author: {
      name: "Laura P.",
      handle: "@LauraP",
      avatar: "https://i.pravatar.cc/150?u=laura",
    },
    text: "Llevo 6 meses jugando y cada compra ha sido perfecta. El soporte siempre está disponible.",
  },
  {
    author: {
      name: "Diego S.",
      handle: "@DiegoS",
      avatar: "https://i.pravatar.cc/150?u=diego",
    },
    text: "La ropa personalizada es brutal. Me encanta poder crear mi propio estilo en el servidor.",
  },
  {
    author: {
      name: "Pablo F.",
      handle: "@PabloF",
      avatar: "https://i.pravatar.cc/150?u=pablo",
    },
    text: "Muy contento con la compra del pack de organización. Todo funcionó perfecto desde el primer momento.",
  },
];

export function StoreReviews() {
  return (
    <div className="store-section py-16">
      {/* SECTION TITLE WITH DIVIDER - matches original */}
      <div className="store-divider">
        <div className="store-divider-line" />
        <h2 className="store-section-title">
          BIENVENIDO A <span className="accent">ASTRALIX RP</span>
        </h2>
        <div className="store-divider-line" />
      </div>

      <TestimonialsSection
        title="¡LA COMUNIDAD NOS AMA! <3"
        description="No te quedes solo con nuestra palabra, escucha a quienes ya han comprado y disfrutado de nuestros productos. Únete a más de 1.500 jugadores satisfechos."
        testimonials={REVIEWS}
      />
    </div>
  );
}
