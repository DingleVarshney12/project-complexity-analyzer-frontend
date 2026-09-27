export type ComplexityLevel = "Easy" | "Medium" | "Hard";

export type ComplexityScale = "low" | "medium" | "high";

export type RequirementType = "explicit" | "inferred";

export type EvidenceType = "explicit" | "inferred";

export type FactorType =
  | "technical"
  | "integration"
  | "scope"
  | "data"
  | "security"
  | "external_services";

export type ProjectSummary = {
  type: string;
  summary: string;
  core_objective: string;
};

export type AIFeature = {
  name: string;
  description: string;
  importance: ComplexityScale;
  evidence: EvidenceType;
};

export type AIRequirement = {
  requirement: string;
  type: RequirementType;
  description: string;
};

export type AISuggestion = {
  name: string;
  description: string;
  reason: string;
};

export type ComplexitySignals = {
  functional_scope: number;
  technical_complexity: ComplexityScale;
  integration_complexity: ComplexityScale;
  data_complexity: ComplexityScale;
  security_complexity: ComplexityScale;
  external_services: number;
};

export type ComplexityDimensions = {
  technical_complexity: number;
  integration_complexity: number;
  scope_complexity: number;
  data_complexity: number;
  security_complexity: number;
  external_services_complexity: number;
};

export type ComplexityFactor = {
  type: FactorType;
  name: string;
  contribution: number;
  importance: ComplexityScale | null;
  value: number | null;
};

export type ProjectResponse = {
  uid:string;
  complexity: ComplexityLevel;
  score: number;
  confidence: number;
  reasons: string[];
  factors: ComplexityFactor[];
  dimensions: ComplexityDimensions;
  features: string[];
  technologies: string[];
  project_summary: ProjectSummary;
  ai_features: AIFeature[];
  requirements: AIRequirement[];
  suggestions: AISuggestion[];
  skills_required: string[];
  complexity_signals: ComplexitySignals;
};
export type BuildIdeaResponse = {
  projectDescription: string;
  mainFeatures: string;
  projectInput: string;
  projectOutput: string;
  platform: string;
  technologies: string;
};