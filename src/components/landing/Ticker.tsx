export function Ticker() {
  return (
    <div className="store-ticker-container">
      <div className="store-ticker-scroll">
        <div className="store-ticker-content">
          <span>¡BIENVENIDO A ASTRALIX ROLEPLAY! LA MEJOR EXPERIENCIA DE ROLEPLAY.</span>
          <span>USA EL CUPÓN <strong style={{ color: 'var(--color-accent)' }}>ASTRALIX30</strong> 30% EN TODOS LOS PRODUCTOS.</span>
          <span>¡DISFRUTA DE BENEFICIOS EXCLUSIVOS CON NUESTROS PAQUETES VIP!</span>
          <span>¡BIENVENIDO A ASTRALIX ROLEPLAY! LA MEJOR EXPERIENCIA DE ROLEPLAY.</span>
          <span>USA EL CUPÓN <strong style={{ color: 'var(--color-accent)' }}>ASTRALIX30</strong> 30% EN TODOS LOS PRODUCTOS.</span>
          <span>¡DISFRUTA DE BENEFICIOS EXCLUSIVOS CON NUESTROS PAQUETES VIP!</span>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        .store-ticker-container {
          width: 100%;
          background: #000;
          color: rgba(255, 255, 255, 0.6);
          padding: 1rem 0;
          font-size: 0.8rem;
          font-weight: 800;
          letter-spacing: 2px;
          text-transform: uppercase;
          overflow: hidden;
          position: relative;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          margin-bottom: 2rem;
        }
        .store-ticker-scroll {
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
        }
        .store-ticker-content {
          display: inline-block;
          animation: marquee 30s linear infinite;
        }
        .store-ticker-content span {
          margin-right: 4rem;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}} />
    </div>
  );
}
