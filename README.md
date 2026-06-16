# Skyora — Client (Front-End)

The front-end of **Skyora**, a full-stack travel booking platform for searching and booking **flights**, **hotels**, and **flight + hotel bundles**. Built with **React**, **Vite**, and **Tailwind CSS**, it consumes the Skyora REST API and provides both a customer-facing booking experience and a role-based admin dashboard.

> Back-end repository: [skyora-server](https://github.com/obada-halaybeh/skyora-server)

---

## Tech Stack

| Layer      | Technology                         |
| ---------- | ---------------------------------- |
| Framework  | React 18                           |
| Build tool | Vite                               |
| Styling    | Tailwind CSS                       |
| Routing    | React Router                       |
| Icons      | lucide-react                       |
| Fonts      | Plus Jakarta Sans                  |
| Data       | `fetch` + `useState` / `useEffect` |
| Session    | `localStorage`                     |

---

## Getting Started

### Prerequisites

- **Node.js** 18+ and npm
- The [Skyora back-end](https://github.com/obada-halaybeh/skyora-server) running locally (default: `http://localhost:5000`)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/obada-halaybeh/skyora-client.git
cd skyora-client

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app runs at **http://localhost:5173** by default.

### Configuration

The API base URL is defined in `src/config.js`:

```js
export const API = "http://localhost:5000/api";
```

Update this value when pointing the client at a deployed back-end.

### Available Scripts

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start the Vite development server        |
| `npm run build`   | Build the production bundle into `dist/` |
| `npm run preview` | Preview the production build locally     |
| `npm run lint`    | Run ESLint                               |

---

## Project Structure

```
skyora-client/
├── public/                 # Static assets (favicon, icons)
├── src/
│   ├── assets/             # Images
│   ├── components/
│   │   ├── admin/          # AdminLayout, AdminSidebar, DataTable, Drawer
│   │   ├── auth/           # SkyoraWordmark
│   │   ├── common/         # Button, Input, FilterSidebar, BookingPanel, ReviewsSection
│   │   ├── flights/        # FlightCard, AirlineLogo, SeatMap
│   │   ├── home/           # SearchPill, BundleCard
│   │   ├── hotels/         # HotelCard, Stars, WeatherWidget
│   │   ├── layout/         # TopNav, Footer
│   │   └── trips/          # TripCard, ReviewModal
│   ├── pages/
│   │   ├── admin/          # AdminFlights, AdminHotels, AdminBundles, AdminBookings, AdminUsers
│   │   ├── Home.jsx
│   │   ├── Auth.jsx
│   │   ├── Flights.jsx / Hotels.jsx / Bundles.jsx
│   │   ├── FlightDetail.jsx / HotelDetail.jsx / BundleDetail.jsx
│   │   ├── Checkout.jsx
│   │   ├── Confirmation.jsx
│   │   └── Trips.jsx
│   ├── App.jsx             # Routes
│   ├── config.js           # API base URL
│   ├── main.jsx            # App entry
│   └── index.css           # Tailwind directives + global styles
├── tailwind.config.js      # Design tokens (colors, fonts, gradient, shadows)
├── vite.config.js
└── package.json
```

---

## Routes

| Path                      | Page                     | Access   |
| ------------------------- | ------------------------ | -------- |
| `/`                       | Home                     | Public   |
| `/auth`                   | Sign in / Create account | Public   |
| `/flights`                | Flight listing + filters | Customer |
| `/hotels`                 | Hotel listing + filters  | Customer |
| `/bundles`                | Bundle listing           | Customer |
| `/flights/:id`            | Flight detail            | Customer |
| `/hotels/:id`             | Hotel detail             | Customer |
| `/bundles/:id`            | Bundle detail            | Customer |
| `/checkout/:type/:id`     | Adaptive 3-step checkout | Customer |
| `/confirmation/:type/:id` | Booking confirmation     | Customer |
| `/trips`                  | My Trips dashboard       | Customer |
| `/admin/flights`          | Manage flights           | Admin    |
| `/admin/hotels`           | Manage hotels            | Admin    |
| `/admin/bundles`          | Manage bundles           | Admin    |
| `/admin/bookings`         | Manage bookings          | Admin    |
| `/admin/users`            | Manage users             | Admin    |

---

## Key Features

- **Authentication & role-based routing** — on login the user is stored in `localStorage`; admins are routed to the dashboard, customers to the home page.
- **Dynamic catalogue** — flights, hotels, and bundles are fetched live from the API and rendered into reusable cards.
- **Live filtering** — price slider and dynamically-derived checkbox filters (e.g. airlines built from the loaded data) update results instantly without a page reload.
- **Adaptive checkout** — a 3-step flow that changes by item type (seat selection for flights, room selection for hotels, both for bundles), with progress persisted to `localStorage`.
- **My Trips dashboard** — bookings grouped into Upcoming / Past / Cancelled, with cancel and review (star rating) flows.
- **Admin dashboard** — full CRUD for every catalogue type via a shared `DataTable` and `Drawer`, behind role-based access.
- **Third-party integration** — a `WeatherWidget` shows live weather for a hotel's destination.

---

## Design System

Brand tokens are centralised in `tailwind.config.js`:

| Token      | Value     | Use                |
| ---------- | --------- | ------------------ |
| `rausch`   | `#ff385c` | Primary actions    |
| `magenta`  | `#92174d` | Gradient end       |
| `luxe`     | `#460479` | Accent             |
| `ink`      | `#222222` | Primary text       |
| `ash`      | `#6a6a6a` | Secondary text     |
| `hairline` | `#dddddd` | Borders            |
| `cloud`    | `#f7f7f7` | Subtle backgrounds |
| `canvas`   | `#ffffff` | Page background    |

Typography uses **Plus Jakarta Sans**, and the brand gradient (`skyora-gradient`) runs `#ff385c → #e00b41 → #92174d`.

---

## Deployment

The client is a static SPA and can be deployed to **Vercel** or **Netlify**:

1. Connect the GitHub repository.
2. Set the build command to `npm run build` and the output directory to `dist`.
3. Update `src/config.js` (or a `VITE_API_URL` environment variable) to the deployed back-end URL.

**Deployed URL:** _(add your Vercel/Netlify URL here)_

---

## License

This project was developed as part of the _Special Topics in Computer Science 1_ course at Al Hussein Technical University (HTU).
