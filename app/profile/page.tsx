"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/common/header"
import { Footer } from "@/components/common/footer"
import { RoleGuard } from "@/components/auth/role-guard"
import { useAuth } from "@/contexts/auth-context"
import { useState } from "react"
import { User, Mail, Phone, Calendar, Star, Package, Truck } from "lucide-react"
import { reviews, users } from "@/lib/data"

export default function ProfilePage() {
  const { user, updateUser } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  })

  const receivedReviews = reviews.filter((r) => r.toUserId === user?.id)

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  const handleSave = () => {
    if (user) {
      updateUser({
        ...user,
        ...formData,
      })
      setIsEditing(false)
    }
  }

  return (
    <RoleGuard allowedRoles={["shipper", "carrier"]}>
      <div className="min-h-screen bg-background">
        <Header />

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Profile</h1>
              <p className="text-muted-foreground">Manage your account information and preferences.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Info */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Personal Information</CardTitle>
                      <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
                        {isEditing ? "Cancel" : "Edit"}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-4 mb-6">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                        <AvatarFallback className="text-lg">{user?.name?.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h2 className="text-2xl font-semibold">{user?.name}</h2>
                        <div className="flex items-center space-x-2">
                          {user?.role === "shipper" ? (
                            <Package className="h-4 w-4 text-primary" />
                          ) : (
                            <Truck className="h-4 w-4 text-secondary" />
                          )}
                          <Badge variant={user?.role === "shipper" ? "default" : "secondary"}>
                            {user?.role === "shipper" ? "Shipper" : "Carrier"}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        {isEditing ? (
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          />
                        ) : (
                          <div className="flex items-center space-x-2 p-2 bg-muted rounded">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span>{user?.name}</span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        {isEditing ? (
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          />
                        ) : (
                          <div className="flex items-center space-x-2 p-2 bg-muted rounded">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span>{user?.email}</span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        {isEditing ? (
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          />
                        ) : (
                          <div className="flex items-center space-x-2 p-2 bg-muted rounded">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>{user?.phone}</span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label>Member Since</Label>
                        <div className="flex items-center space-x-2 p-2 bg-muted rounded">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{user?.joinedDate ? new Date(user.joinedDate).toLocaleDateString() : "N/A"}</span>
                        </div>
                      </div>
                    </div>

                    {isEditing && (
                      <div className="flex space-x-2 pt-4">
                        <Button onClick={handleSave}>Save Changes</Button>
                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                          Cancel
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Reviews Received</CardTitle>
                    <p className="text-sm text-muted-foreground">What others are saying about your service</p>
                  </CardHeader>
                  <CardContent>
                    {receivedReviews.length > 0 ? (
                      <div className="space-y-4">
                        {receivedReviews.map((review) => {
                          const reviewer = users.find((u) => u.id === review.fromUserId)
                          if (!reviewer) return null

                          return (
                            <div key={review.id} className="border-b border-muted pb-4 last:border-b-0">
                              <div className="flex items-start space-x-3">
                                <Avatar className="h-10 w-10">
                                  <AvatarImage src={reviewer.avatar || "/placeholder.svg"} alt={reviewer.name} />
                                  <AvatarFallback>{reviewer.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-2">
                                    <div>
                                      <p className="font-medium">{reviewer.name}</p>
                                      <div className="flex items-center space-x-1">
                                        {renderStars(review.rating)}
                                        <span className="text-sm text-muted-foreground ml-2">
                                          {new Date(review.createdDate).toLocaleDateString()}
                                        </span>
                                      </div>
                                    </div>
                                    <Badge variant="outline" className="text-xs">
                                      Booking #{review.bookingId}
                                    </Badge>
                                  </div>
                                  {review.comment && <p className="text-sm text-muted-foreground">{review.comment}</p>}
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">No reviews received yet.</p>
                        <p className="text-sm text-muted-foreground mt-2">
                          Complete some {user?.role === "shipper" ? "bookings" : "deliveries"} to start receiving
                          reviews.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Stats Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Rating & Reviews</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center space-y-2">
                      <div className="flex items-center justify-center space-x-1">
                        <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                        <span className="text-2xl font-bold">{user?.rating?.toFixed(1) || "0.0"}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{user?.reviewCount || 0} reviews</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {user?.role === "shipper" ? (
                      <>
                        <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                          <a href="/shipper/dashboard">
                            <Package className="h-4 w-4 mr-2" />
                            Go to Dashboard
                          </a>
                        </Button>
                        <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                          <a href="/shipper/search">
                            <Package className="h-4 w-4 mr-2" />
                            Search Trips
                          </a>
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                          <a href="/carrier/dashboard">
                            <Truck className="h-4 w-4 mr-2" />
                            Go to Dashboard
                          </a>
                        </Button>
                        <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                          <a href="/carrier/create-trip">
                            <Truck className="h-4 w-4 mr-2" />
                            Create Trip
                          </a>
                        </Button>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </RoleGuard>
  )
}
