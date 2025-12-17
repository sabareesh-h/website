import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, ArrowRight, Calendar, BookOpen, Lightbulb, Coffee, Feather, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from 'framer-motion';
import fm from 'front-matter';

export function IdeasPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      const postModules = import.meta.glob('../ideas/*.md', { query: '?raw', import: 'default' });
      const postPromises = Object.values(postModules).map(async (postContentPromise) => {
        const postContent = await postContentPromise() as string;
        const post = fm(postContent);
        // Validate essential attributes
        if (!post.attributes || !post.attributes.title || !post.attributes.date) {
          return null; // Skip invalid posts
        }
        const slug = post.attributes.title.toLowerCase().replace(/\s+/g, '-');
        return { ...post, slug };
      });
      const loadedPosts = (await Promise.all(postPromises)).filter(Boolean); // Filter out nulls
      loadedPosts.sort((a: any, b: any) => new Date(b.attributes.date).getTime() - new Date(a.attributes.date).getTime());
      setPosts(loadedPosts);
    };

    fetchPosts();
  }, []);

  const handlePostSelect = (post: any) => {
    navigate(`/post/${post.slug}`, { state: { post } });
  };

  const categories = ["All", "Technology", "Science", "Philosophy", "Social", "Environment"];

  const filteredPosts = selectedCategory === 'All'
    ? posts
    : posts.filter(post => post.attributes.category === selectedCategory);

  const featuredPost = filteredPosts[0];
  const recentPosts = filteredPosts.slice(1);

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Header */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary/5 rounded-[100%] blur-[100px] -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20 flex items-center gap-2">
                <Lightbulb className="w-3 h-3" />
                World-Changing Ideas
              </span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 tracking-tight">My Ideas</h1>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed">
              A collection of unique ideas that might revolutionize the world.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Categories Filter */}
        <section className="mb-16">
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
        </section>

        {/* Featured Post */}
        {featuredPost && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-20"
            onClick={() => handlePostSelect(featuredPost)}
          >
            <div className="group relative grid lg:grid-cols-2 gap-8 bg-card/50 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden hover:border-primary/50 transition-all duration-500 cursor-pointer">
              <div className="aspect-[16/9] lg:aspect-auto overflow-hidden">
                <ImageWithFallback
                  src={featuredPost.attributes.image}
                  alt={featuredPost.attributes.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-6">
                  <Badge className="bg-primary text-primary-foreground hover:bg-primary">Featured Idea</Badge>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {featuredPost.attributes.date}
                  </span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight group-hover:text-primary transition-colors">
                  {featuredPost.attributes.title}
                </h2>
                <p className="text-muted-foreground text-lg mb-8 line-clamp-3 leading-relaxed">
                  {featuredPost.attributes.excerpt}
                </p>
                <div className="flex items-center text-primary font-medium group/btn">
                  Read Idea
                  <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Blog Posts Grid */}
        <section>
          <div className="flex items-center gap-2 mb-8">
            <Sparkles className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-bold">Recent Ideas</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
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
      </div>
    </div>
  );
}
