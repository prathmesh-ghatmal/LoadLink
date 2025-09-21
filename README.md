Perfect 🚛 thanks for the detailed models and feature description! I’ll generate a **comprehensive README.md** for your **LoadLink** project. It will include:

* 📌 Project overview & scope
* ⚙️ Tech stack
* 🗂 Features (for carriers & shippers)
* 🛠️ Installation & setup
* 📊 ER diagram (Mermaid)
* 🔄 Flowchart (Mermaid)
* 🎭 Use case diagram (Mermaid)
* 📑 Database dictionary

Here’s a production-ready draft you can drop directly into your repo 👇

---

# LoadLink

A **web application for carriers and shippers** where truck drivers (carriers) can create trips and manage vehicles, while shippers can book trips, make payments, and both can review each other.

The platform ensures transparency, secure payments, and real-time booking management.

---

## 🚀 Tech Stack

**Frontend**

* Next.js (TypeScript)
* Shadcn UI
* Tailwind CSS
* Axios

**Backend**

* FastAPI (Python)
* SQLAlchemy ORM
* PostgreSQL

---

## ✨ Features

### Carrier

* Add/manage vehicles
* Create and manage trips (origin, destination, pricing, availability)
* Accept or reject bookings
* Mark trips as fulfilled
* Generate **payment QR** upon completion
* Track **earnings**
* Write & receive reviews

### Shipper

* Browse and search trips
* Book trips with custom load size
* Pay securely via QR code after fulfillment
* Track **spending history**
* Write & receive reviews

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

## 🗂 ER Diagram

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

## 🔄 Flowchart (Booking Process)

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

✅ This README is **GitHub-ready** — all Mermaid diagrams are compatible.

Would you like me to also **generate PDF/Docx documentation** (with diagrams auto-rendered as images) so you can submit it for evaluation?
