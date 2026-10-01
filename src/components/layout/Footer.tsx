import Link from "next/link";
import { Gamepad2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-border mt-16">
      <div className="max-w-[64rem] mx-auto px-6 md:px-10">
        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-12 py-16">
          {/* Brand */}
          <div className="flex flex-col gap-3 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 hover:opacity-85 transition-opacity">
              <Gamepad2 size={24} className="text-accent drop-shadow-[0_0_1rem_rgba(144,0,250,0.2)]" />
              <span className="font-display font-bold text-xl text-white tracking-tight">
                Astralix<span className="text-accent">Roleplay</span>
              </span>
            </Link>
            <p className="text-text-muted text-[0.85rem] leading-[1.5] max-w-[18rem]">
              Bienvenido a la tienda oficial de AstralixRoleplay. Aquí podrás adquirir
              paquetes y beneficios exclusivos para mejorar tu experiencia en nuestro servidor.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-2">
            <h3 className="font-display font-bold text-white text-[0.8rem] tracking-[0.1em] uppercase mb-2">
              Navegación
            </h3>
            <Link href="/" className="text-[0.85rem] text-text-muted hover:text-accent transition-colors">
              Inicio
            </Link>
            <Link href="/tienda" className="text-[0.85rem] text-text-muted hover:text-accent transition-colors">
              Tienda
            </Link>
          </div>

          {/* Categories */}
          <div className="flex flex-col gap-2">
            <h3 className="font-display font-bold text-white text-[0.8rem] tracking-[0.1em] uppercase mb-2">
              Categorías
            </h3>
            <Link href="/tienda" className="text-[0.85rem] text-text-muted hover:text-accent transition-colors">
              Todos los Paquetes
            </Link>
            <Link href="/tienda" className="text-[0.85rem] text-text-muted hover:text-accent transition-colors">
              Rangos VIP
            </Link>
            <Link href="/tienda" className="text-[0.85rem] text-text-muted hover:text-accent transition-colors">
              Vehículos
            </Link>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-2">
            <h3 className="font-display font-bold text-white text-[0.8rem] tracking-[0.1em] uppercase mb-2">
              Legal
            </h3>
            <Link href="/terminos" className="text-[0.85rem] text-text-muted hover:text-accent transition-colors">
              Términos y Condiciones
            </Link>
            <Link href="/privacidad" className="text-[0.85rem] text-text-muted hover:text-accent transition-colors">
              Política de Privacidad
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="py-5 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-[0.78rem] text-text-disabled">
          <p className="cursor-pointer transition-colors hover:text-accent">
            &copy; {new Date().getFullYear()} AstralixRoleplay. Todos los derechos reservados.
          </p>
          <p className="cursor-pointer transition-colors hover:text-accent">
            No afiliados con Rockstar Games ni Take-Two Interactive.
          </p>
          <div className="flex items-center gap-1.5 cursor-pointer transition-colors hover:text-accent">
            Powered by <span className="font-bold text-text-muted">Tip4Serv</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
