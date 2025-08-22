import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Search, Send, Image, X, User, ArrowLeft, Radio, Plus, Check } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Message, Chat, User as UserType } from '../types';

interface ChatSystemProps {
  setCurrentView: (view: string) => void;
}

const ChatSystem: React.FC<ChatSystemProps> = ({ setCurrentView }) => {
  const { user } = useAuth();
  const [chats, setChats] = useState<Chat[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchUsername, setSearchUsername] = useState('');
  const [searchResults, setSearchResults] = useState<UserType[]>([]);
  const [showUserSearch, setShowUserSearch] = useState(false);
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  const [broadcastName, setBroadcastName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!user) return;
    
    // Load users
    const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    setUsers(savedUsers);
    
    // Load chats
    const savedChats = JSON.parse(localStorage.getItem('chats') || '[]');
    const userChats = savedChats.filter((chat: Chat) => 
      chat.participants.includes(user.id)
    );
    setChats(userChats);
    
    // Load messages
    const savedMessages = JSON.parse(localStorage.getItem('messages') || '[]');
    setMessages(savedMessages);
  }, [user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, activeChat]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const searchUsers = (username: string) => {
    if (!username.trim()) {
      setSearchResults([]);
      return;
    }
    
    const results = users.filter(u => 
      u.id !== user?.id && 
      u.username.toLowerCase().includes(username.toLowerCase())
    );
    setSearchResults(results);
  };

  const startChat = (otherUser: UserType) => {
    if (!user) return;
    
    // Check if chat already exists
    const existingChat = chats.find(chat => 
      chat.type === 'direct' &&
      chat.participants.includes(user.id) && 
      chat.participants.includes(otherUser.id) &&
      chat.participants.length === 2
    );
    
    if (existingChat) {
      setActiveChat(existingChat);
      setShowUserSearch(false);
      setSearchUsername('');
      setSearchResults([]);
      return;
    }
    
    // Create new chat
    const newChat: Chat = {
      id: Date.now().toString(),
      participants: [user.id, otherUser.id],
      type: 'direct',
      updatedAt: new Date().toISOString()
    };
    
    const updatedChats = [...chats, newChat];
    setChats(updatedChats);
    
    // Save to localStorage
    const allChats = JSON.parse(localStorage.getItem('chats') || '[]');
    allChats.push(newChat);
    localStorage.setItem('chats', JSON.stringify(allChats));
    
    setActiveChat(newChat);
    setShowUserSearch(false);
    setSearchUsername('');
    setSearchResults([]);
  };

  const createBroadcast = () => {
    if (!user || selectedUsers.length === 0 || !broadcastName.trim()) return;
    
    const newBroadcast: Chat = {
      id: Date.now().toString(),
      participants: [user.id, ...selectedUsers],
      type: 'broadcast',
      name: broadcastName.trim(),
      createdBy: user.id,
      updatedAt: new Date().toISOString()
    };
    
    const updatedChats = [...chats, newBroadcast];
    setChats(updatedChats);
    
    // Save to localStorage
    const allChats = JSON.parse(localStorage.getItem('chats') || '[]');
    allChats.push(newBroadcast);
    localStorage.setItem('chats', JSON.stringify(allChats));
    
    setActiveChat(newBroadcast);
    setShowBroadcastModal(false);
    setBroadcastName('');
    setSelectedUsers([]);
  };

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const sendMessage = () => {
    if (!user || !activeChat || !newMessage.trim()) return;
    
    if (activeChat.type === 'broadcast') {
      // Send message to all participants except sender
      const recipients = activeChat.participants.filter(id => id !== user.id);
      const newMessages: Message[] = [];
      
      recipients.forEach(recipientId => {
        const message: Message = {
          id: Date.now().toString() + '_' + recipientId,
          senderId: user.id,
          receiverId: recipientId,
          content: newMessage.trim(),
          type: 'text',
          timestamp: new Date().toISOString(),
          read: false
        };
        newMessages.push(message);
      });
      
      const updatedMessages = [...messages, ...newMessages];
      setMessages(updatedMessages);
      
      // Save to localStorage
      const allMessages = JSON.parse(localStorage.getItem('messages') || '[]');
      allMessages.push(...newMessages);
      localStorage.setItem('messages', JSON.stringify(allMessages));
      
      // Update broadcast's last message
      const updatedChat = {
        ...activeChat,
        lastMessage: newMessages[0],
        updatedAt: new Date().toISOString()
      };
      
      const updatedChats = chats.map(chat => 
        chat.id === activeChat.id ? updatedChat : chat
      );
      setChats(updatedChats);
      
      // Update in localStorage
      const allChats = JSON.parse(localStorage.getItem('chats') || '[]');
      const updatedAllChats = allChats.map((chat: Chat) => 
        chat.id === activeChat.id ? updatedChat : chat
      );
      localStorage.setItem('chats', JSON.stringify(updatedAllChats));
      
      setActiveChat(updatedChat);
    } else {
      // Direct message
      const otherUserId = activeChat.participants.find(id => id !== user.id);
      if (!otherUserId) return;
      
      const message: Message = {
        id: Date.now().toString(),
        senderId: user.id,
        receiverId: otherUserId,
        content: newMessage.trim(),
        type: 'text',
        timestamp: new Date().toISOString(),
        read: false
      };
      
      const updatedMessages = [...messages, message];
      setMessages(updatedMessages);
      
      // Save to localStorage
      const allMessages = JSON.parse(localStorage.getItem('messages') || '[]');
      allMessages.push(message);
      localStorage.setItem('messages', JSON.stringify(allMessages));
      
      // Update chat's last message
      const updatedChat = {
        ...activeChat,
        lastMessage: message,
        updatedAt: new Date().toISOString()
      };
      
      const updatedChats = chats.map(chat => 
        chat.id === activeChat.id ? updatedChat : chat
      );
      setChats(updatedChats);
      
      // Update in localStorage
      const allChats = JSON.parse(localStorage.getItem('chats') || '[]');
      const updatedAllChats = allChats.map((chat: Chat) => 
        chat.id === activeChat.id ? updatedChat : chat
      );
      localStorage.setItem('chats', JSON.stringify(updatedAllChats));
      
      setActiveChat(updatedChat);
    }
    
    setNewMessage('');
  };

  const sendImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user || !activeChat) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageData = e.target?.result as string;
      
      if (activeChat.type === 'broadcast') {
        // Send image to all participants except sender
        const recipients = activeChat.participants.filter(id => id !== user.id);
        const newMessages: Message[] = [];
        
        recipients.forEach(recipientId => {
          const message: Message = {
            id: Date.now().toString() + '_' + recipientId,
            senderId: user.id,
            receiverId: recipientId,
            content: imageData,
            type: 'image',
            timestamp: new Date().toISOString(),
            read: false
          };
          newMessages.push(message);
        });
        
        const updatedMessages = [...messages, ...newMessages];
        setMessages(updatedMessages);
        
        // Save to localStorage
        const allMessages = JSON.parse(localStorage.getItem('messages') || '[]');
        allMessages.push(...newMessages);
        localStorage.setItem('messages', JSON.stringify(allMessages));
        
        // Update broadcast's last message
        const updatedChat = {
          ...activeChat,
          lastMessage: { ...newMessages[0], content: 'Sent an image' },
          updatedAt: new Date().toISOString()
        };
        
        const updatedChats = chats.map(chat => 
          chat.id === activeChat.id ? updatedChat : chat
        );
        setChats(updatedChats);
        
        // Update in localStorage
        const allChats = JSON.parse(localStorage.getItem('chats') || '[]');
        const updatedAllChats = allChats.map((chat: Chat) => 
          chat.id === activeChat.id ? updatedChat : chat
        );
        localStorage.setItem('chats', JSON.stringify(updatedAllChats));
        
        setActiveChat(updatedChat);
      } else {
        // Direct message
        const otherUserId = activeChat.participants.find(id => id !== user.id);
        if (!otherUserId) return;
        
        const message: Message = {
          id: Date.now().toString(),
          senderId: user.id,
          receiverId: otherUserId,
          content: imageData,
          type: 'image',
          timestamp: new Date().toISOString(),
          read: false
        };
        
        const updatedMessages = [...messages, message];
        setMessages(updatedMessages);
        
        // Save to localStorage
        const allMessages = JSON.parse(localStorage.getItem('messages') || '[]');
        allMessages.push(message);
        localStorage.setItem('messages', JSON.stringify(allMessages));
        
        // Update chat's last message
        const updatedChat = {
          ...activeChat,
          lastMessage: { ...message, content: 'Sent an image' },
          updatedAt: new Date().toISOString()
        };
        
        const updatedChats = chats.map(chat => 
          chat.id === activeChat.id ? updatedChat : chat
        );
        setChats(updatedChats);
        
        // Update in localStorage
        const allChats = JSON.parse(localStorage.getItem('chats') || '[]');
        const updatedAllChats = allChats.map((chat: Chat) => 
          chat.id === activeChat.id ? updatedChat : chat
        );
        localStorage.setItem('chats', JSON.stringify(updatedAllChats));
        
        setActiveChat(updatedChat);
      }
    };
    
    reader.readAsDataURL(file);
    event.target.value = '';
  };

  const getChatMessages = (chatId: string) => {
    const chat = chats.find(c => c.id === chatId);
    if (!chat) return [];
    
    if (chat.type === 'broadcast') {
      // For broadcasts, show messages sent by the current user or received by the current user
      return messages.filter(msg => {
        return (msg.senderId === user?.id && chat.participants.includes(msg.receiverId)) ||
               (msg.receiverId === user?.id && chat.participants.includes(msg.senderId));
      }).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    } else {
      // For direct chats
      return messages.filter(msg => {
        return chat.participants.includes(msg.senderId) && 
               chat.participants.includes(msg.receiverId);
      }).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    }
  };

  const getOtherUser = (chat: Chat) => {
    if (chat.type === 'broadcast') return null;
    const otherUserId = chat.participants.find(id => id !== user?.id);
    return users.find(u => u.id === otherUserId);
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <MessageCircle className="w-16 h-16 text-white/50 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Login Required</h2>
          <p className="text-white/70 mb-6">Please login to access the chat feature</p>
          <button
            onClick={() => setCurrentView('auth')}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
          >
            Login / Sign Up
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Chat System</h1>
          <p className="text-white/70 text-lg">Connect with buyers and sellers</p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden" style={{ height: '600px' }}>
          <div className="flex h-full">
            {/* Chat List */}
            <div className={`${activeChat ? 'hidden md:block' : 'block'} w-full md:w-1/3 border-r border-white/20 flex flex-col`}>
              {/* Search Header */}
              <div className="p-4 border-b border-white/20">
                <div className="flex items-center space-x-2 mb-4">
                  <h2 className="text-xl font-semibold text-white flex-1">Messages</h2>
                  <button
                    onClick={() => setShowBroadcastModal(true)}
                    className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                    title="Create Broadcast"
                  >
                    <Radio className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setShowUserSearch(!showUserSearch)}
                    className="p-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                    title="Start Chat"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                
                {showUserSearch && (
                  <div className="space-y-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search users by username..."
                        value={searchUsername}
                        onChange={(e) => {
                          setSearchUsername(e.target.value);
                          searchUsers(e.target.value);
                        }}
                        className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    
                    {searchResults.length > 0 && (
                      <div className="max-h-32 overflow-y-auto space-y-1">
                        {searchResults.map(searchUser => (
                          <button
                            key={searchUser.id}
                            onClick={() => startChat(searchUser)}
                            className="w-full flex items-center space-x-3 p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-left"
                          >
                            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                              <User className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <p className="text-white font-medium">{searchUser.username}</p>
                              <p className="text-white/70 text-xs">{searchUser.email}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Chat List */}
              <div className="flex-1 overflow-y-auto">
                {chats.length === 0 ? (
                  <div className="p-4 text-center">
                    <MessageCircle className="w-12 h-12 text-white/30 mx-auto mb-3" />
                    <p className="text-white/70">No conversations yet</p>
                    <p className="text-white/50 text-sm">Search for users to start chatting</p>
                  </div>
                ) : (
                  <div className="space-y-1 p-2">
                    {chats
                      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
                      .map(chat => {
                        const otherUser = getOtherUser(chat);
                        
                        return (
                          <button
                            key={chat.id}
                            onClick={() => setActiveChat(chat)}
                            className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors text-left ${
                              activeChat?.id === chat.id 
                                ? 'bg-purple-600/30 border border-purple-500/50' 
                                : 'hover:bg-white/5'
                            }`}
                          >
                            {chat.type === 'broadcast' ? (
                              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                                <Radio className="w-5 h-5 text-white" />
                              </div>
                            ) : (
                              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                                <span className="text-white font-semibold">
                                  {otherUser?.username.charAt(0).toUpperCase()}
                                </span>
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-white font-medium truncate">
                                {chat.type === 'broadcast' ? chat.name : otherUser?.username}
                              </p>
                              {chat.type === 'broadcast' && (
                                <p className="text-white/50 text-xs">
                                  {chat.participants.length - 1} recipients
                                </p>
                              )}
                              {chat.lastMessage && (
                                <p className="text-white/70 text-sm truncate">
                                  {chat.lastMessage.type === 'image' ? '📷 Image' : chat.lastMessage.content}
                                </p>
                              )}
                            </div>
                            {chat.lastMessage && (
                              <span className="text-white/50 text-xs">
                                {formatTime(chat.lastMessage.timestamp)}
                              </span>
                            )}
                          </button>
                        );
                      })}
                  </div>
                )}
              </div>
            </div>

            {/* Chat Area */}
            <div className={`${activeChat ? 'block' : 'hidden md:block'} flex-1 flex flex-col`}>
              {activeChat ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-white/20 flex items-center space-x-3">
                    <button
                      onClick={() => setActiveChat(null)}
                      className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <ArrowLeft className="w-5 h-5 text-white" />
                    </button>
                    {activeChat.type === 'broadcast' ? (
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                        <Radio className="w-5 h-5 text-white" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">
                          {getOtherUser(activeChat)?.username.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div>
                      <h3 className="text-white font-semibold">
                        {activeChat.type === 'broadcast' ? 
                          (activeChat.isPersonal ? 'My Status' : activeChat.name) : 
                          getOtherUser(activeChat)?.username}
                      </h3>
                      <p className="text-white/70 text-sm">
                        {activeChat.type === 'broadcast' 
                          ? (activeChat.isPersonal ? 'Personal broadcast' : `${activeChat.participants.length - 1} recipients`)
                          : 'Online'
                        }
                      </p>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {getChatMessages(activeChat.id).map(message => (
                      <div
                        key={message.id}
                        className={`flex ${message.senderId === user.id ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                            message.senderId === user.id
                              ? 'bg-purple-600 text-white'
                              : 'bg-white/10 text-white'
                          }`}
                        >
                          {message.type === 'image' ? (
                            <img
                              src={message.content}
                              alt="Shared image"
                              className="max-w-full h-auto rounded-lg"
                            />
                          ) : (
                            <p>{message.content}</p>
                          )}
                          <p className={`text-xs mt-1 ${
                            message.senderId === user.id ? 'text-purple-200' : 'text-white/70'
                          }`}>
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-white/20">
                    <div className="flex items-center space-x-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={sendImage}
                        ref={fileInputRef}
                        className="hidden"
                      />
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                      >
                        <Image className="w-5 h-5" />
                      </button>
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <button
                        onClick={sendMessage}
                        disabled={!newMessage.trim()}
                        className="p-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <MessageCircle className="w-16 h-16 text-white/30 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">Select a conversation</h3>
                    <p className="text-white/70">Choose a chat from the sidebar to start messaging</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Broadcast Creation Modal */}
        {showBroadcastModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 max-w-md w-full max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Create Broadcast</h2>
                <button
                  onClick={() => {
                    setShowBroadcastModal(false);
                    setBroadcastName('');
                    setSelectedUsers([]);
                  }}
                  className="text-white/70 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Broadcast Name
                  </label>
                  <input
                    type="text"
                    value={broadcastName}
                    onChange={(e) => setBroadcastName(e.target.value)}
                    placeholder="Enter broadcast name..."
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Select Recipients ({selectedUsers.length} selected)
                  </label>
                  <div className="max-h-48 overflow-y-auto space-y-2">
                    {users
                      .filter(u => u.id !== user?.id)
                      .map(availableUser => (
                        <button
                          key={availableUser.id}
                          onClick={() => toggleUserSelection(availableUser.id)}
                          className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors text-left ${
                            selectedUsers.includes(availableUser.id)
                              ? 'bg-green-600/30 border border-green-500/50'
                              : 'bg-white/5 hover:bg-white/10'
                          }`}
                        >
                          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="text-white font-medium">{availableUser.username}</p>
                            <p className="text-white/70 text-xs">{availableUser.email}</p>
                          </div>
                          {selectedUsers.includes(availableUser.id) && (
                            <Check className="w-5 h-5 text-green-400" />
                          )}
                        </button>
                      ))}
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      setShowBroadcastModal(false);
                      setBroadcastName('');
                      setSelectedUsers([]);
                    }}
                    className="flex-1 px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/20 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={createBroadcast}
                    disabled={!broadcastName.trim() || selectedUsers.length === 0}
                    className="flex-1 px-4 py-3 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                  >
                    Create Broadcast
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatSystem;