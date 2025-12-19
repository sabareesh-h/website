import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Calendar, Clock, User, Share2, Bookmark } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion, useScroll, useSpring } from 'framer-motion';
import fm from 'front-matter';
import { slugify } from '../lib/utils';
import { Footer } from './Footer';


export function BlogPostPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const location = useLocation();
  const navigate = useNavigate();
  const { slug } = useParams();
  const [post, setPost] = useState<any>(location.state?.post || null);
  const [loading, setLoading] = useState(!post);



  useEffect(() => {
    if (!post && slug) {
      try {
        const postModules = import.meta.glob('../posts/*.md', { query: '?raw', import: 'default', eager: true });

        const posts = Object.entries(postModules).map(([path, content]) => {
          const parsed = fm(content as string);
          // @ts-ignore
          const postSlug = slugify(parsed.attributes.title || "");
          return { ...parsed, slug: postSlug };
        });

        // @ts-ignore
        const foundPost = posts.find(p => p.slug === slug);
        if (foundPost) {
          setPost(foundPost);
        }
      } catch (error) {
        console.error("Error fetching post:", error);

      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [slug, post]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-2xl font-bold mb-4">Post not found</h1>
        <Button onClick={() => navigate('/blog')}>Back to Blog</Button>

      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-primary origin-left z-[60]"
        style={{ scaleX }}
      />

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-[60vh] min-h-[400px] w-full overflow-hidden mb-12"
      >
        <div className="absolute inset-0">
          <ImageWithFallback
            src={post.attributes.image}
            alt={post.attributes.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8 lg:p-12">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Button
                variant="ghost"
                className="mb-6 text-muted-foreground hover:text-primary pl-0 hover:bg-transparent group"
                onClick={() => navigate('/blog')}
              >
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Back to Blog
              </Button>

              <div className="flex flex-wrap items-center gap-4 mb-6">
                <Badge className="bg-primary text-primary-foreground">{post.attributes.category}</Badge>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  {post.attributes.date}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {post.attributes.readTime}
                </div>
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                {post.attributes.title}
              </h1>

              <div className="flex items-center justify-between border-t border-white/10 pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Sabareesh H</div>
                    <div className="text-xs text-muted-foreground">Author</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="icon" variant="ghost" className="rounded-full hover:bg-white/10">
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="ghost" className="rounded-full hover:bg-white/10">
                    <Bookmark className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="prose prose-invert prose-lg max-w-none
            prose-headings:font-bold prose-headings:tracking-tight
            prose-h1:text-3xl prose-h1:text-primary
            prose-p:leading-loose prose-p:mb-8 prose-p:text-lg
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-img:rounded-2xl prose-img:shadow-xl
            prose-blockquote:border-l-primary prose-blockquote:bg-white/5 prose-blockquote:p-4 prose-blockquote:rounded-r-lg
            prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-black/50 prose-pre:border prose-pre:border-white/10
          "
        >
          <ReactMarkdown
            components={{
              p: ({ node, ...props }) => <p className="mb-8 leading-loose text-lg" {...props} />
            }}
          >
            {post.body}
          </ReactMarkdown>
        </motion.div>

        {/* Post Footer */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Share this article</h3>
            <div className="flex gap-2">
              <Button variant="outline" className="rounded-full border-white/10 hover:bg-white/5">
                Twitter
              </Button>
              <Button variant="outline" className="rounded-full border-white/10 hover:bg-white/5">
                LinkedIn
              </Button>
            </div>
          </div>
        </div>
      </article>
      <Footer />
    </div>
  );
}