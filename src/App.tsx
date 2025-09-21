import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { HomePage } from './components/HomePage';
import { BlogPage } from './components/BlogPage';
import { ProjectsPage } from './components/ProjectsPage';
import { BlogPostPage } from './components/BlogPostPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedPost, setSelectedPost] = useState<any>(null);

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    setSelectedPost(null);
  }

  const renderPage = () => {
    if (selectedPost) {
      return <BlogPostPage post={selectedPost} />;
    }

    switch (currentPage) {
      case 'home':
        return <HomePage onPageChange={handlePageChange} />;
      case 'blog':
        return <BlogPage onPageChange={handlePageChange} onPostSelect={setSelectedPost} />;
      case 'projects':
        return <ProjectsPage />;
      default:
        return <HomePage onPageChange={handlePageChange}/>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentPage={currentPage} onPageChange={handlePageChange} />
      <main>{renderPage()}</main>
    </div>
  );
}