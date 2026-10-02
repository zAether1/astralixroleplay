"use client";

import { ArrowRight, Lock, Check, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useCart } from "@/lib/cart/store";

export function CheckoutBlock() {
  const { items, subtotal } = useCart();
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const total = subtotal; // No extra taxes or shipping for virtual items

  const handleCheckout = async () => {
    if (!agreedToTerms) {
      alert("Debes aceptar los Términos y Condiciones para continuar.");
      return;
    }

    if (items.length === 0) {
      alert("El carrito está vacío");
      return;
    }

    setIsProcessing(true);
    
    try {
      const tip4ServItems = items.map(item => ({
        product_id: item.productId,
        quantity: item.quantity
      }));

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ products: tip4ServItems }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          alert("Debes iniciar sesión con Discord antes de poder comprar.");
          // You could potentially open the Discord login modal or redirect here
        } else {
          alert(data.error || "Ocurrió un error al procesar el pago. Por favor intenta nuevamente.");
        }
        setIsProcessing(false);
        return;
      }

      if (data.success && data.url) {
        window.location.href = data.url;
      } else {
        alert("Ocurrió un error inesperado al generar el checkout.");
        setIsProcessing(false);
      }
    } catch (err) {
      console.error("Error al iniciar checkout:", err);
      alert("Ocurrió un error de red. Por favor intenta nuevamente.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl p-4 md:p-6 bg-background text-foreground">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Checkout Seguro</h1>
        <p className="text-muted-foreground mt-2">
          Completa tu compra de beneficios para Astralix Roleplay.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="mb-4 text-xl font-semibold flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                Información de Pago
              </h2>
              <div className="space-y-4">
                <div className="rounded-lg border bg-card p-4">
                  <p className="text-sm text-muted-foreground mb-3">
                    Serás redirigido a la pasarela de pago segura de Tip4Serv para completar tu transacción usando tu método de pago preferido.
                  </p>
                  <div className="flex items-center gap-2 text-sm">
                    <Lock className="h-4 w-4 text-primary" />
                    <span>Transacción 100% segura y encriptada.</span>
                  </div>
                </div>

                <div className="flex items-start space-x-2 pt-4">
                  <Checkbox 
                    id="terms" 
                    checked={agreedToTerms}
                    onCheckedChange={(c) => setAgreedToTerms(c as boolean)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Acepto los Términos y Condiciones
                    </label>
                    <p className="text-sm text-muted-foreground">
                      Entiendo que al ser bienes digitales, no aplican reembolsos una vez entregado el beneficio.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="sticky top-6">
            <CardContent className="p-6">
              <h2 className="mb-4 text-xl font-semibold">Resumen de tu pedido</h2>
              
              {items.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">Tu carrito está vacío</p>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.productId} className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-medium bg-secondary text-secondary-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs">
                          {item.quantity}
                        </span>
                        <span className="text-muted-foreground truncate max-w-[150px]">
                          {item.name}
                        </span>
                      </div>
                      <span className="font-medium">
                        €{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                  
                  <div className="h-px w-full bg-border" />
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>€{subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="h-px w-full bg-border" />
                  
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-primary">€{total.toFixed(2)}</span>
                  </div>
                </div>
              )}

              <Button 
                className="mt-6 w-full group" 
                size="lg"
                onClick={handleCheckout}
                disabled={items.length === 0 || !agreedToTerms || isProcessing}
              >
                {isProcessing ? "Procesando..." : "Proceder al Pago Seguro"}
                {!isProcessing && (
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                )}
              </Button>
              
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Lock className="h-3 w-3" />
                Pago procesado de forma segura por Tip4Serv
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
