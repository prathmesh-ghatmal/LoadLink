import { Unauthorized } from "@/components/common/unauthorized"

export default function UnauthorizedPage() {
  return (
    <Unauthorized
      message="You don't have permission to access this page. Please check your account role."
      redirectPath="/"
      redirectLabel="Go to Homepage"
    />
  )
}
