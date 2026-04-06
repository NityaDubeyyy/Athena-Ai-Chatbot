

import React, { useRef, useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import Message from './Message'
import toast from 'react-hot-toast'
import EmptyState from './EmptyState'
import LightRays from './LightRays'

const ChatBox = () => {
  const containerRef = useRef(null)

  const { selectedChat, theme, user, axios, token, setUser, setMood, setSelectedChat, setChats } = useAppContext()
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [prompt, setPrompt] = useState("")
  const [mode, setMode] = useState("text")
  const [isPublished, setIsPublished] = useState(false)

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!user) return toast('login to send message')
      if (!selectedChat) return toast.error('Create or select a chat first')
      if (!prompt.trim()) return toast.error('Enter a prompt')

      setLoading(true)
      const promptCopy = prompt
      setPrompt('')
      const userMessage = {
        role: 'user',
        content: promptCopy,
        timestamp: Date.now(),
        isImage: mode === 'image' ? false : false,
      }
      setMessages(prev => [...prev, userMessage])

      const { data } = await axios.post(`/api/message/${mode}`, {
        chatId: selectedChat._id,
        prompt: promptCopy,
        isPublished
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (data.success) {
        setMessages(prevMessages => {
          const updatedMessages = [...prevMessages, data.reply]
          setSelectedChat(prev => prev ? { ...prev, messages: updatedMessages, updatedAt: Date.now() } : prev)
          setChats(prev => prev.map(chat => chat._id === selectedChat._id ? { ...chat, messages: updatedMessages, updatedAt: Date.now() } : chat))
          return updatedMessages
        })
        setUser(prev => ({ ...prev, credits: data.credits || (mode === 'image' ? prev.credits - 2 : prev.credits - 1) }))
      } else {
        toast.error(data.message)
        setPrompt(promptCopy)
        setMessages(prev => prev.filter(msg => msg !== userMessage))
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
      setMessages(prev => prev.slice(0, -1))
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (selectedChat) {
      setMessages(selectedChat.messages)
    }
  }, [selectedChat])

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [messages])

  const analyzeMood = (msgs) => {
    if (!msgs || msgs.length === 0) return 'neutral';
    
    // Check the last 3 messages
    const recentMessages = msgs.slice(-3).map(m => m.content?.toLowerCase() || "");
    const text = recentMessages.join(" ");
    
    const energeticKeywords = ['exciting', 'happy', 'fast', 'action', 'energy', 'awesome', "let's go", 'great', 'wow', 'super', '!', 'love', 'amazing'];
    const calmKeywords = ['sleep', 'tired', 'calm', 'night', 'relax', 'quiet', 'moon', 'peace', 'chill', 'soothing', 'deep sea', 'sad'];
    
    let energeticScore = 0;
    let calmScore = 0;
    
    energeticKeywords.forEach(word => { if (text.includes(word)) energeticScore++; });
    calmKeywords.forEach(word => { if (text.includes(word)) calmScore++; });
    
    // Also consider time of day for late-night calm (10 PM to 4 AM)
    const currentHour = new Date().getHours();
    if (currentHour >= 22 || currentHour <= 4) {
      calmScore += 1; 
    }
    
    if (energeticScore > calmScore && energeticScore > 0) return 'energetic';
    if (calmScore > energeticScore && calmScore > 0) return 'calm';
    return 'neutral';
  }

  useEffect(() => {
    if (messages.length > 0) {
      setMood(analyzeMood(messages));
    }
  }, [messages, setMood])

  return (
    <div className='flex-1 flex flex-col h-full relative overflow-hidden'>
      {/* Background Effect */}
      <div style={{ width: '1080px', height: '1080px', position: 'absolute', top: 0, left: 0, zIndex: 0, pointerEvents: 'none' }}>
        <LightRays
          raysOrigin="top-center"
          raysColor="#95c5e9"
          raysSpeed={1.6}
          lightSpread={1}
          rayLength={3}
          pulsating={false}
          fadeDistance={1}
          saturation={1.1}
          followMouse
          mouseInfluence={0.3}
          noiseAmount={0}
          distortion={0}
        />
      </div>

      {/* Messages Area - Takes up all available space except input */}
      <div 
        ref={containerRef} 
        className='flex-1 overflow-y-auto scroll-smooth relative z-10 px-5 md:px-10 xl:px-30 2xl:pr-40'
      >
        <div className="flex flex-col min-h-full justify-end pb-32">
          {messages.length === 0 && (
            <div className="flex-1 flex flex-col justify-center">
              <EmptyState setPrompt={setPrompt} />
            </div>
          )}

          <div className="flex flex-col gap-4 py-10">
            {messages.map((message, index) => (
              <Message key={index} message={message} />
            ))}
          </div>

          {/* THREE DOTS LOADING */}
          {loading && (
            <div className='loader flex items-center gap-1.5 my-4 px-4'>
              <div className='w-2 h-2 rounded-full bg-purple-500 animate-bounce'></div>
              <div className='w-2 h-2 rounded-full bg-pink-500 animate-bounce'></div>
              <div className='w-2 h-2 rounded-full bg-purple-500 animate-bounce'></div>
            </div>
          )}
        </div>
      </div>

      {/* Input Box Area - Positioned at bottom but part of the same flow or absolute */}
      <div className="absolute bottom-0 left-0 w-full p-5 md:p-10 xl:px-30 2xl:pr-40 z-20 bg-gradient-to-t from-white dark:from-[#0f0c29] via-white/80 dark:via-[#0f0c29]/80 to-transparent">
        {mode == 'image' && (
          <label className='flex items-center justify-center gap-2 mb-3 text-sm'>
            <p className='text-xs'>Publish Generated Image to Community</p>
            <input
              type="checkbox"
              className='cursor-pointer'
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
            />
          </label>
        )}

        <div className="flex items-center gap-3 bg-white dark:bg-white/10 backdrop-blur-2xl border border-gray-200 dark:border-white/20 p-3 rounded-full shadow-2xl transition-all duration-300">
          <select
            onChange={(e) => setMode(e.target.value)}
            value={mode}
            className='text-sm pl-4 pr-2 outline-none bg-transparent font-medium cursor-pointer text-gray-700 dark:text-gray-300'
          >
            <option className='text-black dark:text-white bg-white dark:bg-gray-800' value="text">Text</option>
            <option className='text-black dark:text-white bg-white dark:bg-gray-800' value="image">Image</option>
          </select>

          <div className="w-px h-6 bg-gray-400/30 dark:bg-white/20 mx-1"></div>

          <input
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); onSubmit(e); } }}
            value={prompt}
            type="text"
            placeholder="Start your prompt here..."
            className="flex-1 w-full text-sm outline-none bg-transparent placeholder:text-gray-500 dark:placeholder:text-gray-400 text-gray-800 dark:text-white"
            required
          />

          <button
            type="button"
            disabled={loading}
            onClick={onSubmit}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-all"
          >
            <img
              src={loading ? assets.stop_icon : assets.send_icon}
              alt="send"
              className="w-5 hover:scale-110 transition-transform opacity-70 hover:opacity-100 dark:opacity-100 dark:invert"
            />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatBox
