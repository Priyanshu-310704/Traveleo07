import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { getAnalytics } from "../api/analytics.api";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

/* 🌈 NEON PALETTE */
const COLORS = ["#22ffc7", "#00e5ff", "#4f9cff", "#a855f7", "#facc15"];

const Analytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadAnalytics = async () => {
    try {
      const res = await getAnalytics();
      setData(res.data.analytics);
    } catch (err) {
      console.error("Analytics load failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0F172A] text-emerald-400">
        Loading analytics...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#0F172A] via-[#0B3C3A] to-[#064E3B] text-white">
      <Sidebar />

      <div className="flex flex-col flex-grow pl-64">
        <main className="flex-grow px-8 py-12 max-w-7xl mx-auto w-full">
          {/* HEADER */}
          <h1 className="text-3xl font-bold mb-10">
            Spending{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Analytics
            </span>
          </h1>

          {/* KPI CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <KpiCard
              title="Avg Daily Spend"
              value={`₹${data.averageDailySpend}`}
              glow="emerald"
            />

            <KpiCard
              title="Highest Trip Spend"
              value={
                data.highestSpendingTrip
                  ? `₹${data.highestSpendingTrip.total_spent}`
                  : "—"
              }
              subtitle={data.highestSpendingTrip?.title}
              glow="cyan"
            />

            <KpiCard
              title="Categories Used"
              value={data.categoryWise.length}
              glow="violet"
            />

            <KpiCard
              title="Over Budget Trips"
              value={data.budgetOverruns.length}
              glow="red"
            />
          </div>

          {/* CHARTS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* CATEGORY PIE */}
            <GlassCard title="Category-wise Spending">
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={data.categoryWise}
                    dataKey="total"
                    nameKey="category"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={4}
                  >
                    {data.categoryWise.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "rgba(15,23,42,0.95)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: "12px",
                      color: "#fff",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </GlassCard>

            {/* MONTHLY TREND */}
            <GlassCard title="Monthly Spending Trend">
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={data.monthlyTrend}>
                  <CartesianGrid stroke="rgba(255,255,255,0.08)" />
                  <XAxis dataKey="month" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="total"
                    stroke="#22ffc7"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </GlassCard>
          </div>

          {/* SMART WARNINGS */}
          <GlassCard title="⚠ Budget Overrun Warnings">
            {data.budgetOverruns.length === 0 ? (
              <p className="text-white/60 text-sm">
                All trips are within budget. Great job!
              </p>
            ) : (
              <div className="space-y-3">
                {data.budgetOverruns.map((t) => (
                  <div
                    key={t.id}
                    className="flex justify-between items-center p-4 rounded-xl bg-red-500/10 border border-red-500/30"
                  >
                    <div>
                      <p className="font-semibold">{t.title}</p>
                      <p className="text-sm text-white/60">
                        Budget ₹{t.total_budget} • Spent ₹{t.spent}
                      </p>
                    </div>

                    <span className="text-red-400 font-bold">
                      +₹{t.overrun}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </GlassCard>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Analytics;

/* ================= UI HELPERS ================= */

const GlassCard = ({ title, children }) => (
  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
    {title && <h3 className="font-semibold mb-4">{title}</h3>}
    {children}
  </div>
);

const KpiCard = ({ title, value, subtitle, glow }) => {
  const glowMap = {
    emerald: "shadow-emerald-500/30",
    cyan: "shadow-cyan-500/30",
    violet: "shadow-violet-500/30",
    red: "shadow-red-500/30",
  };

  return (
    <div
      className={`
        bg-white/5 backdrop-blur-xl border border-white/10
        rounded-2xl p-6 shadow-lg ${glowMap[glow]}
      `}
    >
      <p className="text-sm text-white/50">{title}</p>
      <h2 className="text-2xl font-bold mt-1">{value}</h2>
      {subtitle && (
        <p className="text-xs text-white/60 mt-1">{subtitle}</p>
      )}
    </div>
  );
};
