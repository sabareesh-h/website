import { Link } from "react-router-dom";
import frontMatter from "front-matter";
import { useMemo } from "react";
import { slugify } from "../lib/utils";

interface BlogPost {
    slug: string;
    title: string;
    date: string;
    image?: string;
    excerpt?: string;
}

export function LatestPosts() {
    const posts = useMemo(() => {
        const modules = import.meta.glob("../posts/*.md", { query: "?raw", import: "default", eager: true });

        return Object.entries(modules)
            .map(([path, content]) => {
                try {
                    const { attributes } = frontMatter<any>(content as string);
                    // Use shared slugify logic
                    const slug = slugify(attributes.title || "");

                    return {
                        slug,
                        title: attributes.title || "Untitled",
                        date: attributes.date || "",
                        image: attributes.image,
                        excerpt: attributes.excerpt,
                    } as BlogPost;
                } catch (e) {
                    console.error(`Failed to parse post: ${path}`, e);
                    return null;
                }
            })
            .filter((post): post is BlogPost => post !== null)
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, []);

    return (
        <section className="py-24 bg-background overflow-hidden space-y-12">
            <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        .animate-scroll-reverse {
          animation: scroll-reverse 40s linear infinite;
        }
        .animate-scroll:hover, .animate-scroll-reverse:hover {
          animation-play-state: paused;
        }
      `}</style>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-end">
                <h2 className="text-4xl md:text-5xl font-serif text-foreground font-bold leading-tight">
                    Latest <span className="italic text-muted-foreground">writings</span>
                </h2>

                <Link to="/blog" className="hidden md:inline-flex text-sm tracking-widest uppercase border-b border-foreground/20 pb-1 hover:border-foreground transition-colors">
                    View all posts
                </Link>
            </div>

            <div className="relative w-full space-y-8">
                {/* Row 1: Right to Left */}
                <div className="flex animate-scroll w-fit hover:cursor-grab active:cursor-grabbing">
                    <div className="flex gap-8 px-4 shrink-0">
                        {posts.map((post) => (
                            <PostCard key={`row1-${post.slug}`} post={post} />
                        ))}
                    </div>
                    <div className="flex gap-8 px-4 shrink-0">
                        {posts.map((post) => (
                            <PostCard key={`row1-${post.slug}-duplicate`} post={post} />
                        ))}
                    </div>
                </div>

                {/* Row 2: Left to Right */}
                <div className="flex animate-scroll-reverse w-fit hover:cursor-grab active:cursor-grabbing">
                    <div className="flex gap-8 px-4 shrink-0">
                        {posts.map((post) => (
                            <PostCard key={`row2-${post.slug}`} post={post} />
                        ))}
                    </div>
                    <div className="flex gap-8 px-4 shrink-0">
                        {posts.map((post) => (
                            <PostCard key={`row2-${post.slug}-duplicate`} post={post} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function PostCard({ post }: { post: BlogPost }) {
    return (
        <Link
            to={`/post/${post.slug}`}
            className="block w-[280px] md:w-[320px] group"
        >
            <div className="space-y-4">
                <div className="aspect-[16/10] overflow-hidden rounded-lg bg-muted relative">
                    {post.image && (
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground">
                        <span>{post.date}</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-serif font-medium leading-tight group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                    </h3>
                </div>
            </div>
        </Link>
    )
}

