type AnalysisErrorProps = {
  message: string;
  details: string;
};

export default function AnalysisError({
  message,
  details,
}: AnalysisErrorProps) {
  return (
    <div
      role="alert"
      className="rounded-lg border border-red-400/20 bg-red-500/5 p-4 text-sm text-red-300"
    >
      <p className="font-medium">Analysis couldn’t be completed</p>
      <p className="mt-1">{message}</p>
      <p className="mt-2 text-red-200/70">{details}</p>
    </div>
  );
}
