import type {
  ComplexityFactor,
  ComplexityLevel,
  ComplexityScale,
  EvidenceType,
  ProjectResponse,
  ProjectSummary,
  RequirementType,
} from "@/lib/types";
import { apiRequest } from "./api-client";

export type CreateProjectData = {
  name?: string | null;
  projectDescription: string;
  mainFeatures: string;
  projectInput: string;
  projectOutput: string;
  platform?: string;
  technologies?: string;
};

export type ProjectApiResponse = {
  uid: string;
  name: string | null;
  projectDescription: string;
  mainFeatures: string;
  projectInput: string;
  projectOutput: string;
  platform: string;
  technologies: string;
  createdAt: string;
  updatedAt: string;
  analysis: {
    id: string;
    projectUid: string;
    complexity: ComplexityLevel;
    score: number;
    confidence: number;
    reasons: string[];
    factors: ComplexityFactor[];
    dimensions: {
      technical_complexity: number;
      integration_complexity: number;
      scope_complexity: number;
      data_complexity: number;
      security_complexity: number;
      external_services_complexity: number;
    };
    features: string[];
    technologies: string[];
    projectSummary: ProjectSummary;
    aiFeatures: {
      name: string;
      description: string;
      importance: ComplexityScale;
      evidence: EvidenceType;
    }[];
    requirements: {
      requirement: string;
      type: RequirementType;
      description: string;
    }[];
    suggestions: {
      name: string;
      description: string;
      reason: string;
    }[];
    skillsRequired: string[];
    complexitySignals: {
      functional_scope: number;
      technical_complexity: ComplexityScale;
      integration_complexity: ComplexityScale;
      data_complexity: ComplexityScale;
      security_complexity: ComplexityScale;
      external_services: number;
    };
  } | null;
};

export async function createProject(
  data: CreateProjectData,
): Promise<ProjectApiResponse> {
  return apiRequest<ProjectApiResponse>("/projects", {
    method: "POST",
    body: data,
    fallbackMessage: "Failed to create and analyze the project.",
  });
}

export async function getProjects(): Promise<ProjectApiResponse[]> {
  return apiRequest<ProjectApiResponse[]>("/projects", {
    method: "GET",
    fallbackMessage: "Failed to fetch projects.",
  });
}

export async function deleteProject(uid: string): Promise<void> {
  return apiRequest<void>(`/projects/${encodeURIComponent(uid)}`, {
    method: "DELETE",
    fallbackMessage: "Failed to delete project.",
  });
}

export async function renameProject(
  uid: string,
  name: string,
): Promise<ProjectApiResponse> {
  return apiRequest<ProjectApiResponse>(
    `/projects/${encodeURIComponent(uid)}/name`,
    {
      method: "PATCH",
      body: { name },
      fallbackMessage: "Failed to rename project.",
    },
  );
}

export async function getProjectByUid(
  uid: string,
): Promise<ProjectApiResponse> {
  return apiRequest<ProjectApiResponse>(
    `/projects/${encodeURIComponent(uid)}`,
    {
      method: "GET",
      cache: "no-store",
      fallbackMessage: "Failed to load project.",
    },
  );
}

export function mapProjectApiResponseToProjectResponse(
  project: ProjectApiResponse,
): ProjectResponse {
  if (!project.analysis) {
    throw new Error("Project analysis is unavailable.");
  }

  const analysis = project.analysis;

  return {
    uid: project.uid,
    project_name: project.name,
    created_at: project.createdAt,
    complexity: analysis.complexity,
    score: analysis.score,
    confidence: analysis.confidence,
    reasons: analysis.reasons,
    factors: analysis.factors,
    dimensions: analysis.dimensions,
    features: analysis.features,
    technologies: analysis.technologies,
    project_summary: analysis.projectSummary,
    ai_features: analysis.aiFeatures,
    requirements: analysis.requirements,
    suggestions: analysis.suggestions,
    skills_required: analysis.skillsRequired,
    complexity_signals: analysis.complexitySignals,
  };
}
