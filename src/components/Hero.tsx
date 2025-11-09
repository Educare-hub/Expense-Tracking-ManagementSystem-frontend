import homeIMG from "../assets/images/home-image.jpg";

export const Hero = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-stretch gap-10 min-h-[80vh] p-6 md:p-12 bg-gradient-to-tr from-[#0f2027] via-[#203a43] to-[#2c5364] text-white">
        
        {/* Left Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-500">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500 bg-clip-text text-transparent">
            Welcome to ExpensePro!
          </h1>
          <p className="mb-4 text-lg leading-relaxed text-gray-200">
            Take control of your finances with <span className="font-semibold text-cyan-300">ExpensePro</span> — the
            ultimate expense tracking system for individuals and teams.
          </p>
          <p className="mb-4 text-lg leading-relaxed text-gray-200">
            Effortlessly log your daily expenses, monitor spending, and gain insightful reports. Whether managing
            personal finances or a team budget, ExpensePro simplifies tracking and budgeting.
          </p>
          <p className="mb-6 text-lg leading-relaxed text-gray-200">
            Get started today and take the first step towards smarter financial management!
          </p>

          <button className="self-start px-6 py-3 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full font-semibold text-white shadow-lg hover:scale-105 transition-transform duration-300">
            Get Started
          </button>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 flex justify-center items-stretch">
          <div className="w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl flex">
            <img
              src={homeIMG}
              alt="ExpensePro Dashboard"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

      </div>
    </>
  );
};
