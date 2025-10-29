import { useState, useEffect } from 'react';
import { Toaster } from './components/ui/sonner';
import { CartProvider } from './components/CartContext';
import { AuthProvider } from './components/AuthContext';
import { Navigation } from './components/Navigation';
import { CartDrawer } from './components/CartDrawer';
import { Hero } from './components/Hero';
import { FeaturedPrograms } from './components/FeaturedPrograms';
import { Testimonials } from './components/Testimonials';
import { AboutPage } from './components/AboutPage';
import { ProductsPage } from './components/ProductsPage';
import { LocationsPage } from './components/LocationsPage';
import { ProgramDetailPage } from './components/ProgramDetailPage';
import { EnrollmentForm } from './components/EnrollmentForm';
import { CheckoutPage } from './components/CheckoutPage';
import { ContactPage } from './components/ContactPage';
import { LoginPage } from './components/LoginPage';
import { Footer } from './components/Footer';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Scroll to top whenever the page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleProgramClick = (programId: string) => {
    setSelectedProgram(programId);
    setCurrentPage('program-detail');
  };

  const handleBackFromProgram = () => {
    setSelectedProgram(null);
    setCurrentPage('home');
  };

  const handleEnrollClick = (programId?: string) => {
    if (programId) {
      setSelectedProgram(programId);
    }
    setCurrentPage('enrollment');
  };

  const handleBackFromEnrollment = () => {
    if (selectedProgram) {
      setCurrentPage('program-detail');
    } else {
      setCurrentPage('home');
    }
  };

  const handleNavigate = (page: string) => {
    if (page === 'enrollment') {
      // Clear selected program when navigating directly from top menu
      setSelectedProgram(null);
    }
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero onNavigate={handleNavigate} />
            <FeaturedPrograms onProgramClick={handleProgramClick} />
            <Testimonials />
          </>
        );
      case 'about':
        return <AboutPage />;
      case 'products':
        return <ProductsPage onNavigate={handleNavigate} />;
      case 'locations':
        return <LocationsPage />;
      case 'contact':
        return <ContactPage />;
      case 'login':
        return <LoginPage onSuccess={() => setCurrentPage('home')} />;
      case 'program-detail':
        return selectedProgram ? (
          <ProgramDetailPage 
            programId={selectedProgram} 
            onBack={handleBackFromProgram}
            onEnroll={handleEnrollClick}
            onNavigate={handleNavigate}
          />
        ) : (
          <>
            <Hero onNavigate={handleNavigate} />
            <FeaturedPrograms onProgramClick={handleProgramClick} />
            <Testimonials />
          </>
        );
      case 'enrollment':
        return (
          <EnrollmentForm 
            preSelectedProgramId={selectedProgram || undefined}
            onBack={handleBackFromEnrollment}
          />
        );
      case 'checkout':
        return (
          <CheckoutPage 
            onBack={() => setCurrentPage('home')}
          />
        );
      default:
        return (
          <>
            <Hero onNavigate={handleNavigate} />
            <FeaturedPrograms onProgramClick={handleProgramClick} />
            <Testimonials />
          </>
        );
    }
  };

  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col">
          <Navigation 
            currentPage={currentPage} 
            onNavigate={handleNavigate}
            onCartClick={() => setIsCartOpen(true)}
          />
          <main className="flex-grow">
            {renderPage()}
          </main>
          <Footer onNavigate={handleNavigate} />
          <CartDrawer 
            open={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            onCheckout={() => setCurrentPage('checkout')}
          />
          <Toaster />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}
