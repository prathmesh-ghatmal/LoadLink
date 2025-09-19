"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/common/header"
import { Footer } from "@/components/common/footer"
import { SearchForm } from "@/components/common/search-form"
import { TripCard } from "@/components/common/trip-card"
import { FadeIn } from "@/components/ui/fade-in"
import { SlideIn } from "@/components/ui/slide-in"
import { StaggerContainer, StaggerItem } from "@/components/ui/stagger-container"
import { trips } from "@/lib/data"
import { Truck, Package, Shield, Clock, DollarSign, Users, Star, CheckCircle } from "lucide-react"

export default function HomePage() {
  const featuredTrips = trips.slice(0, 3)

  const handleSearch = (searchData: { origin: string; destination: string; date: string }) => {
    const params = new URLSearchParams()
    if (searchData.origin) params.set("origin", searchData.origin)
    if (searchData.destination) params.set("destination", searchData.destination)
    if (searchData.date) params.set("date", searchData.date)

    window.location.href = `/trips?${params.toString()}`
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 to-accent/10 py-20 overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <FadeIn delay={0.2}>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
              Find Loads, Find Trucks
            </h1>
          </FadeIn>

          <FadeIn delay={0.4}>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
              The premier logistics marketplace connecting shippers with
              reliable carriers across the nation. Ship smarter, earn more.
            </p>
          </FadeIn>

          <SlideIn direction="up" delay={0.6}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                size="lg"
                asChild
                className="bg-primary hover:bg-primary/90 transform hover:scale-105 transition-all duration-200"
              >
                <Link href="/register">
                  <Package className="h-5 w-5 mr-2" />I Need to Ship
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground transform hover:scale-105 transition-all duration-200 bg-transparent"
              >
                <Link href="/register">
                  <Truck className="h-5 w-5 mr-2" />I Have a Truck
                </Link>
              </Button>
            </div>
          </SlideIn>

          <FadeIn delay={0.8}>
            <Button asChild>
              <Link href="/register">Get Started</Link>
            </Button>
          </FadeIn>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <FadeIn delay={0.2}>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Why Choose LoadLink?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                We make logistics simple, secure, and profitable for everyone.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <StaggerItem>
              <Card className="text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <CardHeader>
                  <Shield className="h-12 w-12 text-accent mx-auto mb-4 transition-transform duration-300 hover:scale-110" />
                  <CardTitle>Secure & Trusted</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    All carriers are verified and insured. Your cargo is
                    protected every mile of the journey.
                  </CardDescription>
                </CardContent>
              </Card>
            </StaggerItem>

            <StaggerItem>
              <Card className="text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <CardHeader>
                  <Clock className="h-12 w-12 text-accent mx-auto mb-4 transition-transform duration-300 hover:scale-110" />
                  <CardTitle>Real-Time Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Track your shipments in real-time with GPS monitoring and
                    instant notifications.
                  </CardDescription>
                </CardContent>
              </Card>
            </StaggerItem>

            <StaggerItem>
              <Card className="text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <CardHeader>
                  <DollarSign className="h-12 w-12 text-accent mx-auto mb-4 transition-transform duration-300 hover:scale-110" />
                  <CardTitle>Best Rates</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Competitive pricing with transparent fees. No hidden costs,
                    just fair rates.
                  </CardDescription>
                </CardContent>
              </Card>
            </StaggerItem>

            <StaggerItem>
              <Card className="text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <CardHeader>
                  <Users className="h-12 w-12 text-accent mx-auto mb-4 transition-transform duration-300 hover:scale-110" />
                  <CardTitle>24/7 Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Our dedicated support team is available around the clock to
                    assist you.
                  </CardDescription>
                </CardContent>
              </Card>
            </StaggerItem>

            <StaggerItem>
              <Card className="text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <CardHeader>
                  <CheckCircle className="h-12 w-12 text-accent mx-auto mb-4 transition-transform duration-300 hover:scale-110" />
                  <CardTitle>Easy Booking</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Book shipments in minutes with our intuitive platform and
                    mobile app.
                  </CardDescription>
                </CardContent>
              </Card>
            </StaggerItem>

            <StaggerItem>
              <Card className="text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <CardHeader>
                  <Star className="h-12 w-12 text-accent mx-auto mb-4 transition-transform duration-300 hover:scale-110" />
                  <CardTitle>Rated Carriers</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Choose from top-rated carriers with verified reviews and
                    performance history.
                  </CardDescription>
                </CardContent>
              </Card>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Featured Trips Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <FadeIn delay={0.2}>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Available Trips
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Browse some of our featured shipping opportunities.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredTrips.map((trip, index) => (
              <StaggerItem key={trip.id}>
                <div className="transform hover:scale-105 transition-all duration-300">
                  <TripCard trip={trip} showBookButton={false} />
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn delay={0.6}>
            <div className="text-center">
              <Button
                size="lg"
                asChild
                className="transform hover:scale-105 transition-all duration-200"
              >
                <Link href="/register">View All Trips</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <FadeIn delay={0.2}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
          </FadeIn>
          <FadeIn delay={0.4}>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Join thousands of shippers and carriers who trust LoadLink for
              their logistics needs.
            </p>
          </FadeIn>
          <SlideIn direction="up" delay={0.6}>
            <Button
              size="lg"
              variant="secondary"
              asChild
              className="transform hover:scale-105 transition-all duration-200"
            >
              <Link href="/register">Create Your Account Today</Link>
            </Button>
          </SlideIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}
