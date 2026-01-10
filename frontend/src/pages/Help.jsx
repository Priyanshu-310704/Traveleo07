import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

const faqs = [
  {
    q: "How do I create a trip?",
    a: "Go to the Trips page and click on the “New Trip” button. Enter trip details and budget.",
  },
  {
    q: "How does budgeting work?",
    a: "Each trip can have a budget. As you add expenses, TraveLeo automatically calculates total spent and remaining amount.",
  },
  {
    q: "Can I export my expenses?",
    a: "Yes! You can export your expense history as CSV or PDF from the History page.",
  },
  {
    q: "Is my data secure?",
    a: "Your data is protected using authentication, encrypted passwords, and secure APIs.",
  },
  {
    q: "Can I track expenses across all trips?",
    a: "Yes, the History page shows all expenses across every trip with export options.",
  },
];

const Help = () => {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#0F172A] via-[#0B3C3A] to-[#064E3B] text-white">
      <Sidebar />

      <div className="flex flex-col flex-grow pl-64">
        <main className="flex-grow px-8 py-12 max-w-4xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-3xl font-bold mb-8">
              Help &{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                FAQ
              </span>
            </h1>

            <div className="space-y-4">
              {faqs.map((f, i) => (
                <div
                  key={i}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
                >
                  <h3 className="font-semibold text-emerald-400 mb-2">
                    {f.q}
                  </h3>
                  <p className="text-white/70">{f.a}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Help;
