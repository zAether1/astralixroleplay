import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"
import Link from "next/link"

interface DockProps {
  className?: string
  items: {
    icon: React.ElementType | LucideIcon
    label: string
    onClick?: () => void
    href?: string
    badge?: number
  }[]
}

interface DockIconButtonProps {
  icon: React.ElementType | LucideIcon
  label: string
  onClick?: () => void
  href?: string
  className?: string
  badge?: number
}

const floatingAnimation: any = {
  initial: { y: 0 },
  animate: {
    y: [-2, 2, -2],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

const MotionLink = motion(Link);

const DockIconButton = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, DockIconButtonProps>(
  ({ icon: Icon, label, onClick, href, className, badge }, ref) => {
    const commonProps = {
      whileHover: { scale: 1.1, y: -2 },
      whileTap: { scale: 0.95 },
      className: cn(
        "relative group p-3 rounded-lg",
        "hover:bg-secondary/50 transition-colors flex items-center justify-center",
        className
      )
    };

    const content = (
      <>
        <Icon className="w-5 h-5 text-foreground" />
        {badge !== undefined && badge > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#9000FA] text-white text-[10px] font-bold flex items-center justify-center leading-none">
            {badge}
          </span>
        )}
        <span
          className={cn(
            "absolute -top-8 left-1/2 -translate-x-1/2",
            "px-2 py-1 rounded text-xs font-medium tracking-wide",
            "bg-[#180228] text-white border border-white/10",
            "opacity-0 group-hover:opacity-100",
            "transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-xl"
          )}
        >
          {label}
        </span>
      </>
    );

    if (href) {
      return (
        <MotionLink
          href={href}
          {...commonProps}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          // @ts-ignore
          ref={ref}
        >
          {content}
        </MotionLink>
      );
    }

    return (
      <motion.button
        ref={ref as React.Ref<HTMLButtonElement>}
        onClick={onClick}
        {...commonProps}
      >
        {content}
      </motion.button>
    )
  }
)

DockIconButton.displayName = "DockIconButton"

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  ({ items, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center p-2",
          className
        )}
      >
        <div className="rounded-2xl flex items-center justify-center relative">
          <motion.div
            initial="initial"
            animate="animate"
            variants={floatingAnimation}
            className={cn(
              "flex items-center gap-1 p-2 rounded-2xl",
              "backdrop-blur-lg border shadow-lg",
              "bg-[#0a0a0a]/80 border-white/10",
              "hover:shadow-xl hover:border-[#9000FA]/30 transition-all duration-300"
            )}
          >
            {items.map((item) => (
              <DockIconButton key={item.label} {...item} />
            ))}
          </motion.div>
        </div>
      </div>
    )
  }
)

Dock.displayName = "Dock"

export { Dock }
