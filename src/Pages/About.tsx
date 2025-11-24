import React from "react";
import Navbar from "../components/nav/Navbar";
import Intro from "../components/about/Intro";
import Testimonials from "../components/about/Testimonials";

const About: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-tr from-[#0f2027] via-[#203a43] to-[#2c5364] min-h-screen">
        <div className="container mx-auto px-6 py-16 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500 bg-clip-text text-transparent">
            About ExpensePro
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-12">
            Learn more about our mission to help you take control of your financial future.
          </p>
        </div>
        <div className="container mx-auto px-6 py-12">
          <Intro />
        </div>
        <Testimonials />
      </div>
    </>
  );
};

export default About;