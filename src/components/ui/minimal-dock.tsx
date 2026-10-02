'use client'
import React, { useState } from 'react';
import Link from 'next/link';

export interface DockItem {
  id: string;
  icon: React.ReactNode | any;
  label: string;
  onClick?: () => void;
  href?: string;
  badge?: number;
}

interface DockItemProps {
  item: DockItem;
  isHovered: boolean;
  onHover: (id: string | null) => void;
}

const DockItemComponent: React.FC<DockItemProps> = ({ item, isHovered, onHover }) => {
  const content = (
    <div
      className="relative group"
      onMouseEnter={() => onHover(item.id)}
      onMouseLeave={() => onHover(null)}
    >
      <div
        className={`
          relative flex items-center justify-center
          w-11 h-11 rounded-lg
          bg-white/5 backdrop-blur-[2px]
          border border-white/10
          transition-all duration-300 ease-out
          cursor-pointer
          shadow-none
          ${isHovered 
            ? 'scale-110 bg-white/10 border-white/20 -translate-y-1 shadow-lg shadow-white/10' 
            : 'hover:scale-105 hover:bg-white/7 hover:-translate-y-0.5'
          }
        `}
        onClick={item.onClick}
        style={{
          boxShadow: isHovered
            ? '0 4px 24px 0 rgba(255,255,255,0.08)'
            : undefined,
          transitionProperty: 'box-shadow, transform, background, border-color'
        }}
      >
        <div className={`
          text-white transition-all duration-300 flex items-center justify-center relative
          ${isHovered ? 'scale-105 drop-shadow-[0_1px_4px_rgba(255,255,255,0.10)]' : ''}
        `}>
          {(() => {
            const Icon = item.icon as any;
            return <Icon size={20} className="w-5 h-5" />;
          })()}
          {item.badge !== undefined && item.badge > 0 && (
            <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-[#9000FA] text-white text-[10px] font-bold flex items-center justify-center leading-none">
              {item.badge}
            </span>
          )}
        </div>
      </div>
      
      {/* Tooltip */}
      <div className={`
        absolute -top-10 left-1/2 transform -translate-x-1/2
        px-2.5 py-1 rounded-md
        bg-black/70 backdrop-blur
        text-white text-xs font-normal
        border border-white/5
        transition-all duration-200
        pointer-events-none
        whitespace-nowrap
        ${isHovered 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-1'
        }
        shadow-sm z-50
      `}>
        {item.label}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2">
          <div className="w-2 h-2 bg-black/70 rotate-45 border-r border-b border-white/5"></div>
        </div>
      </div>
    </div>
  );

  if (item.href) {
    return (
      <Link 
        href={item.href}
        target={item.href.startsWith("http") ? "_blank" : undefined}
        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {content}
      </Link>
    );
  }

  return content;
};

interface MinimalistDockProps {
  items: DockItem[];
}

const MinimalistDock: React.FC<MinimalistDockProps> = ({ items }) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[5000] flex flex-col items-center pointer-events-auto">
      <div className="relative">
        {/* Dock Container */}
        <div className={`
          flex items-end gap-3 px-6 py-4
          rounded-2xl
          bg-[#0a0a0a]/80 backdrop-blur-xl
          border border-white/10
          shadow-2xl
          transition-all duration-500 ease-out
          ${hoveredItem ? 'scale-105' : ''}
        `}>
          {items.map((item) => (
            <DockItemComponent
              key={item.id}
              item={item}
              isHovered={hoveredItem === item.id}
              onHover={setHoveredItem}
            />
          ))}
        </div>
        
        {/* Reflection Effect */}
        <div className="absolute top-full left-0 right-0 h-16 overflow-hidden pointer-events-none">
          <div className={`
            flex items-start gap-3 px-6 py-4
            rounded-2xl
            bg-black/20 backdrop-blur-xl
            border border-white/5
            opacity-30
            transform scale-y-[-1]
            transition-all duration-500 ease-out
            ${hoveredItem ? 'scale-105 scale-y-[-1.05]' : ''}
          `}>
            {items.map((item) => (
              <div
                key={`reflection-${item.id}`}
                className={`
                  flex items-center justify-center
                  w-12 h-12 rounded-xl
                  bg-white/5
                  transition-all duration-300 ease-out
                  ${hoveredItem === item.id 
                    ? 'scale-125 -translate-y-2' 
                    : ''
                  }
                `}
              >
                <div className="text-white/50 flex items-center justify-center">
                  {(() => {
                    const Icon = item.icon as any;
                    return <Icon size={20} className="w-5 h-5" />;
                  })()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinimalistDock;
