"use client"

import Puzzle from './components/puzzle';
import HeroSection from './components/HeroSection';
import Leaderboard from './components/LeaderBoard';
import Sponsors from './components/Sponsors';

const Home = () => {
  return (
    <div>
      <HeroSection />
      <Leaderboard />
      <Sponsors />

      {/* <Puzzle /> */}
    </div>
  );
};

export default Home;
