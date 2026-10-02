import { cn } from "@/lib/utils";
import { useState } from "react";
import Link from "next/link";

interface NavItem {
  icon: React.ReactNode | any;
  label: string;
  onClick?: () => void;
  href?: string;
  badge?: number;
}

export const FloatingDockNav = ({ items }: { items: NavItem[] }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const getScale = (index: number) => {
    if (hoveredIndex === null) return 1;
    const distance = Math.abs(hoveredIndex - index);
    if (distance === 0) return 1.4;
    if (distance === 1) return 1.2;
    if (distance === 2) return 1.1;
    return 1;
  };

  return (
    <div className="bg-[#180228]/80 backdrop-blur-xl rounded-2xl shadow-2xl p-2 border border-white/10">
      <div className="flex items-end gap-2">
        {items.map((item, index) => {
          const content = (
            <button
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={item.onClick}
              className={cn(
                "relative flex flex-col items-center justify-center",
                "rounded-xl transition-all duration-300 ease-out",
                "hover:bg-white/5",
              )}
              style={{
                width: '48px',
                height: '48px',
                transform: `scale(${getScale(index)})`,
                transformOrigin: 'bottom'
              }}
            >
              <div className="transition-colors duration-200 text-gray-300 hover:text-white flex items-center justify-center relative">
                {(() => {
                  const Icon = item.icon as any;
                  return <Icon />;
                })()}
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-[#9000FA] text-white text-[10px] font-bold flex items-center justify-center leading-none">
                    {item.badge}
                  </span>
                )}
              </div>
              
              {/* Tooltip */}
              {hoveredIndex === index && (
                <div className="absolute bottom-full mb-3 px-3 py-1.5 bg-[#0a0a0a] border border-white/10 text-white text-xs font-semibold rounded-lg whitespace-nowrap shadow-xl z-50">
                  {item.label}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
                    <div className="border-4 border-transparent border-t-white/10" />
                  </div>
                </div>
              )}
            </button>
          );

          if (item.href) {
            return (
              <Link 
                key={index} 
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                {content}
              </Link>
            );
          }

          return <div key={index}>{content}</div>;
        })}
      </div>
    </div>
  );
};
