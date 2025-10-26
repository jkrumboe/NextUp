# VibeLink Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Mobile App (Expo)                        │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  UI Layer (Tamagui)                                   │   │
│  │  - Auth, Discover, Search, Profile, Media Detail     │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  State Management                                     │   │
│  │  - React Query (server state + cache)                │   │
│  │  - Zustand (UI state)                                 │   │
│  │  - Expo Secure Store (auth tokens)                   │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  API Client (Axios)                                   │   │
│  │  - Auto token refresh                                 │   │
│  │  - Interceptors for auth                              │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTPS/REST
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   Backend API (NestJS)                       │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Controllers (REST + Swagger)                         │   │
│  │  - Auth, Users, Media, Ratings, Links, Tags, etc.    │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Business Logic (Services)                            │   │
│  │  - Authentication & Authorization (JWT)               │   │
│  │  - Recommendation Engine                              │   │
│  │  - Search Integration                                 │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Data Layer (Prisma ORM)                              │   │
│  │  - Type-safe database access                          │   │
│  │  - Migrations & seeding                               │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
           │                │                │
           ▼                ▼                ▼
     PostgreSQL          Redis         Meilisearch
   (Primary DB)     (Cache/Queues)    (Full-text)
```

## Data Flow

### Authentication Flow

```
Mobile App                Backend                 Database
    │                        │                        │
    │──── POST /auth/login ──│                        │
    │                        │─── Verify password ────│
    │                        │◄──── User data ────────│
    │                        │                        │
    │                        │── Generate JWT tokens ─│
    │◄──── Access + Refresh ─│                        │
    │      tokens            │                        │
    │                        │                        │
    │── Secure Store tokens ─│                        │
```

### Media Query Flow (with caching)

```
Mobile App                React Query            Backend
    │                        │                      │
    │── useMediaQuery() ─────│                      │
    │                        │── Check cache ───────│
    │                        │                      │
    │◄──── Cached data ──────│ (if fresh)           │
    │                        │                      │
    │                        │── API request ───────│
    │                        │                      │
    │                        │◄─── Fresh data ──────│
    │◄──── New data ─────────│                      │
    │                        │── Update cache ──────│
```

### Optimistic Update Flow (ratings)

```
Mobile App                React Query            Backend
    │                        │                      │
    │── rate(item, 9) ───────│                      │
    │                        │                      │
    │                        │── Optimistic update ─│
    │◄──── UI updates ───────│ (instant feedback)   │
    │      immediately       │                      │
    │                        │                      │
    │                        │── PUT /media/:id/rating
    │                        │                      │
    │                        │◄─── Confirmed ───────│
    │                        │── Sync cache ────────│
```

## Database Schema

```
┌──────────┐       ┌────────────┐       ┌──────────┐
│   User   │       │ MediaItem  │       │ Creator  │
├──────────┤       ├────────────┤       ├──────────┤
│ id (PK)  │       │ id (PK)    │       │ id (PK)  │
│ email    │       │ type       │       │ name     │
│ username │       │ title      │       │ aliases  │
│ password │       │ year       │       │ bio      │
└──────────┘       │ coverUrl   │       └──────────┘
     │             └────────────┘            │
     │                   │                   │
     │                   │                   │
     ▼                   ▼                   ▼
┌──────────┐       ┌────────────────────┐
│  Rating  │       │ MediaItemCreator   │
├──────────┤       ├────────────────────┤
│ id (PK)  │       │ mediaItemId (FK)   │
│ userId───┼───┐   │ creatorId (FK)─────┼──┐
│ mediaId──┼─┐ │   │ role               │  │
│ score    │ │ │   └────────────────────┘  │
│ review   │ │ │                           │
└──────────┘ │ │   ┌──────────┐            │
             │ └───┤   Link   │            │
             │     ├──────────┤            │
             │     │ id (PK)  │            │
             │     │ fromMedia├────────────┘
             │     │ toMedia  │
             │     │ userId───┼────────────┐
             │     │ linkType │            │
             │     │ strength │            │
             │     └──────────┘            │
             │                             │
             │     ┌──────────┐            │
             └─────┤   Tag    │            │
                   ├──────────┤            │
                   │ id (PK)  │            │
                   │ name     │            │
                   │ kind     │            │
                   └──────────┘            │
                                           │
                   ┌──────────┐            │
                   │ Activity │            │
                   ├──────────┤            │
                   │ id (PK)  │            │
                   │ userId───┼────────────┘
                   │ kind     │
                   │ refId    │
                   └──────────┘
```

## Recommendation Algorithm (v0)

```
Input: Media Item or User Profile
  │
  ├─► Content-Based Filtering
  │   - Tag similarity (cosine)
  │   - Creator overlap
  │   - Year proximity
  │
  ├─► Link Graph Analysis
  │   - User-created links
  │   - Weighted by strength
  │   - Community consensus
  │
  └─► Collaborative Filtering
      - Rating co-occurrence
      - Item-item similarity
      - User-user patterns
  │
  ▼
Hybrid Score =
  0.4 × content_score +
  0.4 × link_score +
  0.2 × collaborative_score
  │
  ▼
Ranked Recommendations with Explanations
```

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Production Server                     │
│                                                          │
│  ┌────────────┐   ┌────────────┐   ┌────────────┐      │
│  │   Nginx    │   │  Backend   │   │ PostgreSQL │      │
│  │  (Reverse  │──▶│   (Node)   │──▶│            │      │
│  │   Proxy)   │   │   Docker   │   │   Docker   │      │
│  └────────────┘   └────────────┘   └────────────┘      │
│        │                 │                              │
│        │          ┌──────┴──────┐                       │
│        │          │             │                       │
│        │     ┌────▼────┐   ┌────▼────┐                 │
│        │     │  Redis  │   │ Meili-  │                 │
│        │     │  Docker │   │ search  │                 │
│        │     └─────────┘   │  Docker │                 │
│        │                   └─────────┘                 │
│        │                                                │
└────────┼────────────────────────────────────────────────┘
         │
         │ HTTPS
         ▼
    Mobile Clients
    (iOS, Android)
```
