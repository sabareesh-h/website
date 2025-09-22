import React from 'react';
import { useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

export function BlogPostPage() {
  const location = useLocation();
  const { post } = location.state;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <img src={post.attributes.image} alt={post.attributes.title} className="w-full h-96 object-cover rounded-lg mb-8" />
      <div className="prose lg:prose-xl dark:prose-invert">
        <h1>{post.attributes.title}</h1>
        <p className="text-muted-foreground">{post.attributes.date}</p>
        <ReactMarkdown>{post.body}</ReactMarkdown>
      </div>
    </div>
  );
}