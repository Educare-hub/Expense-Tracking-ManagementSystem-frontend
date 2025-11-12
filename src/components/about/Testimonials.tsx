import { testimonialsData } from "./testimonialdata";

const Testimonials = () => {
  return (
    <section className="py-20 bg-gradient-to-tr from-[#0f2027] via-[#203a43] to-[#2c5364] text-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500 bg-clip-text text-transparent drop-shadow-lg">
          What Our Users Say
        </h2>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {testimonialsData.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-8 flex flex-col items-center text-center border border-white/20 hover:shadow-cyan-400/40 hover:scale-105 transition-all duration-500"
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-24 h-24 rounded-full object-cover mb-5 border-4 border-cyan-400 shadow-lg"
              />
              <p className="text-gray-100 italic mb-5 leading-relaxed">
                “{testimonial.content}”
              </p>
              <div>
                <h3 className="font-bold text-lg text-cyan-300">
                  {testimonial.name}
                </h3>
                <span className="text-sm text-gray-300">
                  {testimonial.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
