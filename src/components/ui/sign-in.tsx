"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";

export function SignIn({ onLoginClick }: { onLoginClick: () => void }) {
  return (
    <Card className="w-full max-w-sm rounded-lg border border-border shadow-sm/2">
      <CardHeader>
        <CardTitle className="text-2xl">Identificación de Jugador</CardTitle>
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
              <ShieldCheck className="h-5 w-5 text-primary" />
              Conectar con Tip4Serv / FiveM
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
