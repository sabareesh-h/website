import React, { useState, useEffect } from 'react';
import { Clock, ArrowRight, Calendar, BookOpen, Lightbulb, Coffee, Feather } from './icons';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import fm from 'front-matter';

export function BlogPage({ onPageChange, onPostSelect }: { onPageChange: (page: string) => void, onPostSelect: (post: any) => void }) {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const postModules = import.meta.glob('../posts/*.md', { as: 'raw' });
      const postPromises = Object.values(postModules).map(async (postContentPromise) => {
        const postContent = await postContentPromise();
        return fm(postContent);
      });
      const loadedPosts = await Promise.all(postPromises);
      setPosts(loadedPosts);
    };

    fetchPosts();
  }, []);

  const categories = ["All", "Personal", "Learning", "Design", "Philosophy", "Journey", "Life"];

  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Feather className="w-6 h-6 text-primary" />
            <span className="text-sm text-muted-foreground">Thoughts & Discoveries</span>
          </div>
          <h1 className="text-4xl lg:text-5xl mb-4">My Journal</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            A collection of thoughts, learnings, and reflections from my journey in technology
            and creativity. New insights shared weekly, straight from the heart and mind.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Categories Filter */}
        <section className="mb-12">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "default" : "outline"}
                size="sm"
                className={`rounded-full ${
                  category === "All"
                    ? "bg-primary hover:bg-primary/90"
                    : "border-primary/20 hover:bg-primary/5"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section>
          <div className="flex items-center gap-2 mb-8">
            <Coffee className="w-5 h-5 text-primary" />
            <h2 className="text-2xl">Recent Musings</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <Card key={index} onClick={() => onPostSelect(post)} className="overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-300 border border-primary/10 hover:border-primary/20">
                <div className="aspect-[4/3]">
                  <ImageWithFallback
                    src={post.attributes.image}
                    alt={post.attributes.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6 bg-gradient-to-b from-card to-primary/5">
                  <div className="flex items-center gap-4 mb-3">
                    <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border-primary/20">{post.attributes.category}</Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {post.attributes.readTime}
                    </div>
                  </div>
                  <h3 className="text-lg mb-2 group-hover:text-primary transition-colors leading-tight">
                    {post.attributes.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
                    {post.attributes.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {post.attributes.date}
                    </div>
                    <Button variant="ghost" size="sm" className="p-1 h-auto hover:bg-primary/10">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Load More */}
        <section className="text-center mt-12">
          <Button variant="outline" size="lg" className="border-primary/20 hover:bg-primary/5">
            Load More Stories
          </Button>
        </section>

        {/* Newsletter Signup */}
        <section className="mt-20 p-8 bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl text-center border border-primary/20">
          <BookOpen className="w-8 h-8 mx-auto mb-4 text-primary" />
          <h3 className="text-2xl mb-4">Join My Journey</h3>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto leading-relaxed">
            Subscribe to receive my latest thoughts, discoveries, and reflections.
            No spam, just authentic sharing from one curious mind to another.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded-lg border border-primary/20 bg-background focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <Button className="bg-primary hover:bg-primary/90">Subscribe</Button>
          </div>
        </section>
      </div>
    </div>
  );
}
