"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaDiscord } from "react-icons/fa";

export function SignIn({ onLoginClick }: { onLoginClick: () => void }) {
  return (
    <Card className="w-full max-w-sm rounded-lg border border-border shadow-sm/2">
      <CardHeader>
        <CardTitle className="text-2xl">Iniciar Sesión</CardTitle>
        <CardDescription>
          Conéctate para acceder a tus compras y beneficios.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <Button 
              variant="outline" 
              className="w-full h-12 flex items-center justify-center gap-2"
              onClick={onLoginClick}
            >
              <FaDiscord className="h-5 w-5 text-[#5865F2]" />
              Iniciar Sesión con Discord
            </Button>
          </div>
          
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">
              Tip4Serv Secure Auth
            </span>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Al iniciar sesión aceptas nuestros{" "}
            <a href="#" className="underline underline-offset-4 hover:text-primary">
              Términos de Servicio
            </a>{" "}
            y{" "}
            <a href="#" className="underline underline-offset-4 hover:text-primary">
              Política de Privacidad
            </a>.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
