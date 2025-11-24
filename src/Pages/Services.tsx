// src/pages/Services.tsx
import React from "react";
import Navbar from "../components/nav/Navbar";
import { Services } from "../components/Services";
import { Footer } from "../components/footer/Footer";

const ServicesPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <Services />
      <Footer />
    </>
  );
};

export default ServicesPage;