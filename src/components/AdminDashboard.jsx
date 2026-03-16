import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaEdit, FaTrash, FaPlus, FaSave, FaTimes, FaChartBar, FaNewspaper, FaUsers, FaEye, FaClock, FaCalendarAlt } from 'react-icons/fa';
import { blogData } from '../data/blogData';

// This is a placeholder admin dashboard
// In production, this would connect to a real backend API
const AdminDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [showEditor, setShowEditor] = useState(false);
  const [stats, setStats] = useState({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    totalViews: 0
  });

  useEffect(() => {
    // Load posts from data (replace with API call)
    setPosts(blogData.posts);
    setStats({
      totalPosts: blogData.posts.length,
      publishedPosts: blogData.posts.filter(p => p.status === 'published').length,
      draftPosts: blogData.posts.filter(p => p.status === 'draft').length,
      totalViews: 1234 // Placeholder
    });
  }, []);

  const handleCreatePost = () => {
    setEditingPost({
      title: '',
      content: '',
      excerpt: '',
      category: '',
      tags: [],
      status: 'draft',
      publishedAt: new Date().toISOString()
    });
    setShowEditor(true);
  };

  const handleEditPost = (post) => {
    setEditingPost({ ...post });
    setShowEditor(true);
  };

  const handleSavePost = () => {
    // Placeholder for save functionality
    console.log('Saving post:', editingPost);
    setShowEditor(false);
    setEditingPost(null);
  };

  const handleDeletePost = (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      // Placeholder for delete functionality
      console.log('Deleting post:', postId);
      setPosts(posts.filter(p => p.id !== postId));
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (showEditor) {
    return (
      <div className="min-h-screen bg-dark p-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-glass-gradient backdrop-blur-3xl border border-white/20 rounded-2xl p-8 shadow-glass-lg"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                {editingPost.id ? 'Edit Post' : 'Create New Post'}
              </h2>
              <button
                onClick={() => setShowEditor(false)}
                className="p-2 text-gray-400 hover:text-white transition-colors duration-200"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={editingPost.title}
                  onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                  className="w-full px-4 py-3 bg-glass-gradient backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter post title..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Excerpt
                </label>
                <textarea
                  value={editingPost.excerpt}
                  onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 bg-glass-gradient backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  placeholder="Brief description of the post..."
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    value={editingPost.category}
                    onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                    className="w-full px-4 py-3 bg-glass-gradient backdrop-blur-md border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select category</option>
                    <option value="IoT">IoT</option>
                    <option value="Backend Development">Backend Development</option>
                    <option value="Frontend Development">Frontend Development</option>
                    <option value="Machine Learning">Machine Learning</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Status
                  </label>
                  <select
                    value={editingPost.status}
                    onChange={(e) => setEditingPost({ ...editingPost, status: e.target.value })}
                    className="w-full px-4 py-3 bg-glass-gradient backdrop-blur-md border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Content
                </label>
                <textarea
                  value={editingPost.content}
                  onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                  rows={20}
                  className="w-full px-4 py-3 bg-glass-gradient backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none font-mono text-sm"
                  placeholder="Write your post content in Markdown..."
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-400">
                  Last saved: {formatDate(editingPost.updatedAt || editingPost.publishedAt)}
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setShowEditor(false)}
                    className="px-6 py-3 bg-glass-gradient backdrop-blur-md border border-white/20 rounded-lg text-gray-300 hover:bg-white/10 transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSavePost}
                    className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors duration-200"
                  >
                    <FaSave />
                    {editingPost.id ? 'Update' : 'Publish'}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Blog Admin Dashboard</h1>
              <p className="text-gray-400">Manage your blog posts and content</p>
            </div>
            <button
              onClick={handleCreatePost}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors duration-200"
            >
              <FaPlus />
              New Post
            </button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-glass-gradient backdrop-blur-3xl border border-white/20 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Total Posts</p>
                <p className="text-2xl font-bold text-white">{stats.totalPosts}</p>
              </div>
              <FaNewspaper className="w-8 h-8 text-primary/50" />
            </div>
          </div>

          <div className="bg-glass-gradient backdrop-blur-3xl border border-white/20 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Published</p>
                <p className="text-2xl font-bold text-white">{stats.publishedPosts}</p>
              </div>
              <FaEye className="w-8 h-8 text-green-500/50" />
            </div>
          </div>

          <div className="bg-glass-gradient backdrop-blur-3xl border border-white/20 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Drafts</p>
                <p className="text-2xl font-bold text-white">{stats.draftPosts}</p>
              </div>
              <FaEdit className="w-8 h-8 text-yellow-500/50" />
            </div>
          </div>

          <div className="bg-glass-gradient backdrop-blur-3xl border border-white/20 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Total Views</p>
                <p className="text-2xl font-bold text-white">{stats.totalViews.toLocaleString()}</p>
              </div>
              <FaChartBar className="w-8 h-8 text-blue-500/50" />
            </div>
          </div>
        </motion.div>

        {/* Posts Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-glass-gradient backdrop-blur-3xl border border-white/20 rounded-2xl overflow-hidden shadow-glass"
        >
          <div className="p-6 border-b border-white/20">
            <h2 className="text-xl font-semibold text-white">All Posts</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-glass-gradient backdrop-blur-sm">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Published
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {posts.map((post, index) => (
                  <motion.tr
                    key={post.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="hover:bg-white/5 transition-colors duration-200"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-white">{post.title}</div>
                        <div className="text-sm text-gray-400">{post.excerpt}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-glass-gradient backdrop-blur-sm border border-white/10 rounded text-xs text-gray-300">
                        {post.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        post.status === 'published'
                          ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                          : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                      }`}>
                        {post.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <FaCalendarAlt className="w-3 h-3" />
                          {formatDate(post.publishedAt)}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditPost(post)}
                          className="p-2 text-blue-400 hover:text-blue-300 transition-colors duration-200"
                          title="Edit post"
                        >
                          <FaEdit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="p-2 text-red-400 hover:text-red-300 transition-colors duration-200"
                          title="Delete post"
                        >
                          <FaTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {posts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">No posts found</div>
              <button
                onClick={handleCreatePost}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors duration-200"
              >
                <FaPlus />
                Create Your First Post
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
