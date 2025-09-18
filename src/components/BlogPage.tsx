import React from 'react';
import { Clock, ArrowRight, Calendar, BookOpen, Lightbulb, Coffee, Feather } from './icons';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function BlogPage() {
  const featuredPost = {
    title: "Reflections on My First Year of Serious Development",
    excerpt: "A personal journey through the ups and downs of learning to code, the lessons that shaped my understanding, and the realizations that continue to guide my path forward.",
    date: "Jan 15, 2025",
    readTime: "8 min read",
    category: "Personal",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx8fDE3NTc4NzUxMjl8MA&ixlib=rb-4.1.0&q=80&w=1080"
  };

  const blogPosts = [
    {
      title: "The Beauty of Problem-Solving",
      excerpt: "Why I fell in love with debugging and how it taught me patience, persistence, and the joy of small victories.",
      date: "Jan 10, 2025",
      readTime: "6 min read",
      category: "Learning",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx8fDE3NTc4NzUxMjl8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      title: "Design Lessons from Nature",
      excerpt: "How observing patterns in nature influenced my approach to creating digital interfaces and user experiences.",
      date: "Jan 5, 2025",
      readTime: "5 min read",
      category: "Design",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx8fDE3NTc4NzUxMjl8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      title: "When Code Becomes Poetry",
      excerpt: "Exploring the artistic side of programming and finding rhythm, elegance, and meaning in well-crafted code.",
      date: "Dec 28, 2024",
      readTime: "7 min read",
      category: "Philosophy",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx8fDE3NTc4NzUxMjl8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      title: "Building My First Real Project",
      excerpt: "The story behind my first complete application - the challenges, breakthroughs, and lessons that shaped my approach to development.",
      date: "Dec 20, 2024",
      readTime: "9 min read",
      category: "Journey",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx8fDE3NTc4NzUxMjl8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      title: "The Art of Asking Questions",
      excerpt: "How learning to ask the right questions transformed my learning process and deepened my understanding of technology.",
      date: "Dec 15, 2024",
      readTime: "4 min read",
      category: "Learning",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx8fDE3NTc4NzUxMjl8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      title: "Finding Balance in the Digital Age",
      excerpt: "Thoughts on maintaining creativity, health, and human connection while immersed in the world of technology.",
      date: "Dec 10, 2024",
      readTime: "6 min read",
      category: "Life",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx8fDE3NTc4NzUxMjl8MA&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ];

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
        {/* Featured Post */}
        <section className="mb-16">
          <div className="flex items-center gap-2 mb-8">
            <Lightbulb className="w-5 h-5 text-primary" />
            <h2 className="text-2xl">Featured Reflection</h2>
          </div>
          <Card className="overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-300 border border-primary/20 hover:border-primary/30">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="aspect-[4/3] lg:aspect-auto">
                <ImageWithFallback
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-8 lg:p-12 flex flex-col justify-center bg-gradient-to-br from-card to-primary/5">
                <div className="flex items-center gap-4 mb-4">
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">{featuredPost.category}</Badge>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {featuredPost.date}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {featuredPost.readTime}
                  </div>
                </div>
                <h3 className="text-2xl lg:text-3xl mb-4 leading-tight">{featuredPost.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">{featuredPost.excerpt}</p>
                <Button variant="outline" className="self-start group border-primary/20 hover:bg-primary/5">
                  Read Full Story
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </div>
          </Card>
        </section>

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
            {blogPosts.map((post, index) => (
              <Card key={index} className="overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-300 border border-primary/10 hover:border-primary/20">
                <div className="aspect-[4/3]">
                  <ImageWithFallback
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6 bg-gradient-to-b from-card to-primary/5">
                  <div className="flex items-center gap-4 mb-3">
                    <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border-primary/20">{post.category}</Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </div>
                  </div>
                  <h3 className="text-lg mb-2 group-hover:text-primary transition-colors leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {post.date}
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