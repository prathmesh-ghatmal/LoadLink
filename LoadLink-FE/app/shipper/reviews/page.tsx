"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/contexts/auth-context"
import { reviews, users } from "@/lib/data"
import { Star } from "lucide-react"

export default function ShipperReviewsPage() {
  const { user } = useAuth()
  const userReviews = reviews.filter((r) => r.fromUserId === user?.id)

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">My Reviews</h1>
        <p className="text-muted-foreground">Reviews you've left for carriers.</p>
      </div>

      {userReviews.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {userReviews.map((review) => {
            const carrier = users.find((u) => u.id === review.toUserId)
            if (!carrier) return null

            return (
              <Card key={review.id}>
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={carrier.avatar || "/placeholder.svg"} alt={carrier.name} />
                      <AvatarFallback>{carrier.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{carrier.name}</CardTitle>
                      <div className="flex items-center space-x-1">
                        {renderStars(review.rating)}
                        <span className="text-sm text-muted-foreground ml-2">
                          {new Date(review.createdDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{review.comment}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No reviews yet.</p>
          <p className="text-sm text-muted-foreground mt-2">Complete some bookings to leave reviews for carriers.</p>
        </div>
      )}
    </div>
  )
}
