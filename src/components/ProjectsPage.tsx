import { ExternalLink, Github, ArrowRight, Compass, Star, Heart, Lightbulb } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

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
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx8fDE3NTc4NzUxMjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
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
    <div className="min-h-screen pt-16">
      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Compass className="w-6 h-6 text-primary" />
            <span className="text-sm text-muted-foreground">Digital Explorations</span>
          </div>
          <h1 className="text-4xl lg:text-5xl mb-4">My Projects</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Each project represents a chapter in my learning journey - experiments in creativity, 
            problem-solving, and the endless pursuit of building something meaningful.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Journey Stats */}
        <section className="mb-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {journeyStats.map((stat, index) => (
              <div key={index} className="text-center p-6 rounded-lg bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                <div className="text-3xl mb-2 text-primary font-serif">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Filters */}
        <section className="mb-12">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "default" : "outline"}
                size="sm"
                className={`rounded-full ${
                  category === "All" 
                    ? "bg-primary hover:bg-primary/90" 
                    : "border-primary/20 hover:bg-primary/5"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </section>

        {/* Projects Grid */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <Card key={index} className="overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-300 border border-primary/20 hover:border-primary/30">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border-primary/20">
                      {project.category}
                    </Badge>
                    <Badge 
                      variant="outline" 
                      className="text-xs border-primary/30 bg-background/80"
                    >
                      {project.status}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex gap-2">
                      <Button size="sm" variant="secondary" className="h-8 w-8 p-0 bg-background/80 hover:bg-background">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="secondary" className="h-8 w-8 p-0 bg-background/80 hover:bg-background">
                        <Github className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6 bg-gradient-to-b from-card to-primary/5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg group-hover:text-primary transition-colors leading-tight">
                      {project.title}
                    </h3>
                    <span className="text-xs text-muted-foreground">{project.year}</span>
                  </div>
                  <p className="text-sm text-primary/80 mb-3 italic">"{project.story}"</p>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="mb-4">
                    <p className="text-xs text-muted-foreground mb-2">Key Learnings:</p>
                    <div className="flex flex-wrap gap-1">
                      {project.lessons.slice(0, 2).map((lesson, lessonIndex) => (
                        <Badge key={lessonIndex} variant="outline" className="text-xs border-primary/30 text-primary/80">
                          {lesson}
                        </Badge>
                      ))}
                      {project.lessons.length > 2 && (
                        <Badge variant="outline" className="text-xs border-primary/30 text-primary/80">
                          +{project.lessons.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <Button variant="ghost" size="sm" className="p-0 h-auto group/btn hover:bg-primary/10">
                    Explore Project
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Featured Story */}
        <section className="mb-16">
          <div className="flex items-center gap-2 mb-8">
            <Star className="w-5 h-5 text-primary" />
            <h2 className="text-2xl">Featured Journey</h2>
          </div>
          <Card className="overflow-hidden border border-primary/20">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="aspect-[4/3] lg:aspect-auto">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1730794545099-14902983739d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx3ZWIlMjBkZXNpZ24lMjBtb2NrdXB8ZW58MXx8fHwxNTc4ODk2OTYwfDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Featured Project"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-8 lg:p-12 flex flex-col justify-center bg-gradient-to-br from-card to-primary/5">
                <div className="flex items-center gap-4 mb-4">
                  <Badge className="bg-primary text-primary-foreground">Current Focus</Badge>
                  <Badge variant="outline" className="border-primary/30">2024</Badge>
                </div>
                <h3 className="text-2xl lg:text-3xl mb-4">Learning Hub</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  My most ambitious project yet - a comprehensive learning management system that 
                  adapts to individual learning styles. Born from my own struggles with traditional 
                  educational approaches, this platform represents everything I've learned about user 
                  experience, accessibility, and the art of making complex things simple.
                </p>
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground mb-2">Technologies & Learnings:</p>
                  <div className="flex flex-wrap gap-2">
                    {["Next.js", "AI Integration", "Accessibility", "User Psychology", "Data Science"].map((tech) => (
                      <Badge key={tech} variant="secondary" className="bg-primary/10 text-primary border-primary/20">{tech}</Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button className="group bg-primary hover:bg-primary/90">
                    Follow Progress
                    <Heart className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                  </Button>
                  <Button variant="outline" className="border-primary/20 hover:bg-primary/5">
                    <Github className="mr-2 h-4 w-4" />
                    View Code
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        </section>

        {/* Philosophy Section */}
        <section className="py-16 bg-gradient-to-r from-primary/5 to-primary/10 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 rounded-2xl border border-primary/20">
          <div className="text-center mb-12">
            <Lightbulb className="w-8 h-8 mx-auto mb-4 text-primary" />
            <h2 className="text-3xl mb-4">My Creative Process</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Every project begins with curiosity and evolves through experimentation, 
              learning, and the joy of discovery.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
              <div key={index} className="text-center p-6 rounded-lg bg-card border border-primary/20">
                <div className="text-2xl mb-4 text-primary font-serif">{String(index + 1).padStart(2, '0')}</div>
                <h3 className="text-lg mb-2">{process.step}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{process.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center mt-20">
          <h2 className="text-3xl mb-4">Let's Connect</h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto leading-relaxed">
            I'd love to hear your thoughts on these projects or discuss ideas for future collaborations. 
            Every conversation is an opportunity to learn something new.
          </p>
          <Button size="lg" className="group bg-primary hover:bg-primary/90">
            Start a Conversation
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </section>
      </div>
    </div>
  );
}