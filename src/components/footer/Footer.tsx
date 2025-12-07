// src/components/footer/Footer.tsx
import { motion } from "framer-motion";

export const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="glass bg-linear-to-t from-black via-gray-900 to-purple-900/50 border-t border-white/10 py-16"
    >
      <div className=" text-center place-items-center footer container mx-auto max-w-7xl px-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 text-white">
        <nav>
          <h6 className="footer-title text-amber-400 text-xl font-bold mb-4">Services</h6>
          <a className="link link-hover text-gray-300 hover:text-amber-400">Branding</a>
          <a className="link link-hover text-gray-300 hover:text-amber-400">Design</a>
          <a className="link link-hover text-gray-300 hover:text-amber-400">Marketing</a>
          <a className="link link-hover text-gray-300 hover:text-amber-400">Advertisement</a>
        </nav>

        <nav>
          <h6 className="footer-title text-amber-400 text-xl font-bold mb-4">Company</h6>
          <a className="link link-hover text-gray-300 hover:text-amber-400">About us</a>
          <a className="link link-hover text-gray-300 hover:text-amber-400">Contact</a>
          <a className="link link-hover text-gray-300 hover:text-amber-400">Jobs</a>
          <a className="link link-hover text-gray-300 hover:text-amber-400">Press kit</a>
        </nav>

        <nav>
          <h6 className="footer-title text-amber-400 text-xl font-bold mb-4">Legal</h6>
          <a className="link link-hover text-gray-300 hover:text-amber-400">Terms of use</a>
          <a className="link link-hover text-gray-300 hover:text-amber-400">Privacy policy</a>
          <a className="link link-hover text-gray-300 hover:text-amber-400">Cookie policy</a>
        </nav>

        <nav>
          <h6 className="footer-title text-amber-400 text-xl font-bold mb-4">Social</h6>
          <a className="link link-hover text-gray-300 hover:text-amber-400">Twitter</a>
          <a className="link link-hover text-gray-300 hover:text-amber-400">Instagram</a>
          <a className="link link-hover text-gray-300 hover:text-amber-400">Facebook</a>
          <a className="link link-hover text-gray-300 hover:text-amber-400">GitHub</a>
        </nav>

        <nav>
          <h6 className="footer-title text-amber-400 text-xl font-bold mb-4">Explore</h6>
          <a className="link link-hover text-gray-300 hover:text-amber-400">Features</a>
          <a className="link link-hover text-gray-300 hover:text-amber-400">Enterprise</a>
          <a className="link link-hover text-gray-300 hover:text-amber-400">Security</a>
          <a className="link link-hover text-gray-300 hover:text-amber-400">Pricing</a>
        </nav>

        <nav>
          <h6 className="footer-title text-amber-400 text-xl font-bold mb-4">Apps</h6>
          <a className="link link-hover text-gray-300 hover:text-amber-400">Mac</a>
          <a className="link link-hover text-gray-300 hover:text-amber-400">Windows</a>
          <a className="link link-hover text-gray-300 hover:text-amber-400">iPhone</a>
          <a className="link link-hover text-gray-300 hover:text-amber-400">Android</a>
        </nav>
      </div>

      <div className="text-center mt-12 pt-8 border-t border-white/10">
        <p className="text-amber-400 font-bold text-lg">ExpensePro — Master Your Expenses</p>
        <p className="text-gray-400 text-sm mt-2">&copy; 2025 All Rights Reserved</p>
      </div>
    </motion.footer>
  );
};