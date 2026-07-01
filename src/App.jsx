import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import HeroBanner from './components/HeroBanner.jsx'
import TrendingPlants from './components/TrendingPlants.jsx'
import TopSelling from './components/TopSelling.jsx'
import CustomerReviews from './components/CustomerReviews.jsx'
import O2Plants from './components/O2Plants.jsx'
import Footer from './components/Footer.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import OrdersPage from './pages/OrdersPage.jsx'
import SavedPlantsPage from './pages/SavedPlantsPage.jsx'
import CartPage from './pages/CartPage.jsx'
import AddressesPage from './pages/AddressesPage.jsx'
import ReviewsPage from './pages/ReviewsPage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'
import { trendingPlants, topSellingPlants, reviews } from './data/plants.js'

function HomePage() {
  return (
    <>
      <HeroBanner />
      <TrendingPlants plants={trendingPlants} />
      <TopSelling plants={topSellingPlants} />
      <CustomerReviews reviews={reviews} />
      <O2Plants />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter basename="/plant-store-app">
      <Navbar />
      <main>
        <Routes>
          <Route path="/"              element={<HomePage />} />
          <Route path="/profile"       element={<ProfilePage />} />
          <Route path="/orders"        element={<OrdersPage />} />
          <Route path="/saved"         element={<SavedPlantsPage />} />
          <Route path="/cart"          element={<CartPage />} />
          <Route path="/addresses"     element={<AddressesPage />} />
          <Route path="/my-reviews"    element={<ReviewsPage />} />
          <Route path="/settings"      element={<SettingsPage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
