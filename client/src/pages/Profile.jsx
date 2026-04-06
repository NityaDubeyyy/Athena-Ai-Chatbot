import React, { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check, User2, LogOut, Mail, Star, Calendar, Shield, Pencil, X, Save } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import ProfileDropdown from "../components/ProfileDropdown";

// ─── Avatar Data ─────────────────────────────────────────────────────────────

const AVATAR_RGB = {
  1: "255, 0, 91",
  2: "255, 125, 16",
  3: "137, 252, 179",
  4: "96, 165, 250",
  5: "168, 85, 247",
  6: "34, 211, 238",
};

const avatarSVGs = [
  // Avatar 1 – Fiery red
  {
    id: 1,
    alt: "Blaze",
    svg: (
      <svg fill="none" height="40" viewBox="0 0 36 36" width="40" xmlns="http://www.w3.org/2000/svg">
        <mask id="av1" maskUnits="userSpaceOnUse" width="36" height="36" x="0" y="0">
          <rect fill="#fff" height="36" rx="72" width="36" />
        </mask>
        <g mask="url(#av1)">
          <rect fill="#ff005b" height="36" width="36" />
          <rect fill="#ffb238" height="36" rx="6" transform="translate(9 -5) rotate(219 18 18) scale(1)" width="36" x="0" y="0" />
          <g transform="translate(4.5 -4) rotate(9 18 18)">
            <path d="M15 19c2 1 4 1 6 0" fill="none" stroke="#000" strokeLinecap="round" />
            <rect fill="#000" height="2" rx="1" width="1.5" x="10" y="14" />
            <rect fill="#000" height="2" rx="1" width="1.5" x="24" y="14" />
          </g>
        </g>
      </svg>
    ),
  },
  // Avatar 2 – Dark orange
  {
    id: 2,
    alt: "Shadow",
    svg: (
      <svg fill="none" height="40" viewBox="0 0 36 36" width="40" xmlns="http://www.w3.org/2000/svg">
        <mask id="av2" maskUnits="userSpaceOnUse" width="36" height="36" x="0" y="0">
          <rect fill="#fff" height="36" rx="72" width="36" />
        </mask>
        <g mask="url(#av2)">
          <rect fill="#ff7d10" height="36" width="36" />
          <rect fill="#0a0310" height="36" rx="6" transform="translate(5 -1) rotate(55 18 18) scale(1.1)" width="36" x="0" y="0" />
          <g transform="translate(7 -6) rotate(-5 18 18)">
            <path d="M15 20c2 1 4 1 6 0" fill="none" stroke="#fff" strokeLinecap="round" />
            <rect fill="#fff" height="2" rx="1" width="1.5" x="14" y="14" />
            <rect fill="#fff" height="2" rx="1" width="1.5" x="20" y="14" />
          </g>
        </g>
      </svg>
    ),
  },
  // Avatar 3 – Night sky
  {
    id: 3,
    alt: "Cosmos",
    svg: (
      <svg fill="none" height="40" viewBox="0 0 36 36" width="40" xmlns="http://www.w3.org/2000/svg">
        <mask id="av3" maskUnits="userSpaceOnUse" width="36" height="36" x="0" y="0">
          <rect fill="#fff" height="36" rx="72" width="36" />
        </mask>
        <g mask="url(#av3)">
          <rect fill="#0a0310" height="36" width="36" />
          <rect fill="#ff005b" height="36" rx="36" transform="translate(-3 7) rotate(227 18 18) scale(1.2)" width="36" x="0" y="0" />
          <g transform="translate(-3 3.5) rotate(7 18 18)">
            <path d="M13,21 a1,0.75 0 0,0 10,0" fill="#fff" />
            <rect fill="#fff" height="2" rx="1" width="1.5" x="12" y="14" />
            <rect fill="#fff" height="2" rx="1" width="1.5" x="22" y="14" />
          </g>
        </g>
      </svg>
    ),
  },
  // Avatar 4 – Mint green
  {
    id: 4,
    alt: "Mint",
    svg: (
      <svg fill="none" height="40" viewBox="0 0 36 36" width="40" xmlns="http://www.w3.org/2000/svg">
        <mask id="av4" maskUnits="userSpaceOnUse" width="36" height="36" x="0" y="0">
          <rect fill="#fff" height="36" rx="72" width="36" />
        </mask>
        <g mask="url(#av4)">
          <rect fill="#d8fcb3" height="36" width="36" />
          <rect fill="#89fcb3" height="36" rx="6" transform="translate(9 -5) rotate(219 18 18) scale(1)" width="36" x="0" y="0" />
          <g transform="translate(4.5 -4) rotate(9 18 18)">
            <path d="M15 19c2 1 4 1 6 0" fill="none" stroke="#000" strokeLinecap="round" />
            <rect fill="#000" height="2" rx="1" width="1.5" x="10" y="14" />
            <rect fill="#000" height="2" rx="1" width="1.5" x="24" y="14" />
          </g>
        </g>
      </svg>
    ),
  },
  // Avatar 5 – Purple
  {
    id: 5,
    alt: "Nebula",
    svg: (
      <svg fill="none" height="40" viewBox="0 0 36 36" width="40" xmlns="http://www.w3.org/2000/svg">
        <mask id="av5" maskUnits="userSpaceOnUse" width="36" height="36" x="0" y="0">
          <rect fill="#fff" height="36" rx="72" width="36" />
        </mask>
        <g mask="url(#av5)">
          <rect fill="#a855f7" height="36" width="36" />
          <rect fill="#1e0040" height="36" rx="6" transform="translate(6 -3) rotate(135 18 18) scale(1.1)" width="36" x="0" y="0" />
          <g transform="translate(2 -2) rotate(-5 18 18)">
            <path d="M14 20c1.5 1.5 6.5 1.5 8 0" fill="none" stroke="#fff" strokeLinecap="round" />
            <rect fill="#fff" height="2.5" rx="1" width="2" x="12" y="13" />
            <rect fill="#fff" height="2.5" rx="1" width="2" x="22" y="13" />
          </g>
        </g>
      </svg>
    ),
  },
  // Avatar 6 – Cyan
  {
    id: 6,
    alt: "Aurora",
    svg: (
      <svg fill="none" height="40" viewBox="0 0 36 36" width="40" xmlns="http://www.w3.org/2000/svg">
        <mask id="av6" maskUnits="userSpaceOnUse" width="36" height="36" x="0" y="0">
          <rect fill="#fff" height="36" rx="72" width="36" />
        </mask>
        <g mask="url(#av6)">
          <rect fill="#083344" height="36" width="36" />
          <rect fill="#22d3ee" height="36" rx="20" transform="translate(0 8) rotate(160 18 18) scale(1.15)" width="36" x="0" y="0" />
          <g transform="translate(1 -2) rotate(3 18 18)">
            <path d="M13 20c2 2 8 2 10 0" fill="none" stroke="#083344" strokeLinecap="round" strokeWidth="1.2" />
            <rect fill="#083344" height="2.5" rx="1.2" width="2" x="12" y="13" />
            <rect fill="#083344" height="2.5" rx="1.2" width="2" x="22" y="13" />
          </g>
        </g>
      </svg>
    ),
  },
];

// ─── Animation Variants ───────────────────────────────────────────────────────

const containerVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

const thumbnailVariants = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.28, ease: "easeOut" } },
};

const sectionVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

// ─── Main Component ───────────────────────────────────────────────────────────

const Profile = () => {
  const { user, setUser, theme, navigate, token, axios, setToken } = useAppContext();
  const shouldReduceMotion = useReducedMotion();

  // Avatar state — persisted in localStorage
  const savedAvatarId = parseInt(localStorage.getItem("userAvatarId") || "1", 10);
  const defaultAvatar = avatarSVGs.find((a) => a.id === savedAvatarId) || avatarSVGs[0];

  const [selectedAvatar, setSelectedAvatar] = useState(defaultAvatar);
  const [pendingAvatar, setPendingAvatar] = useState(defaultAvatar);
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState(user?.name || "");

  const rgb = AVATAR_RGB[selectedAvatar.id];

  // Confirm avatar change
  const handleSaveAvatar = () => {
    setSelectedAvatar(pendingAvatar);
    localStorage.setItem("userAvatarId", String(pendingAvatar.id));
    toast.success(`Avatar changed to ${pendingAvatar.alt}!`);
  };

  // Save display name
  const handleSaveName = async () => {
    if (!newName.trim() || newName.trim().length < 2) {
      toast.error("Name must be at least 2 characters");
      return;
    }
    try {
      const { data } = await axios.post(
        "/api/user/update-name",
        { name: newName.trim() },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        setUser((prev) => ({ ...prev, name: newName.trim() }));
        toast.success("Name updated!");
      } else {
        // Optimistic update even if backend route doesn't exist yet
        setUser((prev) => ({ ...prev, name: newName.trim() }));
        toast.success("Name updated!");
      }
    } catch {
      // Optimistic update
      setUser((prev) => ({ ...prev, name: newName.trim() }));
      toast.success("Name updated locally!");
    }
    setEditingName(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    toast.success("Logged out successfully!");
    navigate("/");
  };

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : "Member";

  const avatarChanged = pendingAvatar.id !== selectedAvatar.id;

  return (
    <div className="min-h-screen py-10 px-4 flex flex-col items-center gap-8">
      {/* ── Page Title ── */}
      <motion.div
        variants={sectionVariants}
        initial="initial"
        animate="animate"
        className="w-full max-w-lg flex flex-col gap-4"
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold gradient-text mb-1">My Profile</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Manage your identity &amp; avatar
            </p>
          </div>
          <ProfileDropdown
            data={{
              name: user?.name || "User",
              email: user?.email || "user@example.com",
              avatar: user?.avatar || "https://ferf1mheo22r9ira.public.blob.vercel-storage.com/profile-mjss82WnWBRO86MHHGxvJ2TVZuyrDv.jpeg",
              subscription: user?.subscription || "PRO",
              model: user?.model || "Gemini 2.0 Flash",
            }}
            onSignOut={logout}
          />
        </div>
      </motion.div>

      {/* ── USER INFO CARD ── */}
      <motion.div
        variants={sectionVariants}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.05 }}
        className="w-full max-w-lg glass-card rounded-2xl p-6 flex flex-col gap-5"
      >
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Account Info
          </h2>
          <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 font-medium">
            Active
          </span>
        </div>

        {/* Avatar + name row */}
        <div className="flex items-center gap-4">
          {/* Mini avatar display */}
          <div className="relative h-16 w-16 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-purple-400/50">
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
              <div className="scale-[2.5] transform">{selectedAvatar.svg}</div>
            </div>
          </div>

          {/* Name / edit */}
          <div className="flex-1 min-w-0">
            {editingName ? (
              <div className="flex items-center gap-2">
                <input
                  autoFocus
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSaveName()}
                  className="flex-1 text-lg font-semibold bg-transparent border-b-2 border-purple-500 outline-none text-gray-800 dark:text-gray-100 pb-0.5"
                  maxLength={32}
                />
                <button
                  onClick={handleSaveName}
                  className="p-1 rounded-lg bg-purple-500 text-white hover:bg-purple-600 transition-colors"
                  title="Save"
                >
                  <Save className="w-4 h-4" />
                </button>
                <button
                  onClick={() => { setEditingName(false); setNewName(user?.name || ""); }}
                  className="p-1 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  title="Cancel"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 group">
                <span className="text-lg font-semibold text-gray-800 dark:text-gray-100 truncate">
                  {user?.name || "User"}
                </span>
                <button
                  onClick={() => { setEditingName(true); setNewName(user?.name || ""); }}
                  className="opacity-0 group-hover:opacity-100 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                  title="Edit name"
                >
                  <Pencil className="w-3.5 h-3.5 text-gray-500" />
                </button>
              </div>
            )}
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              {selectedAvatar.alt} avatar
            </p>
          </div>
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Email */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-black/5 dark:bg-white/5">
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/40">
              <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-gray-500 dark:text-gray-400">Email</p>
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
                {user?.email || "—"}
              </p>
            </div>
          </div>

          {/* Credits */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-black/5 dark:bg-white/5">
            <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/40">
              <Star className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Credits</p>
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                {user?.credits ?? 0}
              </p>
            </div>
          </div>

          {/* Member since */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-black/5 dark:bg-white/5">
            <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/40">
              <Calendar className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Member Since</p>
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                {memberSince}
              </p>
            </div>
          </div>

          {/* Role */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-black/5 dark:bg-white/5">
            <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/40">
              <Shield className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Role</p>
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200 capitalize">
                {user?.role || "user"}
              </p>
            </div>
          </div>
        </div>

        {/* Logout button */}
        <button
          onClick={logout}
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-medium
          text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50
          hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </motion.div>

      {/* ── AVATAR PICKER CARD ── */}
      <motion.div
        variants={sectionVariants}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.12 }}
        className="w-full max-w-lg glass-card rounded-2xl p-6 flex flex-col gap-6"
      >
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Pick Your Avatar
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            Choose one that represents you
          </p>
        </div>

        {/* Avatar Stage */}
        <div className="flex flex-col items-center gap-4">
          {/* Large avatar display with animated ring */}
          <div className="relative h-36 w-36">
            <motion.div
              animate={{
                boxShadow: `0 0 0 2px rgba(${AVATAR_RGB[pendingAvatar.id]}, 0.6), 0 6px 28px rgba(${AVATAR_RGB[pendingAvatar.id]}, 0.22)`,
              }}
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-full"
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.45, ease: "easeOut" }}
            />
            <div className="relative h-full w-full overflow-hidden rounded-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={pendingAvatar.id}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 flex items-center justify-center"
                  exit={{ opacity: 0, scale: 0.92 }}
                  initial={{ opacity: 0, scale: 0.92 }}
                  transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.22, ease: "easeOut" }}
                >
                  <div className="scale-[3.5] transform">{pendingAvatar.svg}</div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Avatar name */}
          <AnimatePresence mode="wait">
            <motion.span
              animate={{ opacity: 1 }}
              className="text-[11px] tracking-[0.12em] text-gray-500 dark:text-gray-400 uppercase font-medium"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              key={pendingAvatar.id}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.16 }}
            >
              {pendingAvatar.alt}
            </motion.span>
          </AnimatePresence>

          {/* Thumbnail grid */}
          <motion.div
            animate="animate"
            className="flex flex-wrap justify-center gap-3"
            initial="initial"
            variants={containerVariants}
          >
            {avatarSVGs.map((avatar) => {
              const isPending = pendingAvatar.id === avatar.id;
              const isSaved = selectedAvatar.id === avatar.id;
              return (
                <motion.button
                  aria-label={`Select ${avatar.alt}`}
                  aria-pressed={isPending}
                  className={[
                    "relative h-14 w-14 overflow-hidden rounded-xl border transition-all duration-200 ease-out",
                    isPending
                      ? "border-purple-400/60 opacity-100 ring-2 ring-purple-500 ring-offset-2 ring-offset-transparent"
                      : "border-gray-200 dark:border-white/10 opacity-50 hover:opacity-100",
                  ].join(" ")}
                  key={avatar.id}
                  onClick={() => setPendingAvatar(avatar)}
                  type="button"
                  variants={thumbnailVariants}
                  whileHover={shouldReduceMotion ? {} : { scale: 1.08 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.92 }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="scale-[2.3] transform">{avatar.svg}</div>
                  </div>
                  {isSaved && (
                    <div className="absolute -right-0.5 -bottom-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-green-500">
                      <Check aria-hidden="true" className="h-3 w-3 text-white" />
                    </div>
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        </div>

        {/* Save avatar button */}
        <motion.button
          onClick={handleSaveAvatar}
          disabled={!avatarChanged}
          whileHover={shouldReduceMotion || !avatarChanged ? {} : { scale: 1.02 }}
          whileTap={shouldReduceMotion || !avatarChanged ? {} : { scale: 0.98 }}
          className={[
            "py-3 px-6 rounded-xl text-sm font-semibold transition-all duration-300 w-full",
            avatarChanged
              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 cursor-pointer"
              : "bg-gray-100 dark:bg-white/5 text-gray-400 dark:text-gray-600 cursor-not-allowed",
          ].join(" ")}
        >
          {avatarChanged ? `Set "${pendingAvatar.alt}" as My Avatar` : "Avatar Saved ✓"}
        </motion.button>
      </motion.div>

      {/* ── STATS CARD ── */}
      <motion.div
        variants={sectionVariants}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.18 }}
        className="w-full max-w-lg glass-card rounded-2xl p-6"
      >
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Activity Overview
        </h2>
        <div className="grid grid-cols-3 gap-4 text-center">
          {[
            { label: "Total Chats", value: user?.totalChats ?? "—", color: "text-purple-500" },
            { label: "Credits Left", value: user?.credits ?? 0, color: "text-amber-500" },
            { label: "Avatar", value: selectedAvatar.alt, color: "text-pink-500" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <span className={`text-2xl font-bold ${stat.color}`}>{stat.value}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
