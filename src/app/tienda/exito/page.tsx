"use client";

import Link from "next/link";

export default function ExitoPage() {
  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '4rem 2rem',
      textAlign: 'center'
    }}>
      <div style={{
        background: 'rgba(0, 201, 128, 0.1)',
        border: '1px solid rgba(0, 201, 128, 0.3)',
        borderRadius: '50%',
        width: '100px',
        height: '100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '2rem',
        boxShadow: '0 0 40px rgba(0, 201, 128, 0.2)'
      }}>
        <i className="fa-solid fa-check" style={{ fontSize: '3rem', color: 'var(--color-success, #00C980)' }}></i>
      </div>
      
      <h1 style={{
        fontSize: '3rem',
        fontWeight: 800,
        marginBottom: '1rem',
        background: 'linear-gradient(to right, #fff, rgba(255,255,255,0.7))',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        ¡Pago completado!
      </h1>
      
      <p style={{
        fontSize: '1.2rem',
        color: 'var(--color-text-muted)',
        maxWidth: '600px',
        margin: '0 auto 3rem auto',
        lineHeight: 1.6
      }}>
        Tu compra se ha procesado correctamente. Los beneficios se aplicarán automáticamente en tu cuenta. ¡Gracias por apoyar a Astralix Roleplay!
      </p>
      
      <Link 
        href="/tienda"
        style={{
          background: 'var(--color-accent)',
          color: '#fff',
          padding: '1rem 2.5rem',
          borderRadius: 'var(--radius-xl)',
          fontSize: '1.1rem',
          fontWeight: 600,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.8rem',
          transition: 'all 0.3s ease',
          boxShadow: '0 0 30px rgba(var(--color-accent-rgb), 0.3)'
        }}
        onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
        onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
      >
        <i className="fa-solid fa-arrow-left"></i> Volver a la Tienda
      </Link>
    </div>
  );
}
