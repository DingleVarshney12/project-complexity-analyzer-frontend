import {
  Activity,
  CreditCard,
  MapPin,
  Package,
  ShieldCheck,
  ShoppingCart,
  Users,
  type LucideIcon,
} from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  importance: "HIGH" | "MEDIUM" | "LOW";
  icon: LucideIcon;
}

const importanceStyles = {
  HIGH: "border-red-400/10 bg-red-400/10 text-red-400",
  MEDIUM: "border-amber-400/10 bg-amber-400/10 text-amber-400",
  LOW: "border-emerald-400/10 bg-emerald-400/10 text-emerald-400",
};

export const featureIcons = {
  shopping: ShoppingCart,
  payment: CreditCard,
  tracking: MapPin,
  users: Users,
  security: ShieldCheck,
  package: Package,
  activity: Activity,
};

export default function FeatureCard({
  title,
  description,
  importance,
  icon: Icon,
}: FeatureCardProps) {
  return (
    <div className="glass-card group p-5 transition-transform duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-blue-400/10 bg-blue-400/10">
          <Icon className="h-5 w-5 text-blue-400" />
        </div>

        <span
          className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-wider ${
            importanceStyles[importance]
          }`}
        >
          {importance}
        </span>
      </div>

      <h3 className="mt-5 font-semibold">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}