import { ArrowRight, Triangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface FooterLink {
  title: string;
  url: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

interface Footer01Props {
  logo?: React.ReactNode;
  brandName?: string;
  socialLinks?: FooterLink[];
  mainLinks?: FooterLink[];
  legalLinks?: FooterLink[];
  copyright?: string;
  className?: string;
}

const defaultMainLinks = [
  { title: "Inicio", url: "/tienda" },
  { title: "Tienda VIP", url: "/tienda/category/vips" },
  { title: "Dinero", url: "/tienda/category/dinero" },
  { title: "Ropa Custom", url: "/tienda/category/ropa" },
  { title: "Organizaciones", url: "/tienda/category/organizaciones" },
];

const defaultLegalLinks = [
  { title: "Términos y Condiciones", url: "#" },
  { title: "Política de Privacidad", url: "#" },
  { title: "Reglamento del Servidor", url: "#" },
];

const defaultSocialLinks = [
  { title: "Discord", url: "https://discord.gg/astralixrp" },
  { title: "Instagram", url: "#" },
  { title: "TikTok", url: "#" },
];

export function Footer01({
  logo,
  brandName = "Astralix Roleplay",
  socialLinks = defaultSocialLinks,
  mainLinks = defaultMainLinks,
  legalLinks = defaultLegalLinks,
  copyright = `© ${new Date().getFullYear()} Astralix Roleplay. Todos los derechos reservados.`,
  className,
}: Footer01Props) {
  return (
    <footer className={cn("bg-background pb-8 pt-16 lg:pb-12 lg:pt-24", className)}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="flex flex-col gap-6 lg:col-span-1">
            <div className="flex items-center gap-2">
              {logo || (
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Triangle className="h-5 w-5 text-primary" />
                </div>
              )}
              <span className="text-xl font-semibold">{brandName}</span>
            </div>
            <p className="text-muted-foreground max-w-sm">
              Únete a la mejor experiencia de Roleplay. Adquiere tus beneficios y mejora tu nivel de juego.
            </p>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium">Suscríbete a novedades</span>
              <div className="flex gap-2">
                <Input placeholder="Tu correo electrónico" className="max-w-xs" />
                <Button variant="default" size="icon">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-3 lg:col-span-2">
            <div className="flex flex-col gap-4">
              <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                Navegación
              </span>
              <ul className="flex flex-col gap-3">
                {mainLinks.map((link) => (
                  <li key={link.title}>
                    <a
                      href={link.url}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                Social
              </span>
              <ul className="flex flex-col gap-3">
                {socialLinks.map((link) => (
                  <li key={link.title}>
                    <a
                      href={link.url}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                Legal
              </span>
              <ul className="flex flex-col gap-3">
                {legalLinks.map((link) => (
                  <li key={link.title}>
                    <a
                      href={link.url}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">{copyright}</p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Powered by Tip4Serv</span>
            <span className="h-4 w-px bg-border"></span>
            <span>Made for FiveM</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
