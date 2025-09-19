// Mock data for LoadLink logistics marketplace

export type UserRole = "shipper" | "carrier" | "guest"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  phone: string
  rating: number
  reviewCount: number
  joinedDate: string
  avatar?: string
}

export interface Vehicle {
  id: string;
  carrier_id: string;
  type: "truck" | "van" | "trailer" | "container";
  capacity: number; // in kg
  license_plate: string;
  rc_number: string;
  is_active: boolean;
}

export interface Trip {
  id: string
  carrier_id: string
  vehicle_id: string
  origin: string
  destination: string
  departure_date: string
  arrival_date: string
  price_per_kg: number
  available_capacity: number
  total_capacity: number
  status: "active" | "completed" | "cancelled"
  description?: string
}

export interface Booking {
  id: string
  tripId: string
  shipperId: string
  loadSize: number // in kg
  totalPrice: number
  status: "pending" | "accepted" | "rejected" | "completed" | "fulfilled" | "paid"
  createdDate: string
  notes?: string
  fulfilledDate?: string
  paidDate?: string
  qrGenerated?: boolean
  qrGeneratedDate?: string
}

export interface Payment {
  id: string
  bookingId: string
  fromUserId: string
  toUserId: string
  amount: number
  status: "pending" | "completed" | "failed"
  createdDate: string
  completedDate?: string
}

export interface Review {
  id: string
  fromUserId: string
  toUserId: string
  bookingId: string
  rating: number
  comment: string
  createdDate: string
}

// Mock Users
export const users: User[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john@example.com",
    role: "shipper",
    phone: "+1-555-0101",
    rating: 4.8,
    reviewCount: 23,
    joinedDate: "2023-01-15",
    avatar: "/professional-man.png",
  },
  {
    id: "2",
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "carrier",
    phone: "+1-555-0102",
    rating: 4.9,
    reviewCount: 45,
    joinedDate: "2022-08-20",
    avatar: "/truck-driver.jpg",
  },
  {
    id: "3",
    name: "Sarah Wilson",
    email: "sarah@example.com",
    role: "shipper",
    phone: "+1-555-0103",
    rating: 4.7,
    reviewCount: 18,
    joinedDate: "2023-03-10",
    avatar: "/confident-business-woman.png",
  },
  {
    id: "4",
    name: "David Brown",
    email: "david@example.com",
    role: "carrier",
    phone: "+1-555-0104",
    rating: 4.6,
    reviewCount: 32,
    joinedDate: "2022-11-05",
    avatar: "/truck-driver.jpg",
  },
]

// Mock Vehicles
export const vehicles: Vehicle[] = [
  {
    id: "1",
    carrier_id: "2",
    type: "truck",
    capacity: 5000,
    license_plate: "TX-1234",
    rc_number: "RC123456",
    is_active: true,
  },
  {
    id: "2",
    carrier_id: "2",
    type: "trailer",
    capacity: 15000,
    license_plate: "TX-5678",
    rc_number: "RC789012",
    is_active: true,
  },
  {
    id: "3",
    carrier_id: "4",
    type: "van",
    capacity: 2000,
    license_plate: "CA-9876",
    rc_number: "RC345678",
    is_active: true,
  },
];

// Mock Trips
export const trips: Trip[] = [
  {
    id: "1",
    carrier_id: "2",
    vehicle_id: "1",
    origin: "Los Angeles, CA",
    destination: "Phoenix, AZ",
    departure_date: "2024-01-20",
    arrival_date: "2024-01-21",
    price_per_kg: 2.5,
    available_capacity: 3000,
    total_capacity: 5000,
    status: "active",
    description: "Direct route, experienced driver",
  },
  {
    id: "2",
    carrier_id: "2",
    vehicle_id: "2",
    origin: "Houston, TX",
    destination: "Dallas, TX",
    departure_date: "2024-01-22",
    arrival_date: "2024-01-22",
    price_per_kg: 1.8,
    available_capacity: 12000,
    total_capacity: 15000,
    status: "active",
    description: "Same day delivery available",
  },
  {
    id: "3",
    carrier_id: "4",
    vehicle_id: "3",
    origin: "San Francisco, CA",
    destination: "Sacramento, CA",
    departure_date: "2024-01-25",
    arrival_date: "2024-01-25",
    price_per_kg: 3.2,
    available_capacity: 1500,
    total_capacity: 2000,
    status: "active",
    description: "Small loads welcome",
  },
]

// Mock Bookings
export const bookings: Booking[] = [
  {
    id: "1",
    tripId: "1",
    shipperId: "1",
    loadSize: 1000,
    totalPrice: 2500,
    status: "pending",
    createdDate: "2024-01-18",
    notes: "Fragile items, handle with care",
  },
  {
    id: "2",
    tripId: "2",
    shipperId: "3",
    loadSize: 2000,
    totalPrice: 3600,
    status: "accepted",
    createdDate: "2024-01-19",
    notes: "Standard packaging",
  },
  {
    id: "3",
    tripId: "1",
    shipperId: "3",
    loadSize: 500,
    totalPrice: 1250,
    status: "paid",
    createdDate: "2024-01-17",
    fulfilledDate: "2024-01-20",
    paidDate: "2024-01-20",
    qrGenerated: true,
    qrGeneratedDate: "2024-01-20",
    notes: "Electronics shipment",
  },
  {
    id: "4",
    tripId: "3",
    shipperId: "1",
    loadSize: 300,
    totalPrice: 960,
    status: "fulfilled",
    createdDate: "2024-01-19",
    fulfilledDate: "2024-01-21",
    qrGenerated: true,
    qrGeneratedDate: "2024-01-21",
    notes: "Awaiting payment",
  },
]

// Mock Reviews
export const reviews: Review[] = [
  {
    id: "1",
    fromUserId: "1",
    toUserId: "2",
    bookingId: "1",
    rating: 5,
    comment: "Excellent service, on time delivery!",
    createdDate: "2024-01-15",
  },
  {
    id: "2",
    fromUserId: "2",
    toUserId: "1",
    bookingId: "1",
    rating: 4,
    comment: "Good communication, well packaged items.",
    createdDate: "2024-01-15",
  },
]

// Mock Payments
export const payments: Payment[] = [
  {
    id: "1",
    bookingId: "3",
    fromUserId: "3",
    toUserId: "2",
    amount: 1250,
    status: "completed",
    createdDate: "2024-01-20",
    completedDate: "2024-01-20",
  },
]

// Data manipulation functions for real-time updates
export const dataActions = {
  // Vehicle actions
  updateVehicle: (vehicleId: string, updates: Partial<Vehicle>) => {
    const index = vehicles.findIndex((v) => v.id === vehicleId)
    if (index !== -1) {
      vehicles[index] = { ...vehicles[index], ...updates }
    }
  },

  deleteVehicle: (vehicleId: string) => {
    const index = vehicles.findIndex((v) => v.id === vehicleId)
    if (index !== -1) {
      vehicles.splice(index, 1)
    }
  },

  // Trip actions
  updateTrip: (tripId: string, updates: Partial<Trip>) => {
    const index = trips.findIndex((t) => t.id === tripId)
    if (index !== -1) {
      trips[index] = { ...trips[index], ...updates }
    }
  },

  deleteTrip: (tripId: string) => {
    const index = trips.findIndex((t) => t.id === tripId)
    if (index !== -1) {
      trips.splice(index, 1)
    }
  },

  // Booking actions
  updateBooking: (bookingId: string, updates: Partial<Booking>) => {
    const index = bookings.findIndex((b) => b.id === bookingId)
    if (index !== -1) {
      bookings[index] = { ...bookings[index], ...updates }
    }
  },

  generatePaymentQR: (bookingId: string) => {
    const index = bookings.findIndex((b) => b.id === bookingId)
    if (index !== -1) {
      bookings[index] = {
        ...bookings[index],
        qrGenerated: true,
        qrGeneratedDate: new Date().toISOString().split("T")[0],
      }
    }
  },

  processPayment: (bookingId: string) => {
    const booking = bookings.find((b) => b.id === bookingId)
    if (booking) {
      // Update booking status to paid
      dataActions.updateBooking(bookingId, {
        status: "paid",
        paidDate: new Date().toISOString().split("T")[0],
      })

      // Create payment record
      const payment: Payment = {
        id: `payment-${Date.now()}`,
        bookingId,
        fromUserId: booking.shipperId,
        toUserId: trips.find((t) => t.id === booking.tripId)?.carrier_id || "",
        amount: booking.totalPrice,
        status: "completed",
        createdDate: new Date().toISOString().split("T")[0],
        completedDate: new Date().toISOString().split("T")[0],
      }
      payments.push(payment)
    }
  },

  // Payment actions
  addPayment: (payment: Payment) => {
    payments.push(payment)
  },

  // Review actions
  addReview: (review: Review) => {
    reviews.push(review)

    // Update user rating
    const toUser = users.find((u) => u.id === review.toUserId)
    if (toUser) {
      const userReviews = reviews.filter((r) => r.toUserId === review.toUserId)
      const avgRating = userReviews.reduce((sum, r) => sum + r.rating, 0) / userReviews.length
      toUser.rating = Math.round(avgRating * 10) / 10
      toUser.reviewCount = userReviews.length
    }
  },
}
