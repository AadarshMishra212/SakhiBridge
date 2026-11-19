import React, { useState } from 'react';
import {
  MessageSquare,
  Heart,
  Share2,
  PlusCircle,
  Filter,
  CheckCircle,
  Sparkles,
  Shield,
  Lock,
  TrendingUp,
  Info
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { PrimaryButton } from '../components/PrimaryButton';
import { Modal } from '../components/Modal';

const INITIAL_POSTS = [
  {
    id: 1,
    author: 'Aanya K.',
    badge: 'Verified Member',
    category: 'Safety Tips',
    time: '2 hours ago',
    title: 'Safe commute tips on Yellow Line metro late evenings',
    content:
      'Always enter through coach 1 (women-only coach) or stand right near the driver cabin. The helpline booth near Gate 2 at Rajiv Chowk is manned 24/7!',
    likes: 24,
    comments: 8,
    isLiked: false
  },
  {
    id: 2,
    author: 'Anonymous Sakhi',
    badge: 'Confidential Post',
    category: 'Workplace',
    time: '5 hours ago',
    title: 'How our office internal committee resolved PoSH complaints effectively',
    content:
      'If anyone is hesitating to file an IC report, please know you are entitled to interim relief, change of team reporting, and strict confidentiality under law.',
    likes: 47,
    comments: 15,
    isLiked: true
  },
  {
    id: 3,
    author: 'Rhea Sen',
    badge: 'Community Volunteer',
    category: 'Resources',
    time: '1 day ago',
    title: 'Free weekend self-defense and digital awareness workshop',
    content:
      'Organizing a peer-led physical awareness and cyber stalker prevention webinar this Saturday at 4 PM. Open to all sisters in this network!',
    likes: 62,
    comments: 21,
    isLiked: false
  }
];

export const Community = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [activeCategory, setActiveCategory] = useState('All');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '', category: 'General' });

  const categories = [
    { name: 'All', count: posts.length },
    { name: 'Safety Tips', count: posts.filter((p) => p.category === 'Safety Tips').length },
    { name: 'Workplace', count: posts.filter((p) => p.category === 'Workplace').length },
    { name: 'Resources', count: posts.filter((p) => p.category === 'Resources').length },
    { name: 'Support', count: posts.filter((p) => p.category === 'Support').length }
  ];

  const filteredPosts =
    activeCategory === 'All'
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  const toggleLike = (postId) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            isLiked: !p.isLiked,
            likes: p.isLiked ? p.likes - 1 : p.likes + 1
          };
        }
        return p;
      })
    );
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.content.trim()) return;

    const created = {
      id: Date.now(),
      author: user?.name || 'Anonymous Sakhi',
      badge: 'Community Member',
      category: newPost.category,
      time: 'Just now',
      title: newPost.title.trim(),
      content: newPost.content.trim(),
      likes: 1,
      comments: 0,
      isLiked: true
    };

    setPosts([created, ...posts]);
    setNewPost({ title: '', content: '', category: 'General' });
    setShowCreateModal(false);
  };

  return (
    <div className="space-y-6 pb-6">
      {/* Top Banner (Responsive Header Bar) */}
      <div className="bg-gradient-to-r from-accent-soft via-primary-soft to-purple-100/70 dark:from-purple-950/60 dark:via-[#1F1733] dark:to-[#171226] border border-purple-100 dark:border-purple-900/50 rounded-2xl sm:rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition-colors shadow-soft">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/70 dark:bg-purple-900/40 text-primary dark:text-primary-light border border-purple-200/50 dark:border-purple-700/50 mb-2">
            <Sparkles size={14} className="text-accent" /> Safe & Anonymous Sisterhood
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-ink dark:text-white">
            Sakhi Community Hub
          </h1>
          <p className="text-xs sm:text-sm text-ink-secondary dark:text-purple-200/70 mt-1 max-w-xl">
            A trusted space for sharing verified commute experiences, workplace advice, legal insights, and mutual solidarity.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowCreateModal(true)}
          className="px-4 sm:px-5 py-2.5 rounded-xl bg-primary text-white text-xs sm:text-sm font-semibold hover:bg-primary-dark transition-all flex items-center justify-center gap-2 shadow-soft shrink-0 min-h-touch active:scale-95"
        >
          <PlusCircle size={17} /> Share Story
        </button>
      </div>

      {/* Main Responsive Grid Layout (Stacked on Mobile, 2 Columns on Laptop / Desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Sidebar (Desktop Filters & Community Guidelines) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Mobile Category Scroll (Hidden on Laptop) */}
          <div className="flex lg:hidden items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors min-h-[36px] ${
                  activeCategory === cat.name
                    ? 'bg-primary text-white shadow-soft font-semibold'
                    : 'bg-white dark:bg-[#161126] text-ink-secondary dark:text-purple-200 border border-purple-100 dark:border-purple-900/50 hover:border-purple-200 dark:hover:border-purple-700'
                }`}
              >
                {cat.name} ({cat.count})
              </button>
            ))}
          </div>

          {/* Desktop Categories Card (Hidden on Mobile) */}
          <div className="hidden lg:block bg-white dark:bg-[#161126] border border-purple-100 dark:border-purple-900/50 rounded-2xl p-5 shadow-soft">
            <h2 className="text-xs font-bold uppercase tracking-wider text-ink-muted dark:text-purple-300/70 mb-3 flex items-center gap-1.5">
              <Filter size={14} /> Topic Circles
            </h2>
            <nav className="space-y-1.5" aria-label="Topic circles">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all text-left min-h-[40px] ${
                    activeCategory === cat.name
                      ? 'bg-primary text-white shadow-soft'
                      : 'text-ink-secondary dark:text-purple-200/80 hover:bg-surface-alt dark:hover:bg-[#201833] hover:text-ink dark:hover:text-white'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-full ${
                      activeCategory === cat.name
                        ? 'bg-white/25 text-white'
                        : 'bg-purple-50 dark:bg-purple-950/60 text-primary dark:text-primary-light'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          {/* Community Trust Guidelines */}
          <div className="bg-white dark:bg-[#161126] border border-purple-100 dark:border-purple-900/50 rounded-2xl p-5 shadow-soft space-y-3 text-left">
            <div className="flex items-center gap-2 text-primary dark:text-primary-light font-bold text-xs">
              <Shield size={16} />
              <span>Safe Space Standards</span>
            </div>
            <ul className="text-xs text-ink-secondary dark:text-purple-200/70 space-y-2 leading-relaxed">
              <li className="flex items-start gap-2">
                <Lock size={13} className="text-accent shrink-0 mt-0.5" />
                <span>Confidential identity: You can post anonymously anytime.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={13} className="text-emerald-500 shrink-0 mt-0.5" />
                <span>Zero tolerance for harassment or personal information leaks.</span>
              </li>
              <li className="flex items-start gap-2">
                <Info size={13} className="text-primary shrink-0 mt-0.5" />
                <span>Legal primers and verified resources pinned for reference.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Feed Column (Feed of Stories) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-ink dark:text-white">
              Showing {filteredPosts.length} posts in <span className="text-primary dark:text-primary-light font-extrabold">{activeCategory}</span>
            </span>
            <span className="text-xs text-ink-muted dark:text-purple-300/60 flex items-center gap-1">
              <TrendingUp size={13} /> Active Circle Feed
            </span>
          </div>

          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white dark:bg-[#161126] border border-purple-100 dark:border-purple-900/50 rounded-2xl p-5 sm:p-6 shadow-soft transition-all hover:border-purple-200 dark:hover:border-purple-700 text-left"
              >
                {/* Author bar */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary-soft dark:bg-[#2B2342] text-primary-dark dark:text-purple-200 font-bold text-xs flex items-center justify-center border border-primary-200 dark:border-purple-700/60 shadow-xs">
                      {post.author.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-bold text-ink dark:text-white">{post.author}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950/60 text-primary-dark dark:text-purple-200 border border-purple-100 dark:border-purple-800/60">
                          {post.badge}
                        </span>
                      </div>
                      <span className="text-[11px] text-ink-muted dark:text-purple-300/60">{post.time}</span>
                    </div>
                  </div>

                  <span className="text-xs font-semibold text-accent bg-accent-soft dark:bg-pink-950/40 px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>

                {/* Post Title & Content */}
                <h2 className="text-sm sm:text-base font-bold text-ink dark:text-white mb-2 leading-snug">
                  {post.title}
                </h2>
                <p className="text-xs sm:text-sm text-ink-secondary dark:text-purple-200/80 leading-relaxed mb-4">
                  {post.content}
                </p>

                {/* Post Actions */}
                <div className="pt-3 border-t border-purple-50 dark:border-purple-900/40 flex items-center justify-between text-ink-muted dark:text-purple-300/70 text-xs">
                  <button
                    type="button"
                    onClick={() => toggleLike(post.id)}
                    className={`flex items-center gap-1.5 py-1.5 px-3 rounded-xl transition-colors min-h-[36px] ${
                      post.isLiked
                        ? 'text-accent font-semibold bg-accent-soft/70 dark:bg-pink-950/50'
                        : 'hover:text-accent hover:bg-surface-alt dark:hover:bg-purple-900/30'
                    }`}
                    aria-label={post.isLiked ? 'Unlike post' : 'Like post'}
                  >
                    <Heart size={16} fill={post.isLiked ? 'currentColor' : 'none'} />
                    <span>{post.likes}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => alert(`Opening comments for: ${post.title}`)}
                    className="flex items-center gap-1.5 py-1.5 px-3 rounded-xl hover:text-primary dark:hover:text-primary-light hover:bg-surface-alt dark:hover:bg-purple-900/30 transition-colors min-h-[36px]"
                  >
                    <MessageSquare size={16} />
                    <span>{post.comments} Comments</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({ title: post.title, text: post.content, url: window.location.href });
                      } else {
                        alert('Story link copied to clipboard!');
                      }
                    }}
                    className="p-2 rounded-xl hover:text-ink dark:hover:text-white hover:bg-surface-alt dark:hover:bg-purple-900/30 transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center"
                    aria-label="Share post"
                  >
                    <Share2 size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* New Post Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Share with SakhiBridge"
        description="Write your thought, question, or safety advice. Community guidelines apply."
        confirmText="Publish Post"
        onConfirm={handleCreatePost}
        cancelText="Cancel"
      >
        <form onSubmit={handleCreatePost} className="space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-ink dark:text-purple-100 mb-1">
              Category Circle
            </label>
            <select
              value={newPost.category}
              onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
              className="w-full text-xs min-h-[42px] px-3 py-2 bg-white dark:bg-[#201A30] border border-purple-100 dark:border-purple-800/50 rounded-brand text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-100"
            >
              <option value="Safety Tips">Safety Tips</option>
              <option value="Workplace">Workplace</option>
              <option value="Resources">Resources</option>
              <option value="Support">Support</option>
              <option value="General">General</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink dark:text-purple-100 mb-1">
              Story Title
            </label>
            <input
              type="text"
              placeholder="A brief summary of your experience or query..."
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              required
              className="w-full text-xs min-h-[42px] px-3.5 py-2.5 bg-white dark:bg-[#201A30] border border-purple-100 dark:border-purple-800/50 rounded-brand text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-100 placeholder:text-ink-muted/70 dark:placeholder:text-purple-300/40"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink dark:text-purple-100 mb-1">
              Content & Details
            </label>
            <textarea
              rows={5}
              placeholder="Write your story, location tips, or question here..."
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
              required
              className="w-full text-xs p-3.5 bg-white dark:bg-[#201A30] border border-purple-100 dark:border-purple-800/50 rounded-brand text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-100 resize-none placeholder:text-ink-muted/70 dark:placeholder:text-purple-300/40"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};
