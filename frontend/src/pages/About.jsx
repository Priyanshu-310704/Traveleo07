import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#0F172A] via-[#0B3C3A] to-[#064E3B] text-white">
      <Sidebar />

      <div className="flex flex-col flex-grow pl-64">
        <main className="flex-grow px-8 py-12 max-w-4xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
          >
            <h1 className="text-3xl font-bold mb-6">
              About{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                TraveLeo
              </span>
            </h1>

            <p className="text-white/70 leading-relaxed mb-6">
              <strong>TraveLeo</strong> is a smart travel budgeting and expense
              tracking platform designed to help travelers plan better, spend
              wisely, and stay in control of their finances.
            </p>

            <h2 className="text-xl font-semibold mb-2 text-emerald-400">
              Why TraveLeo?
            </h2>
            <p className="text-white/70 mb-6">
              Managing expenses during trips can be stressful. TraveLeo brings
              clarity by combining trip planning, budgeting, real-time expense
              tracking, and visual insights in one place.
            </p>

            <h2 className="text-xl font-semibold mb-2 text-emerald-400">
              Key Features
            </h2>
            <ul className="list-disc list-inside text-white/70 space-y-2 mb-6">
              <li>Create trips with budgets</li>
              <li>Track expenses by category</li>
              <li>Global expense history</li>
              <li>Analytics & spending insights</li>
              <li>Export expenses (CSV / PDF)</li>
            </ul>

            <h2 className="text-xl font-semibold mb-2 text-emerald-400">
              Tech Stack
            </h2>
            <p className="text-white/70 mb-6">
              React • Tailwind CSS • Node.js • Express • PostgreSQL • JWT •
              Nodemailer • Recharts
            </p>

            <h2 className="text-xl font-semibold mb-2 text-emerald-400">
              Built By
            </h2>
            <p className="text-white/70">
              Developed as a full-stack project to demonstrate real-world
              product thinking, clean UI/UX, and scalable backend architecture.
            </p>
          </motion.div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default About;
