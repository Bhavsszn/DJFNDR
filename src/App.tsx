import React, { useState } from 'react';
import { Header } from './components/Header';
import { WelcomeScreen } from './components/WelcomeScreen';
import { SearchScreen } from './components/SearchScreen';
import { SearchResults } from './components/SearchResults';
import { DJProfile } from './components/DJProfile';
import { BookingModal } from './components/BookingModal';
import { mockDJs, mockReviews } from './data/mockData';
import { DJ, SearchFilters } from './types';

type Screen = 'welcome' | 'search' | 'results' | 'profile';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [searchFilters, setSearchFilters] = useState<SearchFilters | null>(null);
  const [selectedDJ, setSelectedDJ] = useState<DJ | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const handleSearchByLocation = () => {
    setCurrentScreen('search');
  };

  const handleSearchByName = () => {
    // For now, redirect to location search
    setCurrentScreen('search');
  };

  const handleSearch = (filters: SearchFilters) => {
    setSearchFilters(filters);
    setCurrentScreen('results');
  };

  const handleSelectDJ = (dj: DJ) => {
    setSelectedDJ(dj);
    setCurrentScreen('profile');
  };

  const handleBook = (dj: DJ) => {
    setSelectedDJ(dj);
    setShowBookingModal(true);
  };

  const handleBookingConfirm = (bookingDetails: any) => {
    console.log('Booking confirmed:', bookingDetails);
    setShowBookingModal(false);
    // Here you would typically send the booking request to your backend
    alert('Booking request sent successfully! The DJ will contact you soon.');
  };

  const handleBack = () => {
    switch (currentScreen) {
      case 'search':
        setCurrentScreen('welcome');
        break;
      case 'results':
        setCurrentScreen('search');
        break;
      case 'profile':
        setCurrentScreen('results');
        break;
    }
  };

  const getDJReviews = (djId: string) => {
    return mockReviews.filter(review => review.djId === djId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentScreen !== 'welcome' && <Header />}
      
      {currentScreen === 'welcome' && (
        <WelcomeScreen
          onSearchByLocation={handleSearchByLocation}
          onSearchByName={handleSearchByName}
        />
      )}

      {currentScreen === 'search' && (
        <SearchScreen
          onSearch={handleSearch}
          onBack={handleBack}
        />
      )}

      {currentScreen === 'results' && searchFilters && (
        <SearchResults
          djs={mockDJs}
          filters={searchFilters}
          onBack={handleBack}
          onSelectDJ={handleSelectDJ}
        />
      )}

      {currentScreen === 'profile' && selectedDJ && (
        <DJProfile
          dj={selectedDJ}
          reviews={getDJReviews(selectedDJ.id)}
          onBack={handleBack}
          onBook={handleBook}
        />
      )}

      {showBookingModal && selectedDJ && (
        <BookingModal
          dj={selectedDJ}
          isOpen={showBookingModal}
          onClose={() => setShowBookingModal(false)}
          onConfirm={handleBookingConfirm}
        />
      )}
    </div>
  );
}

export default App;