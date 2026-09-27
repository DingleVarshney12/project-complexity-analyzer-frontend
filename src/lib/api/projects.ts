
import type {
  ComplexityFactor,
  ComplexityLevel,
  ComplexityScale,
  RequirementType,
  EvidenceType,
  ProjectSummary,
  ProjectResponse,
} from "@/lib/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function getApiUrl() {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }

  return API_URL;
}

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
  const response = await fetch(`${getApiUrl()}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      result?.message ||
        "Failed to create and analyze the project.",
    );
  }

  return result;
}

export async function getProjects(): Promise<ProjectApiResponse[]> {
  const response = await fetch(`${getApiUrl()}/projects`, {
    method: "GET",
    credentials: "include",
  });

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      result?.message || "Failed to fetch projects.",
    );
  }

  return result;
}

export async function renameProject(
  uid: string,
  name: string,
): Promise<ProjectApiResponse> {
  const response = await fetch(
    `${getApiUrl()}/projects/${uid}/name`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ name }),
    },
  );

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      result?.message || "Failed to rename project.",
    );
  }

  return result;
}

export async function getProjectByUid(
  uid: string,
): Promise<ProjectApiResponse> {
  const response = await fetch(`${getApiUrl()}/projects/${uid}`, {
    method: "GET",
    credentials: "include",
    cache: "no-store",
  });

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      result?.message || "Failed to load project.",
    );
  }

  return result;
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

export async function deleteProject(
  uid: string,
): Promise<void> {
  const response = await fetch(
    `${getApiUrl()}/projects/${uid}`,
    {
      method: "DELETE",
      credentials: "include",
    },
  );

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      result?.message || "Failed to delete project.",
    );
  }
}