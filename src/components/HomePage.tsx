import { Hero } from "./Hero";
import { About } from "./About";
import { Experience } from "./Experience";

import { LatestPosts } from "./LatestPosts";
import { ProjectPosts } from "./ProjectPosts";
import { Footer } from "./Footer";

export function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Hero />
      <About />
      <Experience />
      <ProjectPosts />
      <LatestPosts />
      <Footer />
    </div>
  );
}
