import { ExternalLink, Github, ArrowRight, Compass, Star, Heart, Lightbulb, Layers, Code2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from 'framer-motion';

export function ProjectsPage() {
  const projects = [
    {
      title: "Serenity Dashboard",
      description: "A personal productivity dashboard inspired by Japanese aesthetics. Built to help me track habits, goals, and daily reflections with mindful design.",
      story: "Born from my journey to find balance in a busy digital world.",
      image: "https://images.unsplash.com/photo-1575388902449-6bca946ad549?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWFzJTIwZGFzaGJvYXJkJTIwZGVzaWdufGVufDF8fHx8MTc1Nzk0NjY1OXww&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Personal",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Local Storage"],
      year: "2024",
      status: "Evolving",
      lessons: ["Minimalist design principles", "User psychology", "Data visualization"]
    },
    {
      title: "Memory Lane",
      description: "A digital storytelling platform where users can create beautiful timelines of their life experiences, complete with photos, text, and music.",
      story: "Created to preserve and share the stories that matter most.",
      image: "https://images.unsplash.com/photo-1730794545099-14902983739d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx3ZWIlMjBkZXNpZ24lMjBtb2NrdXB8ZW58MXx8fHwxNzU3ODg2OTYwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Creative",
      technologies: ["Next.js", "Framer Motion", "Cloudinary", "MongoDB"],
      year: "2024",
      status: "Published",
      lessons: ["Animation principles", "File handling", "User storytelling"]
    },
    {
      title: "Garden of Code",
      description: "An interactive learning platform that gamifies programming concepts using garden metaphors. Plant code snippets, watch them grow into applications.",
      story: "Inspired by my love for gardening and desire to make coding more accessible.",
      image: "https://images.unsplash.com/photo-1658953229625-aad99d7603b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzU3ODg0NjM5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Educational",
      technologies: ["Vue.js", "D3.js", "Node.js", "Socket.io"],
      year: "2024",
      status: "Growing",
      lessons: ["Educational design", "Real-time features", "Gamification"]
    },
    {
      title: "Artisan Portfolio",
      description: "A showcase website for a local pottery artist, featuring an elegant gallery, workshop booking system, and artist's story section.",
      story: "My first client project - learned the importance of understanding the artist's vision.",
      image: "https://images.unsplash.com/photo-1694599048261-a1de00f0117e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjB3ZWJzaXRlJTIwZGVzaWdufGVufDF8fHx8MTc1NzkwNTM1OHww&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Collaboration",
      technologies: ["Gatsby", "Strapi", "Stripe", "Netlify"],
      year: "2023",
      status: "Live",
      lessons: ["Client communication", "CMS integration", "Performance optimization"]
    },
    {
      title: "Mindful Reader",
      description: "A distraction-free reading app with customizable typography, progress tracking, and reflection notes. Built for deep, intentional reading.",
      story: "Created during my quest to read more mindfully in our distracted world.",
      image: "https://images.unsplash.com/photo-1700619663094-be321751b545?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3Jrc3BhY2UlMjBzZXR1cHxlbnwxfHx8fDE3NTc4NzUxMjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Wellness",
      technologies: ["React Native", "Expo", "SQLite", "AsyncStorage"],
      year: "2023",
      status: "Personal Use",
      lessons: ["Mobile development", "Typography design", "User habits"]
    },
    {
      title: "Local Lens",
      description: "A community photo-sharing app that connects neighbors through visual storytelling. Discover hidden gems in your neighborhood through others' eyes.",
      story: "Inspired by wanting to see my city through fresh perspectives.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx8fDE3NTc4NzUxMjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Social",
      technologies: ["React", "Firebase", "Google Maps API", "PWA"],
      year: "2023",
      status: "Prototype",
      lessons: ["Community building", "Location services", "Social features"]
    }
  ];

  const categories = ["All", "Personal", "Creative", "Educational", "Collaboration", "Wellness", "Social"];

  const journeyStats = [
    { number: '25+', label: 'Projects Created', icon: Compass },
    { number: '3+', label: 'Years Learning', icon: Star },
    { number: '∞', label: 'Lessons Learned', icon: Lightbulb },
    { number: '1', label: 'Passionate Creator', icon: Heart }
  ];

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Header */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[800px] h-[400px] bg-primary/10 rounded-[100%] blur-[100px] -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20 flex items-center gap-2">
                <Code2 className="w-3 h-3" />
                Digital Explorations
              </span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 tracking-tight">My Projects</h1>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed">
              Each project represents a chapter in my learning journey - experiments in creativity,
              problem-solving, and the endless pursuit of building something meaningful.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Journey Stats */}
        <section className="mb-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {journeyStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-white/10 hover:border-primary/30 transition-all text-center group"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl font-bold mb-1 text-foreground">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Filters */}
        <section className="mb-12">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "default" : "outline"}
                size="sm"
                className={`rounded-full transition-all ${category === "All"
                    ? "bg-primary hover:bg-primary/90"
                    : "border-white/10 hover:bg-white/5"
                  }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </section>

        {/* Projects Grid */}
        <section className="mb-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-card/50 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 h-full flex flex-col">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <ImageWithFallback
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                      <Button size="icon" variant="secondary" className="rounded-full bg-white/10 hover:bg-white/20 text-white border-none">
                        <ExternalLink className="h-5 w-5" />
                      </Button>
                      <Button size="icon" variant="secondary" className="rounded-full bg-white/10 hover:bg-white/20 text-white border-none">
                        <Github className="h-5 w-5" />
                      </Button>
                    </div>
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge variant="secondary" className="bg-black/50 backdrop-blur-md text-white border-white/20">
                        {project.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <span className="text-xs font-mono text-muted-foreground bg-white/5 px-2 py-1 rounded">
                        {project.year}
                      </span>
                    </div>

                    <p className="text-sm text-primary/80 mb-4 italic">"{project.story}"</p>
                    <p className="text-muted-foreground text-sm mb-6 line-clamp-3 leading-relaxed flex-grow">
                      {project.description}
                    </p>

                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 3).map((tech, i) => (
                          <Badge key={i} variant="outline" className="text-xs border-white/10 bg-white/5 text-muted-foreground">
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      <div className="pt-4 border-t border-white/5">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                          <Layers className="w-3 h-3" />
                          <span>Key Learnings</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {project.lessons.slice(0, 2).map((lesson, lessonIndex) => (
                            <span key={lessonIndex} className="text-xs text-muted-foreground/80 bg-primary/5 px-2 py-1 rounded">
                              {lesson}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Featured Story */}
        <section className="mb-20">
          <div className="flex items-center gap-2 mb-8">
            <Star className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-bold">Featured Journey</h2>
          </div>
          <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-card/50 backdrop-blur-sm">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="aspect-[4/3] lg:aspect-auto relative overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1730794545099-14902983739d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx3ZWIlMjBkZXNpZ24lMjBtb2NrdXB8ZW58MXx8fHwxNTc4ODk2OTYwfDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Featured Project"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent lg:hidden" />
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-6">
                  <Badge className="bg-primary text-primary-foreground">Current Focus</Badge>
                  <Badge variant="outline" className="border-white/20">2024</Badge>
                </div>
                <h3 className="text-3xl lg:text-4xl font-bold mb-6">Learning Hub</h3>
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                  My most ambitious project yet - a comprehensive learning management system that
                  adapts to individual learning styles. Born from my own struggles with traditional
                  educational approaches.
                </p>
                <div className="mb-8">
                  <p className="text-sm font-medium text-muted-foreground mb-3">Technologies & Learnings:</p>
                  <div className="flex flex-wrap gap-2">
                    {["Next.js", "AI Integration", "Accessibility", "User Psychology"].map((tech) => (
                      <Badge key={tech} variant="secondary" className="bg-white/5 text-white border-white/10 hover:bg-white/10">{tech}</Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button className="group bg-primary hover:bg-primary/90">
                    Follow Progress
                    <Heart className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                  </Button>
                  <Button variant="outline" className="border-white/20 hover:bg-white/5">
                    <Github className="mr-2 h-4 w-4" />
                    View Code
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-20 relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent text-center px-4">
          <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]" />
          <div className="relative z-10">
            <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-3">
              <Lightbulb className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold mb-4">My Creative Process</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-12">
              Every project begins with curiosity and evolves through experimentation,
              learning, and the joy of discovery.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {[
                {
                  step: "Wonder",
                  description: "Every project starts with a question or a problem that sparks my curiosity"
                },
                {
                  step: "Explore",
                  description: "Research, experiment, and prototype to understand the possibilities"
                },
                {
                  step: "Create",
                  description: "Build something meaningful, learning and iterating along the way"
                },
                {
                  step: "Share",
                  description: "Document the journey and share the lessons learned with others"
                }
              ].map((process, index) => (
                <div key={index} className="relative p-6 rounded-2xl bg-black/20 border border-white/5 hover:border-primary/30 transition-colors">
                  <div className="text-4xl font-bold text-white/5 absolute top-4 right-4">{String(index + 1).padStart(2, '0')}</div>
                  <h3 className="text-xl font-bold mb-3 relative z-10">{process.step}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed relative z-10">{process.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center mt-20 mb-12">
          <h2 className="text-3xl font-bold mb-4">Let's Connect</h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto leading-relaxed">
            I'd love to hear your thoughts on these projects or discuss ideas for future collaborations.
            Every conversation is an opportunity to learn something new.
          </p>
          <Button size="lg" className="group bg-primary hover:bg-primary/90 h-12 px-8 rounded-full">
            Start a Conversation
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </section>
      </div>
    </div>
  );
}