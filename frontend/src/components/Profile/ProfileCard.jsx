import React, { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../../api/profile.api";
import { toast } from "react-hot-toast";

const ProfileCard = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [loading, setLoading] = useState(false);

  /* LOAD PROFILE FROM BACKEND */
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await getProfile();
        const user = res.data.user;

        setName(user.name || "");
        setEmail(user.email || "");
        setCreatedAt(user.created_at || "");

        // keep localStorage in sync
        localStorage.setItem("user", JSON.stringify(user));
      } catch (err) {
        console.error("Profile load failed", err);
        toast.error("Failed to load profile");
      }
    };

    loadProfile();
  }, []);

  /* SAVE PROFILE */
  const handleSave = async () => {
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    setLoading(true);
    try {
      const res = await updateProfile({
        name,
        phone,
      });

      // update localStorage
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Update failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
      <h2 className="text-lg font-semibold mb-6 text-emerald-300">
        Profile Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* NAME */}
        <div>
          <label className="text-sm text-white/60">Full Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>

        {/* EMAIL */}
        <div>
          <label className="text-sm text-white/60">Email</label>
          <input
            value={email}
            disabled
            className="mt-2 w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white/60 cursor-not-allowed"
          />
        </div>

        {/* PHONE */}
        <div>
          <label className="text-sm text-white/60">Phone</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Add phone number"
            className="mt-2 w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>

        {/* ACCOUNT CREATED */}
        <div>
          <label className="text-sm text-white/60">Account Created</label>
          <input
            value={
              createdAt
                ? new Date(createdAt).toLocaleDateString()
                : "—"
            }
            disabled
            className="mt-2 w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white/60"
          />
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSave}
          disabled={loading}
          className="px-6 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 font-semibold shadow-lg shadow-emerald-500/30 hover:brightness-110 transition disabled:opacity-60"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
