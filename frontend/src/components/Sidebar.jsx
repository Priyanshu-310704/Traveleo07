import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Brand from "./Brand";
import {
  FiHome,
  FiMap,
  FiUser,
  FiLogOut,
  FiClock,
  FiBarChart2,
  FiChevronLeft,
  FiChevronRight,
  FiInfo,
  FiHelpCircle,
} from "react-icons/fi";
import { motion } from "framer-motion";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (path) => location.pathname === path;

  const linkClass = (active) => `
    flex items-center gap-3 px-4 py-3 rounded-xl
    text-sm font-medium transition
    ${
      active
        ? "bg-emerald-500/15 text-emerald-400"
        : "text-white/60 hover:bg-white/5 hover:text-white"
    }
  `;

  /* LOGOUT */
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <motion.aside
      animate={{ width: collapsed ? 80 : 256 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="
        fixed left-0 top-0 h-screen
        bg-gradient-to-br from-[#0B1220] via-[#0E1F2A] to-[#0A2E2A]
        border-r border-white/10
        backdrop-blur-2xl
        px-4 py-6
        flex flex-col
        z-40
      "
    >
      {/* BRAND + TOGGLE */}
      <div className="flex items-center justify-between mb-10">
        {!collapsed && (
          <Link to="/dashboard">
            <Brand light size="lg" />
          </Link>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="
            p-2 rounded-lg
            bg-white/5 hover:bg-white/10
            text-white/70 hover:text-white
            transition
          "
        >
          {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
        </button>
      </div>

      {/* MAIN NAV */}
      <nav className="flex flex-col gap-2 flex-grow">
        <Link
          to="/dashboard"
          className={linkClass(isActive("/dashboard"))}
          title="Dashboard"
        >
          <FiHome size={18} />
          {!collapsed && "Dashboard"}
        </Link>

        <Link
          to="/trips"
          className={linkClass(isActive("/trips"))}
          title="Trips"
        >
          <FiMap size={18} />
          {!collapsed && "Trips"}
        </Link>

        <Link
          to="/analytics"
          className={linkClass(isActive("/analytics"))}
          title="Analytics"
        >
          <FiBarChart2 size={18} />
          {!collapsed && "Analytics"}
        </Link>

        <Link
          to="/history"
          className={linkClass(isActive("/history"))}
          title="History"
        >
          <FiClock size={18} />
          {!collapsed && "History"}
        </Link>

        {/* SECONDARY PAGES */}
        <div className="mt-4 pt-4 border-t border-white/10">
          <Link
            to="/about"
            className={linkClass(isActive("/about"))}
            title="About"
          >
            <FiInfo size={18} />
            {!collapsed && "About"}
          </Link>

          <Link
            to="/help"
            className={linkClass(isActive("/help"))}
            title="Help / FAQ"
          >
            <FiHelpCircle size={18} />
            {!collapsed && "Help"}
          </Link>
        </div>
      </nav>

      {/* PROFILE */}
      <div className="pt-4 border-t border-white/10">
        <Link
          to="/profile"
          className={linkClass(isActive("/profile"))}
          title="Profile"
        >
          <FiUser size={18} />
          {!collapsed && "Profile"}
        </Link>
      </div>

      {/* LOGOUT */}
      <button
        onClick={handleLogout}
        title="Logout"
        className="
          mt-4 flex items-center gap-3 px-4 py-3
          rounded-xl text-sm font-semibold
          text-red-400 hover:bg-red-500/10 transition
        "
      >
        <FiLogOut size={18} />
        {!collapsed && "Logout"}
      </button>
    </motion.aside>
  );
};

export default Sidebar;
