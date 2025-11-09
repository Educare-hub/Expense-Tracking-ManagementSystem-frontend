import serviceIMG from "../assets/images/services.jpg";

export const Services = () => {
  return (
    <section className="bg-gradient-to-tr from-[#0f2027] via-[#203a43] to-[#2c5364] text-white py-16 px-6 md:px-12">
      <div className="flex flex-col md:flex-row items-stretch justify-between gap-10">
        
        {/* Left - Image */}
        <div className="w-full md:w-1/2 flex justify-center items-stretch">
          <div className="w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl flex">
            <img
              src={serviceIMG}
              alt="Our services"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Right - Content */}
        <div className="w-full md:w-1/2 flex flex-col justify-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-500">
          <h2 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500 bg-clip-text text-transparent">
            Our Services
          </h2>
          <p className="mb-6 text-gray-200 text-lg leading-relaxed">
            Discover the range of services <span className="font-semibold text-cyan-300">ExpensePro</span> offers to help
            you track and manage your expenses effectively. From expense logging to insightful reporting, we make financial management easy!
          </p>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="table text-gray-200">
              <thead>
                <tr className="text-cyan-300 text-lg">
                  <th>#</th>
                  <th>Service</th>
                  <th>Benefit</th>
                  <th>Example</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-white/10">
                  <th>1</th>
                  <td>Expense Tracking</td>
                  <td>Monitor your daily spending</td>
                  <td>Groceries, transport, bills</td>
                </tr>
                <tr className="hover:bg-white/10">
                  <th>2</th>
                  <td>Recurring Payments</td>
                  <td>Automatically manage regular expenses</td>
                  <td>Subscriptions, rent, utilities</td>
                </tr>
                <tr className="hover:bg-white/10">
                  <th>3</th>
                  <td>Financial Reports</td>
                  <td>Get insights and summaries of your expenses</td>
                  <td>Monthly or yearly spending charts</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* CTA Button */}
          <button className="mt-6 px-6 py-3 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full font-semibold text-white shadow-lg hover:scale-105 transition-transform duration-300">
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
};
