# 🍕 Pizza Chef Frontend Challenge

A premium, high-performance Single Page Application (SPA) for ordering pizzas, built with **React 18**, **TypeScript**, and **Redux Toolkit**.

![Dashboard Preview](https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Project

To start the development server with HMR:

```bash
npm run dev
```

### Running Tests

We use **Vitest** for a fast and reliable testing experience:

```bash
# Run all tests once
npm run test

# Run tests in UI mode (Interactive)
npm run test:ui
```

### Building for Production

To create an optimized production build:

```bash
npm run build
```

---

## 🏗️ Project Architecture

### Data Structure (`pizzas.json`)

The initial menu is loaded from a static JSON file with the following interface:

- `id`: Unique identifier (string).
- `name`: Pizza name.
- `price`: Base numerical price.
- `ingredients`: Array of strings.
- `category`: Categorization (Vegetarian, Meat, Seafood, Spicy).
- `imageUrl`: High-quality asset link.
- `isRecommended`: Boolean for "Chef's Special" highlighting.

### Order Storage & Persistence

The application uses **Redux Toolkit** for global state management and **LocalStorage** for industry-standard persistence:

- **Current Cart**: Saved in `pizza_current_order`.
- **Order History**: Saved in `pizza_orders` (used for analytics).
- **Custom Pizzas**: New pizzas created via the form are stored in `custom_pizzas`.
- **Filters**: User preferences (search, sorting, prices) are persisted in `pizza_filters`.

---

## 🍕 Key Features

### 💰 Discount Rules

To encourage bulk orders, an automatic logic is applied:

- **3+ pizzas of the same type** in an order trigger a **10% discount** on that specific line item.
- Discounts are updated in real-time in both the **Detail View** and the **Order Summary**.

### 📊 Business Intelligence (Bonus)

A dedicated **Analytics Dashboard** provides visual insights using **Recharts**:

- **Price Distribution**: Comparison of pizza prices across the catalog.
- **Order Distribution**: Analysis of most popular pizzas based on order history.

### 📝 Form Validation

Custom pizza creation is handled by **React Hook Form** and **Zod**:

- Strict validation for required fields, minimum prices, and ingredient counts.
- **Live Preview Card**: See how your pizza looks while you type.

---

## 🎨 Design Decisions

- **Aesthetics**: Modern **Glassmorphism** style using white semi-transparent backgrounds and backdrop-filters.
- **Animations**: Orchestrated with **Framer Motion** for layout transitions and micro-interactions (like adding to cart).
- **Responsive**: Mobile-first design using **Tailwind CSS 4.0**.
- **UX Flow**: Clickable cards for quick access, quantity selectors with instant price feedback, and clear success/error states.

---

## 🛠️ Main Libraries Used

- **Core**: React 18, TypeScript, Vite.
- **State**: Redux Toolkit + React Redux.
- **Router**: React Router DOM 7.
- **Styling**: Tailwind CSS, Lucide React (Icons).
- **Forms**: React Hook Form, Zod.
- **Charts**: Recharts.
- **Animations**: Framer Motion.
- **Testing**: Vitest, React Testing Library, JSDom.

---

Developed as a **Frontend Technical Challenge** focusing on code quality, user experience, and robust architectural patterns.
