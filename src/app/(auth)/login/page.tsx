import LoginForm from "@/features/auth/components/login-form";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-12 sm:px-6">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </main>
  );
}