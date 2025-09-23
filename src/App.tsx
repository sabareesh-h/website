import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { HomePage } from './components/HomePage';
import { BlogPage } from './components/BlogPage';
import { ProjectsPage } from './components/ProjectsPage';
import { BlogPostPage } from './components/BlogPostPage';
import { DrawingsPage } from './components/DrawingsPage';

export default function App() {
  const [isNavVisible, setIsNavVisible] = useState(true);

  return (
        <BrowserRouter basename="/website/">
      <div className="min-h-screen bg-background">
        {isNavVisible && <Navigation />}
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/post/:slug" element={<BlogPostPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/drawings" element={<DrawingsPage setIsNavVisible={setIsNavVisible} />} />
            <Route path="/drawing/:slug" element={<DrawingsPage setIsNavVisible={setIsNavVisible} />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}