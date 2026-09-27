import {
  Activity,
  CreditCard,
  MapPin,
  Package,
  Search,
  ShieldCheck,
  ShoppingCart,
  Store,
  Utensils,
  type LucideIcon,
} from "lucide-react";

import type { ProjectResponse } from "@/lib/types";
import FeatureCard from "../../feature-card";

interface IdentifiedFeaturesProps {
  features: ProjectResponse["features"];
  aiFeatures: ProjectResponse["ai_features"];
}

const featureIcons: Record<string, LucideIcon> = {
  "user authentication": ShieldCheck,
  "restaurant listing": Store,
  "food search and filtering": Search,
  "shopping cart": ShoppingCart,
  "order placement": Package,
  "online payment": CreditCard,
  "order tracking": MapPin,
  "restaurant dashboard": Activity,
  "menu management": Utensils,
  "order notifications": Activity,
};

export default function IdentifiedFeatures({
  features,
  aiFeatures,
}: IdentifiedFeaturesProps) {
  const identifiedFeatures = features.map((featureName) => {
    const aiFeature = aiFeatures.find(
      (feature) => feature.name.toLowerCase() === featureName.toLowerCase(),
    );

    const Icon = featureIcons[featureName.toLowerCase()] ?? Package;

    return {
      title: aiFeature?.name ?? featureName,
      description:
        aiFeature?.description ||
        "This feature was identified from the project requirements.",
      importance: (aiFeature?.importance ?? "medium").toUpperCase() as
        | "LOW"
        | "MEDIUM"
        | "HIGH",
      icon: Icon,
    };
  });

  return (
    <section className="px-5 pb-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-purple-400">
            AI Detection
          </p>

          <h2 className="mt-2 text-2xl font-semibold tracking-tight">
            AI-Identified Features
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Features identified from the project description and requirements.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {identifiedFeatures.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
