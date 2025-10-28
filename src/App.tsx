import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { FeaturedPrograms } from './components/FeaturedPrograms';
import { Testimonials } from './components/Testimonials';
import { AboutPage } from './components/AboutPage';
import { ProductsPage } from './components/ProductsPage';
import { LocationsPage } from './components/LocationsPage';
import { Footer } from './components/Footer';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero />
            <FeaturedPrograms />
            <Testimonials />
          </>
        );
      case 'about':
        return <AboutPage />;
      case 'products':
        return <ProductsPage />;
      case 'locations':
        return <LocationsPage />;
      default:
        return (
          <>
            <Hero />
            <FeaturedPrograms />
            <Testimonials />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}
