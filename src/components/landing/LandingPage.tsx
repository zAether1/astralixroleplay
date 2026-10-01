"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ShoppingBag, Users, Shield, Gamepad2, Zap, MessageSquare, ChevronRight, Server } from "lucide-react";
import gsap from "gsap";

/* ─── Floating Card Data ─── */
const FLOATING_CARDS = [
  { icon: ShoppingBag, title: "Pack VIP Diamante", subtitle: "Beneficio exclusivo", accent: true, delay: 0, duration: 22, left: "8%" },
  { icon: Shield, title: "Rango Moderador", subtitle: "Administración del servidor", accent: false, delay: 4, duration: 26, left: "25%" },
  { icon: Gamepad2, title: "Vehículo GTR", subtitle: "Garaje personal", accent: true, delay: 8, duration: 20, left: "45%" },
  { icon: Zap, title: "Pack 100k $$$", subtitle: "Dinero in-game", accent: false, delay: 12, duration: 24, left: "65%" },
  { icon: Users, title: "Skin Personalizado", subtitle: "Apariencia única", accent: true, delay: 6, duration: 28, left: "82%" },
];

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [bodyOpen, setBodyOpen] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 60, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8 }
    )
    .to({}, { duration: 0.3, onComplete: () => setBodyOpen(true) });

    return () => { tl.kill(); };
  }, []);

  useEffect(() => {
    if (!bodyOpen) return;
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6 }
    )
    .fromTo(
      ctaRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6 },
      "-=0.35"
    )
    .fromTo(
      statsRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6 },
      "-=0.35"
    );

    return () => { tl.kill(); };
  }, [bodyOpen]);

  return (
    <div className="relative z-[1] w-full">
      {/* ─── Hero Section ─── */}
      <section
        ref={heroRef}
        className="relative overflow-hidden flex flex-col items-center justify-center min-h-screen w-full text-center px-6 gap-6"
      >
        {/* Background gradient orbs */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,rgba(144,0,250,0.15)_0%,transparent_70%)]" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(144,0,250,0.08)_0%,transparent_70%)]" />
          <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(88,101,242,0.08)_0%,transparent_70%)]" />
        </div>

        {/* Floating Cards */}
        <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden hidden md:block">
          {FLOATING_CARDS.map((card, i) => (
            <div
              key={i}
              className={`absolute flex items-center gap-4 px-4 py-3 rounded-[var(--radius-md)] whitespace-nowrap backdrop-blur-[12px] ${
                card.accent
                  ? "bg-gradient-to-br from-[#2c0548]/85 to-[#0e0e0e]/90 border border-accent/15 shadow-[var(--shadow-subtle),0_0_1.2rem_rgba(144,0,250,0.06)]"
                  : "bg-gradient-to-br from-[#1e0332]/85 to-[#0e0e0e]/90 border border-white/[0.07] shadow-[var(--shadow-subtle)]"
              }`}
              style={{
                left: card.left,
                bottom: 0,
                animation: `cardFloat ${card.duration}s linear ${card.delay}s infinite`,
                opacity: 0,
              }}
            >
              <div className={`flex items-center justify-center w-[2.6rem] h-[2.6rem] rounded-[var(--radius-sm)] flex-shrink-0 ${
                card.accent ? "bg-accent/10" : "bg-white/[0.05]"
              }`}>
                <card.icon size={20} className={card.accent ? "text-accent" : "text-text-muted"} />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-semibold text-[0.95rem] text-white tracking-[0.01em]">{card.title}</span>
                <span className="text-[0.78rem] text-text-muted font-normal">{card.subtitle}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-[5] flex flex-col items-center gap-6">
          {/* Logo Glow */}
          <div className="w-32 h-32 rounded-full bg-accent/10 flex items-center justify-center shadow-[0_0_4rem_rgba(144,0,250,0.4)] mb-4">
            <Gamepad2 size={56} className="text-accent drop-shadow-[0_0_2rem_rgba(144,0,250,0.5)]" />
          </div>

          <h1
            ref={titleRef}
            className="font-display font-extrabold text-[3.6rem] md:text-[4.5rem] leading-[1.1] tracking-[-0.02em] max-w-[48rem] opacity-0"
          >
            Tu experiencia{" "}
            <span className="text-accent drop-shadow-[0_0_1.6rem_rgba(144,0,250,0.5)]">
              premium
            </span>{" "}
            en FiveM
          </h1>

          {/* Body - Animated reveal */}
          <div className={`flex flex-col items-center gap-6 transition-all duration-[900ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
            bodyOpen ? "max-h-[60vh] opacity-100 overflow-visible" : "max-h-0 opacity-0 overflow-hidden"
          }`}>
            <p
              ref={subtitleRef}
              className="font-body text-[1.2rem] text-text-muted max-w-[36rem] leading-relaxed opacity-0"
            >
              Descubre los mejores paquetes y beneficios exclusivos para tu personaje en{" "}
              <span className="text-accent font-semibold">AstralixRoleplay</span>.
            </p>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="flex gap-5 mt-2 opacity-0 flex-wrap justify-center">
              <Link
                href="/tienda"
                className="font-display text-[1.15rem] font-bold uppercase tracking-[0.06em] text-white bg-accent border-none rounded-[var(--radius-sm)] px-8 py-4 shadow-[0_0_0.6rem_rgba(144,0,250,0.4),0_0.4rem_1.6rem_rgba(144,0,250,0.2)] transition-all duration-200 hover:shadow-[0_0_1.2rem_rgba(144,0,250,0.55),0_0.6rem_2.4rem_rgba(144,0,250,0.35)] hover:brightness-110 active:brightness-95 group"
              >
                Explorar Tienda
                <ChevronRight size={18} className="inline ml-1 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="https://discord.gg/astralixroleplay"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 font-display text-[1.15rem] font-bold uppercase tracking-[0.06em] text-white bg-transparent border border-border-light rounded-[var(--radius-sm)] px-7 py-4 transition-all duration-200 hover:border-discord hover:bg-discord/10"
              >
                <MessageSquare size={20} className="text-discord" />
                Discord
              </a>
            </div>

            {/* Stats Row */}
            <div ref={statsRef} className="flex justify-center gap-5 mt-8 flex-wrap max-w-full opacity-0">
              {/* FiveM Server Stat */}
              <div className="flex items-center gap-4 px-6 py-4 bg-[#1e0332]/70 border border-border rounded-[var(--radius-md)] backdrop-blur-[12px] transition-colors hover:border-accent/20">
                <div className="flex items-center justify-center w-11 h-11 rounded-[var(--radius-sm)] bg-accent/10 flex-shrink-0">
                  <Server size={22} className="text-accent" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-baseline gap-1">
                    <span className="font-display font-extrabold text-2xl text-white leading-none">64</span>
                    <span className="font-display font-bold text-base text-text-disabled">/</span>
                    <span className="font-display font-bold text-base text-text-disabled">128</span>
                  </div>
                  <span className="text-[0.7rem] font-semibold text-text-disabled tracking-[0.1em] uppercase">Jugadores Online</span>
                </div>
                <div className="inline-flex items-center gap-1.5 ml-auto text-[0.7rem] font-semibold tracking-[0.06em] text-success uppercase px-2.5 py-1 bg-success/[0.08] rounded-full">
                  <span className="status-dot" />
                  Online
                </div>
              </div>

              {/* Discord Stat */}
              <div className="flex items-center gap-4 px-6 py-4 bg-[#1e0332]/70 border border-border rounded-[var(--radius-md)] backdrop-blur-[12px] transition-colors hover:border-discord/25">
                <div className="flex items-center justify-center w-11 h-11 rounded-[var(--radius-sm)] bg-discord/10 flex-shrink-0">
                  <Users size={22} className="text-discord" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-display font-extrabold text-2xl text-white leading-none">1,847</span>
                  <span className="text-[0.7rem] font-semibold text-text-disabled tracking-[0.1em] uppercase">Miembros Discord</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="gradient-overlay-bottom" />
      </section>

      {/* ─── Features Section ─── */}
      <section className="relative z-[2] py-24 px-6">
        <div className="max-w-[64rem] mx-auto">
          <span className="inline-block font-display text-[0.7rem] font-bold tracking-[0.16em] text-accent uppercase mb-2">
            ¿Por qué elegirnos?
          </span>
          <h2 className="font-display text-[2.2rem] font-extrabold mb-10 leading-[1.2]">
            Una experiencia{" "}
            <span className="text-accent">única</span> en roleplay
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: Shield,
                title: "Anticheat Avanzado",
                desc: "Sistema de protección de última generación que garantiza un juego limpio para todos los jugadores.",
              },
              {
                icon: Zap,
                title: "Alto Rendimiento",
                desc: "Servidores optimizados con la mejor infraestructura para una experiencia sin lag ni interrupciones.",
              },
              {
                icon: Users,
                title: "Comunidad Activa",
                desc: "Únete a miles de jugadores que disfrutan del mejor roleplay en español con eventos diarios.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-[#1e0332]/50 border border-border rounded-[var(--radius-lg)] p-8 transition-all duration-300 hover:border-accent/25 hover:-translate-y-1.5 hover:shadow-[0_1.2rem_3rem_rgba(0,0,0,0.4)]"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-accent/[0.08] rounded-[var(--radius-md)] mb-4">
                  <feature.icon size={22} className="text-accent" />
                </div>
                <h3 className="font-display text-[1.05rem] font-bold mb-2 text-white">{feature.title}</h3>
                <p className="text-[0.88rem] text-text-muted leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Discord CTA Section ─── */}
      <section className="relative z-[2] py-24 px-6">
        <div className="max-w-[64rem] mx-auto">
          <div className="relative bg-gradient-to-br from-discord/[0.08] to-[#7289da]/[0.04] border border-discord/15 rounded-[var(--radius-lg)] p-12 overflow-hidden backdrop-blur-[8px]">
            {/* Top shimmer bar */}
            <div
              className="absolute top-0 left-0 right-0 h-[3px] rounded-t-[var(--radius-lg)]"
              style={{
                background: "linear-gradient(90deg, #5865f2, #7289da, #5865f2)",
                backgroundSize: "200% 100%",
                animation: "shimmer 3s ease infinite",
              }}
            />

            {/* Big background icon */}
            <div className="absolute bottom-[-1rem] right-8 text-[12rem] text-discord/[0.05] pointer-events-none -rotate-[10deg]">
              <MessageSquare size={192} />
            </div>

            <div className="flex items-start gap-7 mb-8">
              <div className="w-[4.5rem] h-[4.5rem] flex items-center justify-center bg-gradient-to-br from-discord to-[#7289da] rounded-full text-white flex-shrink-0 shadow-[0_0_2rem_rgba(88,101,242,0.3)]">
                <MessageSquare size={32} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 text-[0.7rem] font-bold tracking-[0.16em] text-text-muted uppercase mb-4">
                  <div className="w-8 h-0.5 bg-discord rounded-sm" />
                  Comunidad
                </div>
                <h3 className="font-display text-[2rem] font-extrabold leading-[1.2] mb-3">
                  Únete a nuestra{" "}
                  <span className="text-[#7289da] drop-shadow-[0_0_1.2rem_rgba(88,101,242,0.4)]">comunidad</span>
                </h3>
                <p className="text-[0.95rem] text-text-muted leading-relaxed max-w-[36rem]">
                  Conecta con otros jugadores, recibe soporte en tiempo real y mantente informado
                  sobre las últimas novedades del servidor.
                </p>
              </div>
            </div>

            <a
              href="https://discord.gg/astralixroleplay"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 bg-discord text-white font-display text-[0.95rem] font-bold px-8 py-3.5 rounded-[var(--radius-sm)] border-none transition-all duration-200 hover:brightness-[1.15] hover:-translate-y-0.5 hover:shadow-[0_0.4rem_1.6rem_rgba(88,101,242,0.4)] mb-10"
            >
              <MessageSquare size={18} />
              Unirse a Discord
            </a>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-8 border-t border-discord/[0.12]">
              {[
                { icon: Users, title: "Soporte 24/7", desc: "Nuestro equipo siempre disponible para ti." },
                { icon: Gamepad2, title: "Eventos Exclusivos", desc: "Participa en eventos únicos cada semana." },
                { icon: Zap, title: "Actualizaciones", desc: "Sé el primero en conocer las novedades." },
              ].map((feat, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-10 h-10 flex items-center justify-center bg-discord/10 rounded-[var(--radius-sm)] text-[#7289da] flex-shrink-0">
                    <feat.icon size={18} />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-display text-[0.85rem] font-bold text-white">{feat.title}</span>
                    <span className="text-[0.78rem] text-text-muted leading-snug">{feat.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
