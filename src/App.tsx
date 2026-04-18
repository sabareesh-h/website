import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
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
import { MouseFollower } from './components/ui/MouseFollower';
import { AnimatePresence } from 'framer-motion';
import { PageTransition } from './components/ui/PageTransition';

export default function App() {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/20 relative">
      <MouseFollower />
      <Toaster position="bottom-right" theme="dark" />
      {isNavVisible && <Navigation />}
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
            <Route path="/blog" element={<PageTransition><BlogPage /></PageTransition>} />
            <Route path="/ideas" element={<PageTransition><IdeasPage /></PageTransition>} />
            <Route path="/post/:slug" element={<PageTransition><BlogPostPage /></PageTransition>} />
            <Route path="/projects" element={<PageTransition><ProjectsPage /></PageTransition>} />
            <Route path="/drawings" element={<PageTransition><DrawingsPage setIsNavVisible={setIsNavVisible} /></PageTransition>} />
            <Route path="/drawing/:slug" element={<PageTransition><DrawingsPage setIsNavVisible={setIsNavVisible} /></PageTransition>} />
            <Route path="/write" element={<PageTransition><BlogEditor /></PageTransition>} />
            <Route path="/about" element={<PageTransition><About /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}