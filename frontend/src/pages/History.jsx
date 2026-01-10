import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import ExpenseTable from "../components/History/ExpenseTable";
import ExportButtons from "../components/History/ExportButtons";
import { getExpenseHistory } from "../api/history.api";

const History = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadHistory = async () => {
    try {
      setLoading(true);
      const res = await getExpenseHistory(); // ❌ no filters
      setExpenses(res.data.expenses || []);
    } catch (err) {
      console.error("History load failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#0F172A] via-[#0B3C3A] to-[#064E3B] text-white">
      <Sidebar />

      <div className="flex flex-col flex-grow pl-64">
        <main className="flex-grow px-8 py-12 max-w-7xl mx-auto w-full">
          <h1 className="text-3xl font-bold mb-6">
            Expense{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              History
            </span>
          </h1>

          {loading ? (
            <p className="text-white/60">Loading expenses...</p>
          ) : (
            <>
              <ExportButtons data={expenses} />
              <ExpenseTable expenses={expenses} />
            </>
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default History;
