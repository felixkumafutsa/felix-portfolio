import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaUser, FaClock, FaTag, FaSearch, FaFilter, FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { blogAPI } from '../data/blogData';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadBlogData();
  }, [currentPage, selectedCategory, searchQuery]);

  const loadBlogData = async () => {
    try {
      setLoading(true);
      let result;
      
      if (searchQuery) {
        result = await blogAPI.searchPosts(searchQuery, currentPage);
      } else {
        result = await blogAPI.getPosts(
          currentPage, 
          6, 
          selectedCategory !== 'all' ? selectedCategory : null
        );
      }
      
      setPosts(result.posts);
      setTotalPages(result.pagination.totalPages);
    } catch (error) {
      console.error('Error loading blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categories = await blogAPI.getCategories();
        setCategories(categories);
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    };
    loadCategories();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    loadBlogData();
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substr(0, maxLength) + '...';
  };

  return (
    <section id="blog" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Blog & Insights
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Sharing my thoughts on IoT development, software engineering, and emerging technologies
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="bg-glass-gradient backdrop-blur-3xl border border-white/20 rounded-2xl p-6 shadow-glass">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Form */}
              <form onSubmit={handleSearch} className="flex-1">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-glass-gradient backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  />
                </div>
              </form>

              {/* Category Filter */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-3 bg-glass-gradient backdrop-blur-md border border-white/20 rounded-lg text-white hover:bg-white/10 transition-all duration-200"
                >
                  <FaFilter />
                  <span className="hidden sm:inline">Filter</span>
                </button>
              </div>
            </div>

            {/* Category Filters */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 pt-4 border-t border-white/20"
              >
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setCurrentPage(1);
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedCategory === 'all'
                        ? 'bg-primary text-white'
                        : 'bg-glass-gradient backdrop-blur-md border border-white/20 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    All Posts
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        setSelectedCategory(category.name);
                        setCurrentPage(1);
                      }}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        selectedCategory === category.name
                          ? 'bg-primary text-white'
                          : 'bg-glass-gradient backdrop-blur-md border border-white/20 text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      {category.name} ({category.count})
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Loading State */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-glass-gradient backdrop-blur-3xl border border-white/20 rounded-2xl overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-700"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-700 rounded mb-3"></div>
                  <div className="h-4 bg-gray-700 rounded mb-2"></div>
                  <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Blog Posts Grid */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {posts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-glass-gradient backdrop-blur-3xl border border-white/20 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 hover:shadow-glass-lg"
              >
                {/* Featured Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary/90 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-primary transition-colors duration-200 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-300 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-glass-gradient backdrop-blur-sm border border-white/10 rounded text-xs text-gray-300"
                      >
                        <FaTag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Meta Information */}
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <FaUser className="w-3 h-3" />
                        {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaClock className="w-3 h-3" />
                        {post.readingTime}
                      </span>
                    </div>
                    <span className="flex items-center gap-1">
                      <FaCalendarAlt className="w-3 h-3" />
                      {formatDate(post.publishedAt)}
                    </span>
                  </div>
                </div>

                {/* Read More Button */}
                <div className="px-6 pb-6">
                  <a
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors duration-200"
                  >
                    Read More
                    <FaArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}

        {/* No Results */}
        {!loading && posts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="bg-glass-gradient backdrop-blur-3xl border border-white/20 rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-semibold text-white mb-4">
                No articles found
              </h3>
              <p className="text-gray-300 mb-6">
                Try adjusting your search terms or browse different categories.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setCurrentPage(1);
                }}
                className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors duration-200"
              >
                Clear Filters
              </button>
            </div>
          </motion.div>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex justify-center items-center gap-4 mt-12"
          >
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center gap-2 px-4 py-2 bg-glass-gradient backdrop-blur-md border border-white/20 rounded-lg text-white hover:bg-white/10 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaChevronLeft />
              Previous
            </button>

            <div className="flex items-center gap-2">
              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                const isCurrentPage = page === currentPage;
                const isNearCurrentPage = Math.abs(page - currentPage) <= 2 || page === 1 || page === totalPages;

                if (!isNearCurrentPage && page !== 1 && page !== totalPages) {
                  return null;
                }

                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-10 h-10 rounded-lg font-medium transition-all duration-200 ${
                      isCurrentPage
                        ? 'bg-primary text-white'
                        : 'bg-glass-gradient backdrop-blur-md border border-white/20 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center gap-2 px-4 py-2 bg-glass-gradient backdrop-blur-md border border-white/20 rounded-lg text-white hover:bg-white/10 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <FaChevronRight />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Blog;
