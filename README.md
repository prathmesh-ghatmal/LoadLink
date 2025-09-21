
# LoadLink

A **web application for carriers and shippers** where truck drivers (carriers) can create trips and manage vehicles, while shippers can book trips, make payments, and both can review each other.

The platform ensures transparency, secure payments, and real-time booking management.

---



## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [ER Diagram](#er-diagram)
- [Flowchart](#flowchart)
- [Setup & Installation](#setup--installation)
- [API Endpoints](#api-endpoints)
- [Postman Collection](#postman-collection)
- [Usage](#usage)
- [License](#license)



---



## Overview

LoadLink simplifies logistics by connecting shippers with carriers through an intuitive web app. Key workflows include:

- Role-based registration: **Shipper** or **Carrier**
- Carrier can add vehicles and create trips
- Shippers can search trips and request bookings
- Carriers accept/reject bookings
- Payment via QR code after trip completion
- Ratings and reviews for both carriers and shippers

---

## Features

### Shipper
- Register & login
- View dashboard
- Search trips by origin, destination, date, and price
- Create booking requests
- Pay via generated QR codes
- Review carriers after trip completion

### Carrier
- Register & login
- Add and manage vehicles
- Create trips
- Accept or reject bookings
- Mark trip as complete
- Generate payment QR code
- Review shippers after trip completion

### Common
- Role-based access control
- Ratings & reviews system
- Notifications for booking status

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js, TypeScript, Tailwind CSS, Shadcn UI, Axios |
| Backend | Python, FastAPI, SQLAlchemy |
| Database | PostgreSQL |
| API Testing | Postman |
| Deployment | Azure |

---


## ⚙️ Installation & Setup

```bash
# Clone repository
git clone https://github.com/your-username/loadlink.git
cd loadlink

# Backend setup
cd LoadLink-BE
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload

# Frontend setup
cd LoadLink-FE
npm install
npm run dev
```

---

## ER Diagram

```mermaid
erDiagram
    USERS {
        UUID id PK
        String name
        String email
        String role
        String phone
        Numeric rating
        Integer review_count
        Date joined_date
        Text avatar
        String password_hash
    }

    VEHICLES {
        UUID id PK
        UUID carrier_id FK
        String type
        Integer capacity
        String license_plate
        String rc_number
        Boolean is_active
    }

    TRIPS {
        UUID id PK
        UUID carrier_id FK
        UUID vehicle_id FK
        String origin
        String destination
        Date departure_date
        Date arrival_date
        Numeric price_per_kg
        Integer available_capacity
        Integer total_capacity
        String status
        Text description
    }

    BOOKINGS {
        UUID id PK
        UUID trip_id FK
        UUID shipper_id FK
        Integer load_size
        Numeric total_price
        String status
        Date created_date
        Text notes
        Date fulfilled_date
        Date paid_date
        Boolean qr_generated
        Date qr_generated_date
    }

    PAYMENTS {
        UUID id PK
        UUID booking_id FK
        UUID from_user_id FK
        UUID to_user_id FK
        Numeric amount
        String status
        Date created_date
        Date completed_date
    }

    REVIEWS {
        UUID id PK
        UUID from_user_id FK
        UUID to_user_id FK
        UUID booking_id FK
        Integer rating
        Text comment
        Date created_date
    }

    %% Relationships
    USERS ||--o{ VEHICLES : "owns"
    USERS ||--o{ TRIPS : "creates"
    USERS ||--o{ BOOKINGS : "makes"
    USERS ||--o{ PAYMENTS : "sends/receives"
    USERS ||--o{ REVIEWS : "writes/receives"

    VEHICLES ||--o{ TRIPS : "used_in"

    TRIPS ||--o{ BOOKINGS : "has"

    BOOKINGS ||--o{ PAYMENTS : "linked_to"
    BOOKINGS ||--o{ REVIEWS : "reviewed_by"

    PAYMENTS }o--|| USERS : "payer/receiver"
    REVIEWS }o--|| USERS : "author/recipient"

```

---

##  Flowchart 

```mermaid
flowchart TD
    A[Register / Login] --> B{Select Role}
    B -->|Carrier| C[Carrier Dashboard]
    B -->|Shipper| D[Shipper Dashboard]

    %% Carrier flow
    C --> E[Add Vehicle]
    E --> F[Create Trip]
    F --> G[Wait for Booking Requests]
    G --> H{Booking Request Received?}
    H -->|Reject| I[Booking Rejected]
    H -->|Accept| J[Booking Accepted]
    J --> K[Complete Trip]
    K --> L[Generate Payment QR]

    %% Shipper flow
    D --> M[Search Trips]
    M --> N[Send Booking Request]
    N --> O[Wait for Carrier Response]
    O -->|Accepted| P[Pay via QR after Completion]
    O -->|Rejected| Q[Booking Rejected Notification]

    %% Review
    L --> R[Shipper Pays]
    R --> S[Both leave reviews]

```

---

## 🎭 Use Case Diagram

```mermaid
flowchart LR
  actor1((Carrier))
  actor2((Shipper))

  subgraph System[LoadLink Platform]
    UC1[Add Vehicle]
    UC2[Create Trip]
    UC3[Manage Booking]
    UC4[Generate Payment QR]
    UC5[Track Earnings]
    UC6[Book Trip]
    UC7[Make Payment]
    UC8[Track Spendings]
    UC9[Leave Review]
  end

  actor1 --> UC1
  actor1 --> UC2
  actor1 --> UC3
  actor1 --> UC4
  actor1 --> UC5
  actor2 --> UC6
  actor2 --> UC7
  actor2 --> UC8
  actor1 --> UC9
  actor2 --> UC9
```

---

## 📑 Database Dictionary

| Table        | Column              | Type         | Description                                        |
| ------------ | ------------------- | ------------ | -------------------------------------------------- |
| **users**    | id                  | UUID (PK)    | Unique user ID                                     |
|              | name                | String(100)  | Full name                                          |
|              | email               | String(150)  | Unique email                                       |
|              | role                | String(20)   | `shipper` or `carrier`                             |
|              | phone               | String(20)   | Contact number                                     |
|              | rating              | Numeric(2,1) | Average rating                                     |
|              | review\_count       | Integer      | Number of reviews                                  |
|              | joined\_date        | Date         | Account creation date                              |
|              | avatar              | Text         | Profile image                                      |
|              | password\_hash      | String(255)  | Secure hashed password                             |
| **vehicles** | id                  | UUID (PK)    | Vehicle ID                                         |
|              | carrier\_id         | UUID (FK)    | Owner (carrier)                                    |
|              | type                | String(20)   | Truck, van, etc.                                   |
|              | capacity            | Integer      | Load capacity                                      |
|              | license\_plate      | String(20)   | Unique                                             |
|              | rc\_number          | String(50)   | Unique                                             |
|              | is\_active          | Boolean      | Vehicle status                                     |
| **trips**    | id                  | UUID (PK)    | Trip ID                                            |
|              | carrier\_id         | UUID (FK)    | Trip owner                                         |
|              | vehicle\_id         | UUID (FK)    | Assigned vehicle                                   |
|              | origin              | String(255)  | Start point                                        |
|              | destination         | String(255)  | End point                                          |
|              | departure\_date     | Date         | Departure                                          |
|              | arrival\_date       | Date         | Arrival                                            |
|              | price\_per\_kg      | Numeric      | Price                                              |
|              | available\_capacity | Integer      | Remaining load capacity                            |
|              | total\_capacity     | Integer      | Full capacity                                      |
|              | status              | String(20)   | active/completed/cancelled                         |
|              | description         | Text         | Trip details                                       |
| **bookings** | id                  | UUID (PK)    | Booking ID                                         |
|              | trip\_id            | UUID (FK)    | Related trip                                       |
|              | shipper\_id         | UUID (FK)    | Shipper                                            |
|              | load\_size          | Integer      | Size booked                                        |
|              | total\_price        | Numeric      | Price                                              |
|              | status              | String(20)   | pending/accepted/rejected/completed/fulfilled/paid |
|              | created\_date       | Date         | Booking creation                                   |
|              | fulfilled\_date     | Date         | Marked fulfilled                                   |
|              | paid\_date          | Date         | Paid date                                          |
|              | qr\_generated       | Boolean      | QR issued?                                         |
|              | qr\_generated\_date | Date         | When QR was generated                              |
| **payments** | id                  | UUID (PK)    | Payment ID                                         |
|              | booking\_id         | UUID (FK)    | Related booking                                    |
|              | from\_user\_id      | UUID (FK)    | Payer                                              |
|              | to\_user\_id        | UUID (FK)    | Receiver                                           |
|              | amount              | Numeric      | Amount paid                                        |
|              | status              | String(20)   | pending/completed/failed                           |
|              | created\_date       | Date         | Initiated                                          |
|              | completed\_date     | Date         | Completed                                          |
| **reviews**  | id                  | UUID (PK)    | Review ID                                          |
|              | from\_user\_id      | UUID (FK)    | Reviewer                                           |
|              | to\_user\_id        | UUID (FK)    | Reviewee                                           |
|              | booking\_id         | UUID (FK)    | Related booking                                    |
|              | rating              | Integer      | 1–5                                                |
|              | comment             | Text         | Feedback                                           |
|              | created\_date       | Date         | Written on                                         |

---

## API Endpoints

**Auth**

* `POST /auth/register` – Register as shipper or carrier
* `POST /auth/login` – Login and receive access token

**User**

* `GET /users/me` – Get current user details
* `GET /users/{id}` – Get user by ID

**Vehicle (Carrier only)**

* `POST /vehicles` – Add a new vehicle
* `GET /vehicles` – Get all vehicles
* `PUT /vehicles/{id}` – Update vehicle

**Trip (Carrier only)**

* `POST /trips` – Create a trip
* `GET /trips/my` – Get all trips for carrier
* `GET /trips/all` – Get all active trips
* `PUT /trips/{id}` – Update a trip

**Booking (Shipper)**

* `POST /bookings` – Create a booking
* `GET /bookings` – Get all bookings for shipper
* `PUT /bookings/{id}` – Update booking
* `DELETE /bookings/{id}` – Delete booking

**Payment & Review**

* Payment and review endpoints (under development)

---

## Postman Collection

A Postman collection is provided to quickly test all API endpoints.

### Import Collection

1. Download the collection JSON: [LoadLink.postman\_collection.json]([./postman/LoadLink.postman_collection.json](https://.postman.co/workspace/My-Workspace~5ffc3b87-d7b0-43d2-8a5f-6fcba95fbe03/collection/38528958-401b3b4b-5f83-4902-87c1-9dd1ac81e52d?action=share&creator=38528958))
2. Open Postman → Click **Import** → Select JSON → **Open**
3. The collection includes grouped endpoints:

   * Auth
   * User
   * Vehicle
   * Trip
   * Booking
   * Payment & Review

### Usage

* Set **environment variable `Baseurl`** to your backend URL (`http://127.0.0.1:8000`)
* Authenticate using the **Bearer token** from login for protected routes

---

## License

MIT License © 2025 LoadLink



