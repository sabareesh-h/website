import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { HomePage } from './components/HomePage';
import { BlogPage } from './components/BlogPage';
import { ProjectsPage } from './components/ProjectsPage';
import { BlogPostPage } from './components/BlogPostPage';
import { DrawingsPage } from './components/DrawingsPage';
import { IdeasPage } from './components/IdeasPage';
import { BlogEditor } from './components/editor/BlogEditor';
import { About } from './components/About';
import { Toaster } from 'sonner';

export default function App() {
  const [isNavVisible, setIsNavVisible] = useState(true);

  return (
    <BrowserRouter basename="/website/">
      <div className="min-h-screen bg-background font-sans selection:bg-primary/20">
        <Toaster position="bottom-right" theme="dark" />
        {isNavVisible && <Navigation />}
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/ideas" element={<IdeasPage />} />
            <Route path="/post/:slug" element={<BlogPostPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/drawings" element={<DrawingsPage setIsNavVisible={setIsNavVisible} />} />
            <Route path="/drawing/:slug" element={<DrawingsPage setIsNavVisible={setIsNavVisible} />} />
            <Route path="/write" element={<BlogEditor />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}