import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"

interface UnauthorizedProps {
  message?: string
  redirectPath?: string
  redirectLabel?: string
}

export function Unauthorized({
  message = "You don't have permission to access this page.",
  redirectPath = "/",
  redirectLabel = "Go Home",
}: UnauthorizedProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
          <CardTitle>Access Denied</CardTitle>
          <CardDescription>{message}</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Button asChild>
            <Link href={redirectPath}>{redirectLabel}</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
