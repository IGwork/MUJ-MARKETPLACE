# MUJ Marketplace - College Marketplace Frontend

A modern, professional React-based marketplace platform for Manipal University Jaipur students to buy and sell items.

## 🎯 Features

- **User Authentication**: Email-based login with college email validation (@jaipur.manipal.edu)
- **Browse Items**: Grid view with advanced filtering and search
- **Sell Items**: Easy-to-use form to list items with image preview
- **My Listings**: Manage your own items with edit and delete options
- **Categories**: Books, Electronics, Clothing, Furniture, Tickets, Miscellaneous
- **Responsive Design**: Mobile-friendly interface
- **Modern UI**: Built with Tailwind CSS for a professional look

## 🛠️ Tech Stack

- **React 18** - UI library with functional components and hooks
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Modern icon library
- **Context API** - State management

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── ItemCard.js
│   ├── CategoryCard.js
│   ├── Navbar.js
│   └── ProtectedRoute.js
├── pages/               # Page components
│   ├── LoginPage.js
│   ├── HomePage.js
│   ├── BrowseItemsPage.js
│   ├── SellItemPage.js
│   └── MyListingsPage.js
├── context/             # State management
│   └── MarketplaceContext.js
├── data/                # Dummy data
│   └── dummyData.js
├── hooks/               # Custom hooks
│   └── useMarketplace.js
├── App.js               # Main app component
├── index.js             # Entry point
└── index.css            # Global styles
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
cd MUJ-Marketplace
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

The app will open at `http://localhost:3000`

## 📝 Demo Credentials

To test the application, use:
- **Email**: `student@jaipur.manipal.edu`
- **Password**: `demo123`

Any email ending with `@jaipur.manipal.edu` will be accepted.

## 🎨 Design Features

- **Color Scheme**:
  - Primary: Orange (#f97316)
  - Secondary: Dark Blue/Grey (#1e293b, #475569)
  - Accent: Green for success states

- **Typography**: Poppins font family
- **Responsive**: Mobile-first design approach
- **Animations**: Smooth transitions and hover effects

## 📱 Pages

### 1. Login Page
- Email validation for college email
- Password input with validation
- Professional UI with demo credentials display

### 2. Home Page
- Welcome section with user greeting
- Featured items showcase
- Category browsing cards
- Quick stats section
- Call-to-action buttons

### 3. Browse Items Page
- Grid layout (1-3 columns based on screen size)
- Advanced filtering:
  - Category filter
  - Price range slider
  - Search functionality
- Item cards with seller info
- Responsive sidebar filters

### 4. Sell Item Page
- Intuitive form with validation
- Image upload with preview
- Category selection with auto-theme images
- Negotiable price option
- Character limits and helper text

### 5. My Listings Page
- View all your listings
- Statistics (total listings, total value)
- Edit and delete functionality
- Listing status and view counts
- Empty state with CTA

## 🔧 State Management

Uses React Context API for:
- User authentication state
- Items list (global inventory)
- User listings
- Current user information

## 🔒 Features

- Protected routes (login required)
- Email validation
- Form validation
- Smooth loading states
- Success confirmations
- Empty states with CTAs

## 🚧 Future Enhancements

- Backend integration with Node.js/Express
- MongoDB database
- Real authentication (JWT)
- Payment integration
- Messaging between buyers and sellers
- User ratings and reviews
- Advanced search with wishlist
- Image hosting

## 📄 License

This project is for educational purposes.

## 👤 Author

MUJ Marketplace Team
