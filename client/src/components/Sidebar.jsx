import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import moment from "moment";
import toast from "react-hot-toast";

// Chat History Item Component
const ChatHistoryItem = ({ chat, navigate, setSelectedChat, setIsMenuOpen, deleteChat, assets }) => {
  return (
    <div
      onClick={() => {
        navigate("/");
        setSelectedChat(chat);
        setIsMenuOpen(false);
      }}
      className="p-3 px-4 
      bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 border border-black/5 dark:border-white/5 
      rounded-lg cursor-pointer flex justify-between items-center group transition-all duration-200"
    >
      <div className="flex flex-col flex-1 min-w-0">
        <p className="truncate text-sm text-gray-800 dark:text-gray-200 font-medium">
          {chat.messages.length > 0
            ? chat.messages[0]?.content.slice(0, 28)
            : chat.name}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {moment(chat.updatedAt).format('HH:mm')}
        </p>
      </div>

      <img
        src={assets.bin_icon}
        className="hidden group-hover:block w-4 cursor-pointer dark:invert flex-shrink-0"
        alt="delete"
        onClick={(e) =>
          toast.promise(deleteChat(e, chat._id), {
            loading: "Deleting...",
          })
        }
      />
    </div>
  );
};

const Sidebar = ({ isMenuOpen, setIsMenuOpen }) => {
  const {
    chats,
    setSelectedChat,
    theme,
    setTheme,
    user,
    navigate,
    createNewChat,
    axios,
    setChats,
    fetchUsersChats,
    setToken,
    token
  } = useAppContext();

  const [search, setSearch] = useState("");

  // GROUP CHATS BY DATE
  const groupChatsByDate = (chatsArray) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const groups = {
      today: [],
      yesterday: [],
      week: [],
      month: [],
      older: []
    };

    chatsArray.forEach(chat => {
      const chatDate = new Date(chat.updatedAt);
      const chatDateNormalized = new Date(chatDate.getFullYear(), chatDate.getMonth(), chatDate.getDate());

      if (chatDateNormalized.getTime() === today.getTime()) {
        groups.today.push(chat);
      } else if (chatDateNormalized.getTime() === yesterday.getTime()) {
        groups.yesterday.push(chat);
      } else if (chatDateNormalized > sevenDaysAgo) {
        groups.week.push(chat);
      } else if (chatDateNormalized > thirtyDaysAgo) {
        groups.month.push(chat);
      } else {
        groups.older.push(chat);
      }
    });

    return groups;
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    toast.success("Logged out successfully!");
  };

  // DELETE CHAT
  const deleteChat = async (e, chatId) => {
    try {
      e.stopPropagation();

      const confirmDelete = window.confirm(
        "Are you sure you want to delete this chat?"
      );
      if (!confirmDelete) return;

      const { data } = await axios.post(
        "/api/chat/delete",
        { chatId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        setChats((prev) => prev.filter((chat) => chat._id !== chatId));
        await fetchUsersChats();
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      className={`flex flex-col h-screen min-w-80 p-6
      glass bg-white/90 dark:bg-black/5 border-r border-gray-200 dark:border-white/10 transition-all duration-500 
      max-md:absolute left-0 z-20 
      ${!isMenuOpen && "max-md:-translate-x-full"}`}
    >
      {/* Logo Removed */}

      {/* Create New Chat */}
      <button
        onClick={createNewChat}
        className="mt-6 flex items-center justify-center gap-2 text-sm font-medium px-4 py-3 
        bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 border border-black/5 dark:border-white/10 
        rounded-xl transition-all duration-300 shadow-sm hover:shadow-md text-gray-800 dark:text-gray-100"
      >
        <span className="text-xl leading-none">+</span> New Chat
      </button>

      {/* Search */}
      <div className="flex items-center gap-2 p-3 mt-4 border border-gray-400 dark:border-white/20 rounded-md">
        <img src={assets.search_icon} className="w-4 dark:invert" alt="search" />
        <input
          type="text"
          placeholder="Search conversations..."
          className="bg-transparent outline-none w-full placeholder:text-sm placeholder:text-gray-500 dark:placeholder:text-gray-300"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Chat History */}
      <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">
        Chat History
      </p>

      <div className="flex flex-col gap-3 mt-4 overflow-y-auto flex-1 pr-2">
        {chats.length === 0 ? (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">No chats yet. Create one to get started!</p>
        ) : (
          <>
            {(() => {
              const groups = groupChatsByDate(
                chats.filter((chat) =>
                  chat.messages.length > 0
                    ? chat.messages[0]?.content
                      .toLowerCase()
                      .includes(search.toLowerCase())
                    : chat.name.toLowerCase().includes(search.toLowerCase())
                )
              );

              return (
                <>
                  {/* TODAY */}
                  {groups.today.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 px-1">Today</p>
                      <div className="flex flex-col gap-1">
                        {groups.today.map((chat) => (
                          <ChatHistoryItem
                            key={chat._id}
                            chat={chat}
                            navigate={navigate}
                            setSelectedChat={setSelectedChat}
                            setIsMenuOpen={setIsMenuOpen}
                            deleteChat={deleteChat}
                            assets={assets}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* YESTERDAY */}
                  {groups.yesterday.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 px-1 mt-3">Yesterday</p>
                      <div className="flex flex-col gap-1">
                        {groups.yesterday.map((chat) => (
                          <ChatHistoryItem
                            key={chat._id}
                            chat={chat}
                            navigate={navigate}
                            setSelectedChat={setSelectedChat}
                            setIsMenuOpen={setIsMenuOpen}
                            deleteChat={deleteChat}
                            assets={assets}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* LAST 7 DAYS */}
                  {groups.week.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 px-1 mt-3">Last 7 Days</p>
                      <div className="flex flex-col gap-1">
                        {groups.week.map((chat) => (
                          <ChatHistoryItem
                            key={chat._id}
                            chat={chat}
                            navigate={navigate}
                            setSelectedChat={setSelectedChat}
                            setIsMenuOpen={setIsMenuOpen}
                            deleteChat={deleteChat}
                            assets={assets}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* LAST 30 DAYS */}
                  {groups.month.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 px-1 mt-3">Last 30 Days</p>
                      <div className="flex flex-col gap-1">
                        {groups.month.map((chat) => (
                          <ChatHistoryItem
                            key={chat._id}
                            chat={chat}
                            navigate={navigate}
                            setSelectedChat={setSelectedChat}
                            setIsMenuOpen={setIsMenuOpen}
                            deleteChat={deleteChat}
                            assets={assets}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* OLDER */}
                  {groups.older.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 px-1 mt-3">Older</p>
                      <div className="flex flex-col gap-1">
                        {groups.older.map((chat) => (
                          <ChatHistoryItem
                            key={chat._id}
                            chat={chat}
                            navigate={navigate}
                            setSelectedChat={setSelectedChat}
                            setIsMenuOpen={setIsMenuOpen}
                            deleteChat={deleteChat}
                            assets={assets}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </>
              );
            })()}
          </>
        )}
      </div>

      {/* Community */}
      <div
        onClick={() => {
          navigate("/community");
          setIsMenuOpen(false);
        }}
        className="flex items-center gap-3 mt-6 p-3 border border-gray-400 dark:border-white/20 rounded-md cursor-pointer hover:scale-105 transition-all"
      >
        <img src={assets.gallery_icon} className="w-5 dark:invert" alt="" />
        <p className="text-sm">Community Images</p>
      </div>

      {/* Credits */}
      <div
        onClick={() => {
          navigate("/credits");
          setIsMenuOpen(false);
        }}
        className="flex items-center gap-3 mt-6 p-3 border border-gray-400 dark:border-white/20 rounded-md cursor-pointer hover:scale-105 transition-all"
      >
        <img src={assets.diamond_icon} className="w-5 dark:invert" alt="" />
        <div className="flex flex-col text-sm">
          <p>Credits: {user?.credits}</p>
          <p className="text-xs text-gray-500">
            Purchase credits to use Athena GPT
          </p>
        </div>
      </div>

      {/* Theme Toggle */}
      <div className="flex items-center justify-between gap-3 mt-6 p-3 border border-gray-400 dark:border-white/15 rounded-md">
        <div className="flex items-center gap-2 text-sm">
          <img src={assets.theme_icon} className="w-5 dark:invert" alt="" />
          <p>Dark Mode</p>
        </div>

        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={theme === "dark"}
            onChange={() =>
              setTheme(theme === "dark" ? "light" : "dark")
            }
          />
          <div className="w-11 h-6 bg-gray-400 rounded-full peer-checked:bg-purple-600 transition-all"></div>
          <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-4 transition-transform"></span>
        </label>
      </div>

      {/* User / Profile */}
      <div
        onClick={() => { navigate("/profile"); setIsMenuOpen(false); }}
        className="flex items-center gap-3 mt-6 p-3 border border-gray-400 dark:border-white/15 rounded-md cursor-pointer group hover:bg-black/5 dark:hover:bg-white/5 transition-all"
      >
        {/* Live avatar thumbnail from localStorage */}
        <div className="relative h-9 w-9 rounded-full overflow-hidden flex-shrink-0 ring-1 ring-purple-400/50 bg-gray-200 dark:bg-gray-700">
          <div className="absolute inset-0 flex items-center justify-center">
            <img src={assets.user_icon} className="w-full h-full object-cover" alt="" />
          </div>
        </div>
        <p className="flex-1 text-sm text-gray-800 dark:text-gray-200 font-medium truncate">
          {user ? user.name : "Login your Account"}
        </p>
        {user && (
          <img
            onClick={(e) => { e.stopPropagation(); logout(); }}
            src={assets.logout_icon}
            className="h-5 cursor-pointer dark:invert group-hover:opacity-100 transition-opacity"
            alt="logout"
          />
        )}
      </div>

      {/* Close Icon */}
      <img
        onClick={() => setIsMenuOpen(false)}
        src={assets.close_icon}
        className="absolute top-4 right-4 w-6 dark:invert md:hidden cursor-pointer"
        alt="close sidebar"
      />
    </div>
  );
};

export default Sidebar;
