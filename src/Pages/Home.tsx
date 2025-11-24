// src/pages/Home.tsx
import React from "react";
import Navbar from "../components/nav/Navbar";
import { Hero } from "../components/Hero";
import { Footer } from "../components/footer/Footer";

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Footer />
    </>
  );
};

export default Home;