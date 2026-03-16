import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { FaCalendarAlt, FaUser, FaClock, FaTag, FaArrowLeft, FaShareAlt, FaBookmark } from 'react-icons/fa';
import { blogAPI } from '../data/blogData';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        setLoading(true);
        const postData = await blogAPI.getPostBySlug(slug);
        
        if (!postData) {
          setError('Post not found');
          return;
        }

        setPost(postData);
        
        // Load related posts
        const related = await blogAPI.getRelatedPosts(postData);
        setRelatedPosts(related);
      } catch (err) {
        setError('Failed to load post');
        console.error('Error loading post:', err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadPost();
    }
  }, [slug]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const sharePost = () => {
    if (navigator.share && post) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const bookmarkPost = () => {
    // Placeholder for bookmark functionality
    // This could integrate with a backend service or localStorage
    alert('Bookmark functionality coming soon!');
  };

  if (loading) {
    return (
      <section className="py-20 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-3/4 mb-8"></div>
            <div className="h-64 bg-gray-700 rounded mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-700 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !post) {
    return (
      <section className="py-20 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-glass-gradient backdrop-blur-3xl border border-white/20 rounded-2xl p-8">
            <h1 className="text-3xl font-bold text-white mb-4">
              {error || 'Post not found'}
            </h1>
            <p className="text-gray-300 mb-8">
              The blog post you're looking for doesn't exist or has been removed.
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors duration-200"
            >
              <FaArrowLeft />
              Back to Blog
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back to Blog */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200"
          >
            <FaArrowLeft />
            Back to Blog
          </Link>
        </motion.div>

        {/* Article Header */}
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-glass-gradient backdrop-blur-3xl border border-white/20 rounded-2xl overflow-hidden shadow-glass-lg"
        >
          {/* Featured Image */}
          <div className="relative h-64 md:h-96 overflow-hidden">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent"></div>
            
            {/* Category Badge */}
            <div className="absolute top-6 left-6">
              <span className="px-4 py-2 bg-primary/90 backdrop-blur-sm text-white text-sm font-medium rounded-full">
                {post.category}
              </span>
            </div>
          </div>

          {/* Article Content */}
          <div className="p-8">
            {/* Title and Meta */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-300">
                <span className="flex items-center gap-2">
                  <FaUser className="w-4 h-4" />
                  {post.author}
                </span>
                <span className="flex items-center gap-2">
                  <FaCalendarAlt className="w-4 h-4" />
                  {formatDate(post.publishedAt)}
                </span>
                <span className="flex items-center gap-2">
                  <FaClock className="w-4 h-4" />
                  {post.readingTime}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 mb-8">
              <button
                onClick={sharePost}
                className="flex items-center gap-2 px-4 py-2 bg-glass-gradient backdrop-blur-md border border-white/20 rounded-lg text-white hover:bg-white/10 transition-all duration-200"
              >
                <FaShareAlt />
                Share
              </button>
              <button
                onClick={bookmarkPost}
                className="flex items-center gap-2 px-4 py-2 bg-glass-gradient backdrop-blur-md border border-white/20 rounded-lg text-white hover:bg-white/10 transition-all duration-200"
              >
                <FaBookmark />
                Bookmark
              </button>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-glass-gradient backdrop-blur-sm border border-white/10 rounded-full text-sm text-gray-300"
                >
                  <FaTag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Article Body */}
            <div className="prose prose-lg prose-invert max-w-none">
              <div 
                className="text-gray-300 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br>') }}
              />
            </div>
          </div>
        </motion.article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16"
          >
            <h2 className="text-2xl font-bold text-white mb-8">Related Posts</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost, index) => (
                <motion.div
                  key={relatedPost.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-glass-gradient backdrop-blur-3xl border border-white/20 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300"
                >
                  <Link to={`/blog/${relatedPost.slug}`} className="block">
                    <div className="relative h-32 overflow-hidden">
                      <img
                        src={relatedPost.featuredImage}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent"></div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-white font-medium mb-2 line-clamp-2 hover:text-primary transition-colors duration-200">
                        {relatedPost.title}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <FaClock className="w-3 h-3" />
                          {relatedPost.readingTime}
                        </span>
                        <span>{formatDate(relatedPost.publishedAt)}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default BlogPost;
