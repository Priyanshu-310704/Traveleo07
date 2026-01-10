import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteAccount } from "../../api/profile.api";
import { toast } from "react-hot-toast";

const DangerZone = () => {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteAccount();

      toast.success("Account deleted successfully");

      // clear session
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      navigate("/signup");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed to delete account. Please try again."
      );
    } finally {
      setLoading(false);
      setShowConfirm(false);
    }
  };

  return (
    <>
      {/* DANGER CARD */}
      <div className="bg-red-500/10 backdrop-blur-xl border border-red-500/30 rounded-2xl p-6">
        <h2 className="text-lg font-semibold mb-4 text-red-400">
          Permanent Delete
        </h2>

        <p className="text-sm text-white/60 mb-6">
          Deleting your account is permanent and cannot be undone.
        </p>

        <button
          onClick={() => setShowConfirm(true)}
          className="px-6 py-2 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition"
        >
          Delete Account
        </button>
      </div>

      {/* CONFIRMATION MODAL */}
      {showConfirm && (
        <div
          onClick={() => setShowConfirm(false)}
          className="
            fixed inset-0 z-50
            bg-black/60 backdrop-blur-md
            flex items-center justify-center px-4
          "
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="
              w-full max-w-md
              bg-[#0F172A] border border-red-500/30
              rounded-3xl p-6
              shadow-2xl
            "
          >
            <h3 className="text-xl font-bold text-red-400 mb-3">
              Delete Account?
            </h3>

            <p className="text-sm text-white/70 mb-6 leading-relaxed">
              This action is <strong className="text-red-400">permanent</strong>.
              <br />
              All your trips, expenses, and data will be deleted forever.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                disabled={loading}
                className="
                  px-4 py-2 rounded-xl
                  bg-white/10 hover:bg-white/15
                  transition
                "
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                disabled={loading}
                className="
                  px-5 py-2 rounded-xl
                  bg-red-500 hover:bg-red-600
                  font-semibold
                  transition
                  disabled:opacity-60
                "
              >
                {loading ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DangerZone;
