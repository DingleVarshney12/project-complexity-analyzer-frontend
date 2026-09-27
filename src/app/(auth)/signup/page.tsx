import SignupForm from "@/features/auth/components/signup-form";

export default function SignupPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-12 sm:px-6">
      <div className="w-full max-w-md">
        <SignupForm />
      </div>
    </main>
  );
}