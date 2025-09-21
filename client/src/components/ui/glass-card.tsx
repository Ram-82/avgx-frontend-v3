import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  neonBorder?: boolean;
}

export const GlassCard = ({ children, className, neonBorder = false }: GlassCardProps) => {
  return (
    <div 
      className={cn(
        "glass-card rounded-2xl",
        neonBorder && "neon-border",
        className
      )}
    >
      {children}
    </div>
  );
};
