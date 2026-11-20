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
    <div className="space-y-8 pb-8">
      {/* Top Banner (Editorial Header Bar) */}
      <div className="relative overflow-hidden rounded-3xl sm:rounded-4xl bg-gradient-to-br from-[#4A0E17] via-[#360911] to-[#20050A] text-lace p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 transition-colors shadow-float border border-white/10">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-tight bg-white/10 backdrop-blur-md text-[#FFEDD1] border border-white/15 shadow-xs">
            <Sparkles size={14} className="text-primary-light" /> Safe & Anonymous Sisterhood
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#FFEDD1] font-serif tracking-tight">
            Sakhi Community Hub
          </h1>
          <p className="text-xs sm:text-sm text-[#FFEDD1]/85 max-w-xl leading-relaxed font-sans">
            A trusted space for sharing verified commute experiences, workplace advice, legal insights, and mutual solidarity.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowCreateModal(true)}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-primary to-accent text-lace text-xs sm:text-sm font-bold hover:brightness-105 transition-all flex items-center justify-center gap-2 shadow-premium shrink-0 min-h-touch active:scale-95 border border-white/20 cursor-pointer"
        >
          <PlusCircle size={18} /> Share Story
        </button>
      </div>

      {/* Main Responsive Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Sidebar (Desktop Filters & Community Guidelines) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Mobile Category Scroll (Hidden on Laptop) */}
          <div className="flex lg:hidden items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all min-h-[38px] cursor-pointer ${
                  activeCategory === cat.name
                    ? 'bg-gradient-to-r from-[#8E2131] to-[#5A121F] text-lace shadow-soft font-bold'
                    : 'bg-white dark:bg-[#1E1217] text-ink-secondary dark:text-lace/80 border border-burgundy-900/[0.08] dark:border-lace/[0.08] hover:border-primary-300'
                }`}
              >
                {cat.name} ({cat.count})
              </button>
            ))}
          </div>

          {/* Desktop Categories Card (Hidden on Mobile) */}
          <div className="hidden lg:block bg-white dark:bg-[#1E1217] border border-burgundy-900/[0.08] dark:border-lace/[0.08] rounded-3xl p-5 shadow-premium">
            <h2 className="text-xs font-bold uppercase tracking-wider text-ink-muted dark:text-lace/70 mb-3.5 flex items-center gap-2">
              <Filter size={14} className="text-primary" /> Topic Circles
            </h2>
            <nav className="space-y-1.5" aria-label="Topic circles">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all text-left min-h-[42px] cursor-pointer ${
                    activeCategory === cat.name
                      ? 'bg-gradient-to-r from-[#8E2131] to-[#5A121F] text-lace shadow-soft'
                      : 'text-ink-secondary dark:text-lace/80 hover:bg-surface-alt dark:hover:bg-[#281820] hover:text-ink dark:hover:text-lace'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span
                    className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold ${
                      activeCategory === cat.name
                        ? 'bg-white/20 text-lace'
                        : 'bg-burgundy-900/[0.05] dark:bg-white/[0.06] text-primary'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          {/* Community Trust Guidelines */}
          <div className="bg-white dark:bg-[#1E1217] border border-burgundy-900/[0.08] dark:border-lace/[0.08] rounded-3xl p-5 sm:p-6 shadow-premium space-y-3.5 text-left">
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
              <Shield size={16} />
              <span>Safe Space Standards</span>
            </div>
            <ul className="text-xs text-ink-secondary dark:text-lace/80 space-y-2.5 leading-relaxed font-sans">
              <li className="flex items-start gap-2.5">
                <Lock size={14} className="text-accent shrink-0 mt-0.5" />
                <span>Confidential identity: You can post anonymously anytime.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                <span>Zero tolerance for harassment or personal information leaks.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Info size={14} className="text-primary shrink-0 mt-0.5" />
                <span>Legal primers and verified resources pinned for reference.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Feed Column (Feed of Stories) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-ink dark:text-lace">
              Showing {filteredPosts.length} posts in <span className="text-primary font-extrabold">{activeCategory}</span>
            </span>
            <span className="text-xs text-ink-muted dark:text-lace/60 flex items-center gap-1 font-medium">
              <TrendingUp size={13} className="text-primary" /> Active Circle Feed
            </span>
          </div>

          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="group bg-white dark:bg-[#1E1217] border border-burgundy-900/[0.08] dark:border-lace/[0.08] rounded-3xl p-5 sm:p-6 shadow-premium transition-all duration-200 hover:shadow-float hover:border-primary-300 dark:hover:border-primary-600 text-left"
              >
                {/* Author bar */}
                <div className="flex items-center justify-between mb-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#8E2131] to-[#5A121F] text-lace font-bold text-xs flex items-center justify-center border border-white/10 shadow-xs">
                      {post.author.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-bold text-ink dark:text-lace">{post.author}</span>
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-burgundy-900/[0.04] dark:bg-white/[0.06] text-[#5A121F] dark:text-lace border border-burgundy-900/[0.08] dark:border-lace/[0.10]">
                          {post.badge}
                        </span>
                      </div>
                      <span className="text-[11px] text-ink-muted dark:text-lace/60">{post.time}</span>
                    </div>
                  </div>

                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-primary-soft dark:bg-[#281820] text-primary">
                    {post.category}
                  </span>
                </div>

                {/* Post content */}
                <h3 className="text-base sm:text-lg font-bold text-ink dark:text-lace font-serif mb-2 leading-snug">
                  {post.title}
                </h3>
                <p className="text-xs sm:text-sm text-ink-secondary dark:text-lace/80 leading-relaxed font-sans">
                  {post.content}
                </p>

                {/* Footer buttons */}
                <div className="mt-4 pt-3.5 border-t border-burgundy-900/[0.06] dark:border-lace/[0.08] flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => toggleLike(post.id)}
                      className={`flex items-center gap-1.5 text-xs font-bold transition-colors cursor-pointer min-h-[36px] min-w-[36px] ${
                        post.isLiked
                          ? 'text-sos'
                          : 'text-ink-muted dark:text-lace/70 hover:text-sos'
                      }`}
                      aria-label={`${post.likes} likes`}
                    >
                      <Heart size={16} className={post.isLiked ? 'fill-current' : ''} />
                      <span>{post.likes}</span>
                    </button>

                    <span className="flex items-center gap-1.5 text-xs text-ink-muted dark:text-lace/70 font-medium">
                      <MessageSquare size={16} />
                      <span>{post.comments}</span>
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => alert(`Shared post link: "${post.title}" copied to clipboard.`)}
                    className="p-1.5 text-ink-muted dark:text-lace/70 hover:text-ink dark:hover:text-lace hover:bg-surface-alt dark:hover:bg-[#281820] rounded-full transition-colors cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
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

      {/* Create Post Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Share Your Experience"
        icon={PlusCircle}
        confirmText="Publish Story"
        onConfirm={handleCreatePost}
      >
        <form onSubmit={handleCreatePost} className="space-y-4 text-left font-sans">
          <div>
            <label className="block text-xs font-bold text-ink dark:text-lace mb-1.5">
              Topic Circle
            </label>
            <select
              value={newPost.category}
              onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
              className="w-full min-h-[46px] px-3.5 py-2.5 text-xs sm:text-sm text-ink dark:text-lace bg-white dark:bg-[#1E1217] border border-burgundy-900/[0.12] dark:border-lace/[0.14] rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-xs"
            >
              <option value="General">General Support</option>
              <option value="Safety Tips">Safety Tips & Commute</option>
              <option value="Workplace">Workplace & PoSH</option>
              <option value="Resources">Resources & Clinics</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-ink dark:text-lace mb-1.5">
              Story Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Tips on safe auto stands near Noida metro..."
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              className="w-full min-h-[46px] px-3.5 py-2.5 text-xs sm:text-sm text-ink dark:text-lace bg-white dark:bg-[#1E1217] border border-burgundy-900/[0.12] dark:border-lace/[0.14] rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-ink dark:text-lace mb-1.5">
              Your Experience or Advice
            </label>
            <textarea
              required
              rows={4}
              placeholder="Write your story safely. No personal identity information is required..."
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm text-ink dark:text-lace bg-white dark:bg-[#1E1217] border border-burgundy-900/[0.12] dark:border-lace/[0.14] rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-xs"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};
