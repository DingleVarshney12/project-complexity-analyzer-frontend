import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

import type { ProjectResponse } from "@/lib/types";

interface ReportPDFProps {
  result: ProjectResponse;
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#f8fafc",
    paddingTop: 38,
    paddingBottom: 42,
    paddingHorizontal: 38,
    fontFamily: "Helvetica",
    color: "#0f172a",
    fontSize: 9,
  },

  // ============================================================
  // HEADER
  // ============================================================

  header: {
    backgroundColor: "#0b1224",
    borderRadius: 12,
    padding: 20,
    marginBottom: 18,
  },

  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  brand: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },

  brandAccent: {
    color: "#60a5fa",
  },

  headerSubtitle: {
    fontSize: 8,
    color: "#94a3b8",
    marginTop: 5,
  },

  reportLabel: {
    fontSize: 7,
    color: "#93c5fd",
    textTransform: "uppercase",
    letterSpacing: 1,
  },

  reportDate: {
    fontSize: 7,
    color: "#64748b",
    marginTop: 3,
  },
  projectName: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#ffffff",
    marginTop: 10,
  },
  // ============================================================
  // SCORE SECTION
  // ============================================================

  scoreSection: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 18,
  },

  scoreCard: {
    width: "36%",
    backgroundColor: "#0f1b35",
    borderRadius: 12,
    padding: 18,
    justifyContent: "center",
  },

  scoreLabel: {
    fontSize: 8,
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },

  scoreValue: {
    fontSize: 38,
    fontWeight: "bold",
    color: "#ffffff",
    marginTop: 4,
  },

  scoreOutOf: {
    fontSize: 8,
    color: "#64748b",
    marginTop: 1,
  },

  confidence: {
    fontSize: 8,
    color: "#93c5fd",
    marginTop: 12,
  },

  complexityCard: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    padding: 18,
    justifyContent: "center",
  },

  complexityLabel: {
    fontSize: 8,
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },

  complexityTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 7,
    color: "#0f172a",
  },

  complexityDescription: {
    fontSize: 8.5,
    lineHeight: 1.5,
    color: "#64748b",
    marginTop: 7,
  },

  badge: {
    alignSelf: "flex-start",
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 10,
  },

  badgeEasy: {
    backgroundColor: "#dcfce7",
  },

  badgeMedium: {
    backgroundColor: "#fef3c7",
  },

  badgeHard: {
    backgroundColor: "#fee2e2",
  },

  badgeText: {
    fontSize: 7,
    fontWeight: "bold",
    letterSpacing: 0.7,
  },

  // ============================================================
  // SECTIONS
  // ============================================================

  section: {
    marginBottom: 18,
  },

  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 4,
  },

  sectionDescription: {
    fontSize: 8,
    color: "#64748b",
    lineHeight: 1.5,
    marginBottom: 10,
  },

  sectionDivider: {
    height: 1,
    backgroundColor: "#e2e8f0",
    marginBottom: 10,
  },

  // ============================================================
  // SUMMARY
  // ============================================================

  summaryCard: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 10,
    padding: 14,
  },

  summaryType: {
    fontSize: 8,
    color: "#2563eb",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 0.7,
    marginBottom: 7,
  },

  summaryText: {
    fontSize: 9,
    color: "#334155",
    lineHeight: 1.55,
  },

  objectiveBox: {
    backgroundColor: "#eff6ff",
    borderLeftWidth: 3,
    borderLeftColor: "#2563eb",
    borderRadius: 4,
    padding: 9,
    marginTop: 10,
  },

  objectiveLabel: {
    fontSize: 7,
    fontWeight: "bold",
    color: "#2563eb",
    textTransform: "uppercase",
    letterSpacing: 0.6,
    marginBottom: 4,
  },

  objectiveText: {
    fontSize: 8.5,
    color: "#334155",
    lineHeight: 1.5,
  },

  // ============================================================
  // FEATURES
  // ============================================================

  featureGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  featureCard: {
    width: "48%",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 9,
    padding: 11,
  },

  featureName: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#0f172a",
  },

  featureDescription: {
    fontSize: 7.5,
    color: "#64748b",
    lineHeight: 1.45,
    marginTop: 5,
  },

  featureMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },

  featureImportance: {
    fontSize: 6.5,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  featureEvidence: {
    fontSize: 6.5,
    color: "#64748b",
    textTransform: "uppercase",
  },

  // ============================================================
  // TECHNOLOGIES
  // ============================================================

  techGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },

  techBadge: {
    backgroundColor: "#eff6ff",
    borderWidth: 1,
    borderColor: "#bfdbfe",
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },

  techText: {
    fontSize: 7.5,
    color: "#1d4ed8",
    fontWeight: "bold",
  },

  // ============================================================
  // DIMENSIONS
  // ============================================================

  dimensionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  dimensionCard: {
    width: "48%",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 10,
    padding: 12,
  },

  dimensionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  dimensionName: {
    fontSize: 8,
    color: "#475569",
    width: "75%",
  },

  dimensionValue: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#2563eb",
  },

  dimensionBar: {
    height: 4,
    backgroundColor: "#e2e8f0",
    borderRadius: 4,
    marginTop: 9,
    overflow: "hidden",
  },

  dimensionBarFill: {
    height: 4,
    backgroundColor: "#2563eb",
    borderRadius: 4,
  },

  // ============================================================
  // REQUIREMENTS
  // ============================================================

  requirementCard: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 9,
    padding: 11,
    marginBottom: 7,
  },

  requirementTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  requirementName: {
    flex: 1,
    fontSize: 8.5,
    fontWeight: "bold",
    color: "#0f172a",
  },

  requirementType: {
    fontSize: 6.5,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    color: "#2563eb",
    backgroundColor: "#eff6ff",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
  },

  requirementDescription: {
    fontSize: 7.5,
    color: "#64748b",
    lineHeight: 1.45,
    marginTop: 5,
  },

  // ============================================================
  // SUGGESTIONS
  // ============================================================

  suggestionCard: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 9,
    padding: 11,
    marginBottom: 7,
  },

  suggestionName: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#0f172a",
  },

  suggestionDescription: {
    fontSize: 7.5,
    color: "#475569",
    lineHeight: 1.45,
    marginTop: 5,
  },

  suggestionReason: {
    fontSize: 7,
    color: "#64748b",
    lineHeight: 1.4,
    marginTop: 6,
  },

  // ============================================================
  // SKILLS
  // ============================================================

  skillGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },

  skillBadge: {
    backgroundColor: "#f1f5f9",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },

  skillText: {
    fontSize: 7.5,
    color: "#334155",
  },

  // ============================================================
  // SIGNALS
  // ============================================================

  signalGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  signalCard: {
    width: "31.5%",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 8,
    padding: 10,
  },

  signalLabel: {
    fontSize: 6.8,
    color: "#64748b",
    lineHeight: 1.3,
  },

  signalValue: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#2563eb",
    marginTop: 4,
  },

  // ============================================================
  // REASONS
  // ============================================================

  reasonCard: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 8,
    padding: 10,
    marginBottom: 6,
    flexDirection: "row",
    alignItems: "flex-start",
  },

  reasonNumber: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#eff6ff",
    color: "#2563eb",
    fontSize: 7,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 5,
    marginRight: 8,
  },

  reasonText: {
    flex: 1,
    fontSize: 7.8,
    color: "#475569",
    lineHeight: 1.45,
  },

  // ============================================================
  // FOOTER
  // ============================================================

  footer: {
    position: "absolute",
    bottom: 18,
    left: 38,
    right: 38,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 7,
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
  },

  footerText: {
    fontSize: 6.5,
    color: "#94a3b8",
  },
});

export function ReportPDF({ result }: ReportPDFProps) {
  const complexityBadgeStyle =
    result.complexity === "Easy"
      ? styles.badgeEasy
      : result.complexity === "Medium"
        ? styles.badgeMedium
        : styles.badgeHard;

  const dimensions = [
    {
      label: "Technical Complexity",
      value: result.dimensions.technical_complexity,
      max: 25,
    },
    {
      label: "Integration Complexity",
      value: result.dimensions.integration_complexity,
      max: 20,
    },
    {
      label: "Scope Complexity",
      value: result.dimensions.scope_complexity,
      max: 25,
    },
    {
      label: "Data Complexity",
      value: result.dimensions.data_complexity,
      max: 15,
    },
    {
      label: "Security Complexity",
      value: result.dimensions.security_complexity,
      max: 10,
    },
    {
      label: "External Services",
      value: result.dimensions.external_services_complexity,
      max: 25,
    },
  ];

  const signals = [
    {
      label: "Functional Scope",
      value: result.complexity_signals.functional_scope,
    },
    {
      label: "Technical Complexity",
      value: result.complexity_signals.technical_complexity,
    },
    {
      label: "Integration Complexity",
      value: result.complexity_signals.integration_complexity,
    },
    {
      label: "Data Complexity",
      value: result.complexity_signals.data_complexity,
    },
    {
      label: "Security Complexity",
      value: result.complexity_signals.security_complexity,
    },
    {
      label: "External Services",
      value: result.complexity_signals.external_services,
    },
  ];

  return (
    <Document
      title="Project Complexity Report"
      author="Project Complexity Analyzer"
      subject="AI-powered project complexity analysis"
    >
      <Page size="A4" style={styles.page}>
        {/* ======================================================
            HEADER
        ====================================================== */}

        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.brand}>
                Project Complexity{" "}
                <Text style={styles.brandAccent}>Analyzer</Text>
              </Text>

              <Text style={styles.headerSubtitle}>
                AI-powered software project analysis report
              </Text>
              <Text style={styles.projectName}>
                {result.project_name ||
                  result.project_summary.type ||
                  "Untitled project"}
              </Text>
            </View>
            <View>
              <Text style={styles.reportLabel}>Analysis Report</Text>

              <Text style={styles.reportDate}>
                Created: {new Date(result.created_at).toLocaleDateString()}
              </Text>
              <Text style={styles.reportDate}>Project ID: {result.uid}</Text>
            </View>
          </View>
        </View>

        {/* ======================================================
            SCORE
        ====================================================== */}

        <View style={styles.scoreSection}>
          <View style={styles.scoreCard}>
            <Text style={styles.scoreLabel}>Complexity Score</Text>

            <Text style={styles.scoreValue}>{result.score}</Text>

            <Text style={styles.scoreOutOf}>out of 100</Text>

            <Text style={styles.confidence}>
              AI Confidence: {Math.round(result.confidence * 100)}%
            </Text>
          </View>

          <View style={styles.complexityCard}>
            <Text style={styles.complexityLabel}>Overall Complexity</Text>

            <Text style={styles.complexityTitle}>
              {result.complexity} Level
            </Text>

            <Text style={styles.complexityDescription}>
              Based on the project&apos;s technical requirements, functional
              scope, integrations, data handling, security considerations, and
              external services.
            </Text>

            <View style={[styles.badge, complexityBadgeStyle]}>
              <Text style={styles.badgeText}>
                {result.complexity.toUpperCase()}
              </Text>
            </View>
          </View>
        </View>

        {/* ======================================================
            PROJECT SUMMARY
        ====================================================== */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Project Summary</Text>

          <View style={styles.sectionDivider} />

          <View style={styles.summaryCard}>
            <Text style={styles.summaryType}>
              {result.project_summary.type}
            </Text>

            <Text style={styles.summaryText}>
              {result.project_summary.summary}
            </Text>

            <View style={styles.objectiveBox}>
              <Text style={styles.objectiveLabel}>Core Objective</Text>

              <Text style={styles.objectiveText}>
                {result.project_summary.core_objective}
              </Text>
            </View>
          </View>
        </View>

        {/* ======================================================
            AI FEATURES
        ====================================================== */}

        {result.ai_features.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>AI-Identified Features</Text>

            <Text style={styles.sectionDescription}>
              Key functional capabilities identified from the project
              description and requirements.
            </Text>

            <View style={styles.featureGrid}>
              {result.ai_features.map((feature) => (
                <View
                  key={feature.name}
                  style={styles.featureCard}
                  wrap={false}
                >
                  <Text style={styles.featureName}>{feature.name}</Text>

                  <Text style={styles.featureDescription}>
                    {feature.description}
                  </Text>

                  <View style={styles.featureMeta}>
                    <Text
                      style={[
                        styles.featureImportance,
                        {
                          color:
                            feature.importance === "high"
                              ? "#dc2626"
                              : feature.importance === "medium"
                                ? "#d97706"
                                : "#16a34a",
                        },
                      ]}
                    >
                      {feature.importance} importance
                    </Text>

                    <Text style={styles.featureEvidence}>
                      {feature.evidence}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* ======================================================
            TECHNOLOGIES
        ====================================================== */}

        {result.technologies.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Technology Stack</Text>

            <Text style={styles.sectionDescription}>
              Technologies explicitly associated with the project.
            </Text>

            <View style={styles.techGrid}>
              {result.technologies.map((technology) => (
                <View key={technology} style={styles.techBadge}>
                  <Text style={styles.techText}>{technology}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* ======================================================
            COMPLEXITY DIMENSIONS
        ====================================================== */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Complexity Dimensions</Text>

          <Text style={styles.sectionDescription}>
            Contribution of each dimension to the project&apos;s overall
            complexity score.
          </Text>

          <View style={styles.dimensionGrid}>
            {dimensions.map((dimension) => {
              const percentage = Math.min(
                Math.max((dimension.value / dimension.max) * 100, 0),
                100,
              );

              return (
                <View
                  key={dimension.label}
                  style={styles.dimensionCard}
                  wrap={false}
                >
                  <View style={styles.dimensionHeader}>
                    <Text style={styles.dimensionName}>{dimension.label}</Text>

                    <Text style={styles.dimensionValue}>{dimension.value}</Text>
                  </View>

                  <View style={styles.dimensionBar}>
                    <View
                      style={[
                        styles.dimensionBarFill,
                        {
                          width: `${percentage}%`,
                        },
                      ]}
                    />
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* ======================================================
            REQUIREMENTS
        ====================================================== */}

        {result.requirements.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Project Requirements</Text>

            <Text style={styles.sectionDescription}>
              Functional and technical requirements identified during analysis.
            </Text>

            {result.requirements.map((requirement) => (
              <View
                key={requirement.requirement}
                style={styles.requirementCard}
                wrap={false}
              >
                <View style={styles.requirementTop}>
                  <Text style={styles.requirementName}>
                    {requirement.requirement}
                  </Text>

                  <Text style={styles.requirementType}>{requirement.type}</Text>
                </View>

                <Text style={styles.requirementDescription}>
                  {requirement.description}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* ======================================================
            AI RECOMMENDATIONS
        ====================================================== */}

        {result.suggestions.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>AI Recommendations</Text>

            <Text style={styles.sectionDescription}>
              Suggestions generated to help with implementation, architecture,
              and project planning.
            </Text>

            {result.suggestions.map((suggestion) => (
              <View
                key={suggestion.name}
                style={styles.suggestionCard}
                wrap={false}
              >
                <Text style={styles.suggestionName}>{suggestion.name}</Text>

                <Text style={styles.suggestionDescription}>
                  {suggestion.description}
                </Text>

                <Text style={styles.suggestionReason}>
                  Why: {suggestion.reason}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* ======================================================
            SKILLS
        ====================================================== */}

        {result.skills_required.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills Required</Text>

            <Text style={styles.sectionDescription}>
              Technical skills that may be useful for building and maintaining
              this project.
            </Text>

            <View style={styles.skillGrid}>
              {result.skills_required.map((skill) => (
                <View key={skill} style={styles.skillBadge}>
                  <Text style={styles.skillText}>{skill}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* ======================================================
            COMPLEXITY SIGNALS
        ====================================================== */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Complexity Signals</Text>

          <Text style={styles.sectionDescription}>
            Normalized signals used by the analyzer to understand different
            aspects of the project.
          </Text>

          <View style={styles.signalGrid}>
            {signals.map((signal) => (
              <View key={signal.label} style={styles.signalCard} wrap={false}>
                <Text style={styles.signalLabel}>{signal.label}</Text>

                <Text style={styles.signalValue}>
                  {typeof signal.value === "string"
                    ? signal.value.toUpperCase()
                    : signal.value}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* ======================================================
            REASONS
        ====================================================== */}

        {result.reasons.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Why This Complexity Score?</Text>

            <Text style={styles.sectionDescription}>
              Main factors considered when determining the project&apos;s
              overall complexity.
            </Text>

            {result.reasons.map((reason, index) => (
              <View
                key={`${reason}-${index}`}
                style={styles.reasonCard}
                wrap={false}
              >
                <Text style={styles.reasonNumber}>{index + 1}</Text>

                <Text style={styles.reasonText}>{reason}</Text>
              </View>
            ))}
          </View>
        )}

        {/* ======================================================
            FOOTER
        ====================================================== */}

        <View fixed style={styles.footer}>
          <Text style={styles.footerText}>Project Complexity Analyzer</Text>

          <Text
            style={styles.footerText}
            render={({ pageNumber, totalPages }) =>
              `Page ${pageNumber} of ${totalPages}`
            }
          />
        </View>
      </Page>
    </Document>
  );
}
