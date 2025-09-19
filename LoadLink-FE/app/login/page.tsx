import { LoginForm } from "@/components/auth/login-form"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <LoginForm />
        <p className="text-center mt-4 text-sm text-muted-foreground">
          {"Don't have an account? "}
          <Link href="/register" className="text-blue-600 hover:underline">
            Sign up here
          </Link>
        </p>
        <p className="text-center mt-2 text-sm text-muted-foreground">
          <Link href="/" className="text-blue-600 hover:underline">
            Back to home
          </Link>
        </p>
      </div>
    </div>
  )
}
