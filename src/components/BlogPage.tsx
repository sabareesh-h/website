import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, ArrowRight, Calendar, BookOpen, Feather, Sparkles, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from 'framer-motion';
import fm from 'front-matter';
import { Footer } from './Footer';

export function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [displayLimit, setDisplayLimit] = useState(30);
  const navigate = useNavigate();

  // Reset limit when category or search changes
  useEffect(() => {
    setDisplayLimit(30);
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postModules = import.meta.glob('../posts/*.md', { query: '?raw', import: 'default' });
        console.log('Found post modules:', Object.keys(postModules));

        const postPromises = Object.values(postModules).map(async (postContentPromise) => {
          try {
            const postContent = await postContentPromise();
            console.log('Raw content sample:', (postContent as string).substring(0, 50));
            const post = fm(postContent as string);
            console.log('Parsed post attributes:', post.attributes);

            if (!post.attributes || !post.attributes.title || !post.attributes.date) {
              console.warn('Missing attributes for post:', post);
              return null;
            }
            // @ts-ignore
            const slug = post.attributes.title.toLowerCase().replace(/\s+/g, '-');
            return { ...post, slug };
          } catch (e) {
            console.error('Error parsing post:', e);
            return null;
          }
        });

        const loadedPosts = (await Promise.all(postPromises)).filter(Boolean);
        console.log('Loaded posts:', loadedPosts);
        // @ts-ignore
        loadedPosts.sort((a, b) => new Date(b.attributes.date).getTime() - new Date(a.attributes.date).getTime());
        setPosts(loadedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handlePostSelect = (post: any) => {
    navigate(`/post/${post.slug}`, { state: { post } });
  };

  const categories = ["All", "Personal", "Learning", "Design", "Philosophy", "Journey", "Life"];

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.attributes.category === selectedCategory;
    const matchesSearch = post.attributes.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.attributes.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const displayedPosts = filteredPosts.slice(0, displayLimit);
  const heroPosts = displayedPosts.slice(0, 2);
  const gridPosts = displayedPosts.slice(2);

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Header */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-primary/10 rounded-[100%] blur-[100px] -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20 flex items-center gap-2">
                <Feather className="w-3 h-3" />
                Thoughts & Discoveries
              </span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 tracking-tight">My Journal</h1>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed">
              A collection of thoughts, learnings, and reflections from my journey in technology
              and creativity.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Controls */}
        <section className="mb-16 space-y-6">
          <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full transition-all ${selectedCategory === category
                    ? "bg-primary hover:bg-primary/90"
                    : "border-white/10 hover:bg-white/5"
                    }`}
                >
                  {category}
                </Button>
              ))}
            </div>

            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
          </div>
        </section>

        {/* Hero Posts (Top 2) */}
        {heroPosts.length > 0 && (
          <section className="mb-12">
            <div className="grid md:grid-cols-2 gap-8">
              {heroPosts.map((post, index) => (
                <motion.div
                  key={post.slug || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handlePostSelect(post)}
                  className="group cursor-pointer"
                >
                  <div className="bg-card/50 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 h-full flex flex-col">
                    <div className="aspect-[16/9] overflow-hidden relative">
                      <ImageWithFallback
                        src={post.attributes.image}
                        alt={post.attributes.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge variant="secondary" className="bg-black/50 backdrop-blur-md text-white border-white/20">
                          {post.attributes.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-8 flex flex-col flex-grow">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {post.attributes.date}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-white/20" />
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.attributes.readTime}
                        </span>
                      </div>
                      <h2 className="text-2xl lg:text-3xl font-bold mb-4 group-hover:text-primary transition-colors leading-tight">
                        {post.attributes.title}
                      </h2>
                      <p className="text-muted-foreground text-base mb-6 line-clamp-3 leading-relaxed flex-grow">
                        {post.attributes.excerpt}
                      </p>
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                        <span className="text-sm font-medium text-primary group-hover:translate-x-1 transition-transform">Read Article</span>
                        <ArrowRight className="w-4 h-4 text-primary -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Remaining Posts Grid */}
        {gridPosts.length > 0 && (
          <section>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {gridPosts.map((post, index) => (
                <motion.div
                  key={post.slug || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + (index * 0.1) }}
                  onClick={() => handlePostSelect(post)}
                  className="group cursor-pointer"
                >
                  <div className="bg-card/50 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 h-full flex flex-col">
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <ImageWithFallback
                        src={post.attributes.image}
                        alt={post.attributes.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge variant="secondary" className="bg-black/50 backdrop-blur-md text-white border-white/20">
                          {post.attributes.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {post.attributes.date}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-white/20" />
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.attributes.readTime}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {post.attributes.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-6 line-clamp-3 leading-relaxed flex-grow">
                        {post.attributes.excerpt}
                      </p>
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                        <span className="text-sm font-medium text-primary group-hover:translate-x-1 transition-transform">Read more</span>
                        <ArrowRight className="w-4 h-4 text-primary -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Load More Button */}
        {displayLimit < filteredPosts.length && (
          <div className="mt-16 flex justify-center">
            <Button
              variant="outline"
              onClick={() => setDisplayLimit(prev => prev + 30)}
              className="rounded-full px-8 py-6 border-white/10 hover:bg-white/5 hover:border-primary/50 transition-all text-muted-foreground hover:text-primary group"
            >
              Load More Articles
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
