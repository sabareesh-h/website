import React from 'react';
import ReactMarkdown from 'react-markdown';

export function BlogPostPage({ post }: { post: { attributes: any; body: string } }) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="prose lg:prose-xl dark:prose-invert">
        <h1>{post.attributes.title}</h1>
        <p className="text-muted-foreground">{post.attributes.date}</p>
        <ReactMarkdown>{post.body}</ReactMarkdown>
      </div>
    </div>
  );
}
