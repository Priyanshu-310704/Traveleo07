import Sidebar from "../components/Sidebar";
import ProfileCard from "../components/Profile/ProfileCard";
import SecurityCard from "../components/Profile/SecurityCard";
import DangerZone from "../components/Profile/DangerZone";
import Footer from "../components/Footer";

const Profile = () => {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#0F172A] via-[#0B3C3A] to-[#064E3B] text-white">
      {/* SIDEBAR */}
      <Sidebar />

      {/* PAGE CONTENT */}
      <div className="flex flex-col flex-grow pl-64">
        <main className="flex-grow px-8 py-12 max-w-5xl mx-auto w-full">
          {/* HEADER */}
          <div className="mb-12">
            <h1 className="text-3xl font-bold">
              Account{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Settings
              </span>
            </h1>
            <p className="text-white/60 mt-2">
              Manage your personal information and security preferences
            </p>
          </div>

          {/* SECTIONS */}
          <div className="space-y-8">
            <ProfileCard />
            <SecurityCard />
            <DangerZone />
          </div>
        </main>

        {/* FOOTER */}
        <Footer />
      </div>
    </div>
  );
};

export default Profile;
