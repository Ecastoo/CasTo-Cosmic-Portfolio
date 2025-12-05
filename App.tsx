import React from 'react';
import Deck from './components/Deck';
import StarBackground from './components/StarBackground';

const App: React.FC = () => {
  return (
    <div className="antialiased text-white font-inter h-screen w-screen overflow-hidden selection:bg-cosmic-pink selection:text-white">
      <StarBackground />
      <div className="relative z-10 w-full h-full">
        <Deck />
      </div>
      
      {/* Decorative Overlay Vignette */}
      <div className="fixed inset-0 pointer-events-none z-20 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(11,0,51,0.4)_100%)]" />
    </div>
  );
};

export default App;