import React, { useState } from 'react';
import {
  MessageSquare,
  Heart,
  Share2,
  PlusCircle,
  Filter,
  CheckCircle,
  Sparkles
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

  const categories = ['All', 'Safety Tips', 'Workplace', 'Resources', 'Support'];

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
    <div className="space-y-4 pb-4">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-accent-soft to-primary-soft dark:from-purple-950/60 dark:to-[#1F1733] border border-purple-100 dark:border-purple-900/50 rounded-brand p-4 flex items-center justify-between transition-colors">
        <div>
          <h1 className="text-lg font-bold text-ink dark:text-white flex items-center gap-2">
            <Sparkles size={18} className="text-accent" /> Sakhi Community Hub
          </h1>
          <p className="text-xs text-ink-secondary dark:text-purple-200/70 mt-0.5">
            A trusted space for sharing, learning, and mutual upliftment.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowCreateModal(true)}
          className="px-3 py-2 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-dark transition-all flex items-center gap-1.5 shadow-soft shrink-0 min-h-[40px]"
        >
          <PlusCircle size={15} /> New Post
        </button>
      </div>

      {/* Category filter pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors min-h-[36px] ${
              activeCategory === cat
                ? 'bg-primary text-white shadow-soft font-semibold'
                : 'bg-white dark:bg-[#191426] text-ink-secondary dark:text-purple-200 border border-purple-100 dark:border-purple-900/50 hover:border-purple-200 dark:hover:border-purple-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Posts Feed */}
      <div className="space-y-3.5">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            className="bg-white dark:bg-[#191426] border border-purple-100 dark:border-purple-900/50 rounded-brand p-4 shadow-soft transition-all hover:border-purple-200 dark:hover:border-purple-700 text-left"
          >
            {/* Author bar */}
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-primary-soft dark:bg-[#2B2342] text-primary-dark dark:text-purple-200 font-bold text-xs flex items-center justify-center border border-primary-200 dark:border-purple-700/60">
                  {post.author.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-ink dark:text-white">{post.author}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-50 dark:bg-purple-950/60 text-primary-dark dark:text-purple-200 border border-purple-100 dark:border-purple-800/60">
                      {post.badge}
                    </span>
                  </div>
                  <span className="text-[11px] text-ink-muted dark:text-purple-300/60">{post.time}</span>
                </div>
              </div>

              <span className="text-[11px] font-semibold text-accent bg-accent-soft dark:bg-pink-950/40 px-2 py-0.5 rounded-full">
                {post.category}
              </span>
            </div>

            {/* Post Title & Content */}
            <h2 className="text-sm font-bold text-ink dark:text-white mb-1.5 leading-snug">
              {post.title}
            </h2>
            <p className="text-xs text-ink-secondary dark:text-purple-200/70 leading-relaxed mb-3">
              {post.content}
            </p>

            {/* Post Actions */}
            <div className="pt-2.5 border-t border-purple-50 dark:border-purple-900/40 flex items-center justify-between text-ink-muted dark:text-purple-300/70 text-xs">
              <button
                type="button"
                onClick={() => toggleLike(post.id)}
                className={`flex items-center gap-1.5 py-1 px-2 rounded-lg transition-colors min-h-[36px] ${
                  post.isLiked
                    ? 'text-accent font-semibold bg-accent-soft/60'
                    : 'hover:text-accent hover:bg-surface-alt'
                }`}
                aria-label={post.isLiked ? 'Unlike post' : 'Like post'}
              >
                <Heart size={15} fill={post.isLiked ? 'currentColor' : 'none'} />
                <span>{post.likes}</span>
              </button>

              <button
                type="button"
                onClick={() => alert(`Opening ${post.comments} comments for: ${post.title}`)}
                className="flex items-center gap-1.5 py-1 px-2 rounded-lg hover:text-primary hover:bg-surface-alt transition-colors min-h-[36px]"
              >
                <MessageSquare size={15} />
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
                className="p-1.5 rounded-lg hover:text-ink hover:bg-surface-alt transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center"
                aria-label="Share post"
              >
                <Share2 size={15} />
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* New Post Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Share with SakhiBridge"
        description="Write your thought, question, or advice. Community guidelines apply."
        confirmText="Publish Post"
        onConfirm={handleCreatePost}
        cancelText="Cancel"
      >
        <form onSubmit={handleCreatePost} className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-ink dark:text-purple-100 mb-1">
              Category
            </label>
            <select
              value={newPost.category}
              onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
              className="w-full text-xs min-h-[40px] px-3 py-2 bg-white dark:bg-[#201A30] border border-purple-100 dark:border-purple-800/50 rounded-brand text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-100"
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
              Title
            </label>
            <input
              type="text"
              placeholder="A brief summary of your post..."
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              required
              className="w-full text-xs min-h-[40px] px-3 py-2 bg-white dark:bg-[#201A30] border border-purple-100 dark:border-purple-800/50 rounded-brand text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-100 placeholder:text-ink-muted/70 dark:placeholder:text-purple-300/40"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink dark:text-purple-100 mb-1">
              Content
            </label>
            <textarea
              rows={4}
              placeholder="Write your story, experience, or query here..."
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
              required
              className="w-full text-xs p-3 bg-white dark:bg-[#201A30] border border-purple-100 dark:border-purple-800/50 rounded-brand text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-100 resize-none placeholder:text-ink-muted/70 dark:placeholder:text-purple-300/40"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};

