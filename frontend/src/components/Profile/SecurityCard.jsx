import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../../api/profile.api";
import { toast } from "react-hot-toast";

const SecurityCard = () => {
  const navigate = useNavigate();

  const [showChange, setShowChange] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  /* CHANGE PASSWORD */
  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      await changePassword({
        currentPassword,
        newPassword,
      });

      toast.success("Password changed successfully. Please login again.");

      // 🔐 force logout
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Password change failed"
      );
    } finally {
      setLoading(false);
    }
  };

  /* LOGOUT */
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
      <h2 className="text-lg font-semibold mb-6 text-emerald-300">
        Security
      </h2>

      <div className="space-y-6">
        {/* CHANGE PASSWORD */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Change Password</p>
            <p className="text-sm text-white/60">
              Update your account password
            </p>
          </div>

          <button
            onClick={() => setShowChange(!showChange)}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 transition"
          >
            Change
          </button>
        </div>

        {/* PASSWORD FORM */}
        {showChange && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="password"
              placeholder="Current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white outline-none focus:ring-2 focus:ring-emerald-400"
            />

            <input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white outline-none focus:ring-2 focus:ring-emerald-400"
            />

            <div className="md:col-span-2 flex justify-end">
              <button
                onClick={handleChangePassword}
                disabled={loading}
                className="px-6 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 font-semibold shadow-lg shadow-emerald-500/30 hover:brightness-110 transition disabled:opacity-60"
              >
                {loading ? "Updating..." : "Update Password"}
              </button>
            </div>
          </div>
        )}

        {/* LOGOUT */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div>
            <p className="font-medium">Logout</p>
            <p className="text-sm text-white/60">
              Sign out from this device
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-red-500/20 text-red-300 hover:bg-red-500/30 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecurityCard;
