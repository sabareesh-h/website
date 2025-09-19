import React from 'react';
import { ArrowRight, Code, Palette, BookOpen, Github, Linkedin, Mail, ExternalLink, Scroll, Compass } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

export function HomePage({ onPageChange }: { onPageChange: (page: string) => void }) {
  const skills = [
    'React', 'TypeScript', 'Next.js', 'JavaScript', 'Python', 'UI/UX Design',
    'Figma', 'Tailwind CSS', 'Node.js', 'MongoDB', 'Creative Writing', 'Photography'
  ];

  const achievements = [
    { number: '10+', label: 'Projects Created' },
    { number: '4+', label: 'Years Learning' },
    { number: '12+', label: 'Technologies' },
    { number: '1', label: 'Curiosity Level' }
  ];

  const passions = [
    {
      icon: Code,
      title: 'Development',
      description: 'Crafting digital experiences with clean, maintainable code'
    },
    {
      icon: Palette,
      title: 'Design',
      description: 'Creating beautiful, intuitive interfaces that tell stories'
    },
    {
      icon: BookOpen,
      title: 'Learning',
      description: 'Constantly exploring new technologies and methodologies'
    }
  ];

  return (
    <div className="min-h-screen pt-8">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Compass className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Digital Craftsman & Storyteller</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl mb-6 leading-tight">
                Hello
                <br />
                <span className="text-muted-foreground">-- I'm Sabareesh, My journey</span>
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed">
                Welcome to my corner of the digital world. Here, I share the projects I've crafted, 
                the lessons I've learned, and the stories I've discovered along the way. Each creation 
                represents a step in my ongoing journey of exploration and growth.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="group bg-primary hover:bg-primary/90" onClick={() => onPageChange('projects')}>
                  Explore My Projects
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline" size="lg" className="border-primary/20 hover:bg-primary/5" onClick={() => onPageChange('blog')}>
                  Read My Blog
                </Button>
              </div>
              
              <div className="flex items-center gap-4 mt-8">
                <a href="https://github.com/sabareesh-h/" target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="sm" className="hover:bg-primary/10">
                    <Github className="h-5 w-5" />
                  </Button>
                </a>
                <a href="https://linkedin.com/in/sabareesh-h-352391227" target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="sm" className="hover:bg-primary/10">
                    <Linkedin className="h-5 w-5" />
                  </Button>
                </a>
                <a href="mailto:sabareeshh124@gmail.com">
                  <Button variant="ghost" size="sm" className="hover:bg-primary/10">
                    <Mail className="h-5 w-5" />
                  </Button>
                </a>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square max-w-lg mx-auto relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl transform rotate-3"></div>
                <img
                  src="https://images.unsplash.com/photo-1576558656222-ba66febe3dec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMGhlYWRzaG90fGVufDF8fHx8MTc1Nzk0NjU0N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Sabareesh"
                  className="w-full h-full object-cover rounded-2xl relative z-10 border-2 border-primary/10"
                />
                <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground p-4 rounded-full z-20 shadow-lg">
                  <Scroll className="h-6 w-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
            <span>Discover more</span>
            <div className="w-px h-8 bg-primary/30 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl mb-2 text-primary font-serif">{achievement.number}</div>
                <div className="text-sm text-muted-foreground">{achievement.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl mb-6">My Story</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                I'm a curious soul who found solace in the intersection of technology and creativity. 
                What started as fascination with how things work has evolved into a passion for creating 
                digital experiences that matter. Each project in my portfolio represents not just code 
                or design, but a lesson learned, a challenge overcome, and a step forward in my journey.
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Through this space, I share my explorations in development, design, and the countless 
                discoveries I make along the way. Whether it's building elegant user interfaces, 
                experimenting with new technologies, or simply documenting the beauty I find in 
                problem-solving, this is where my digital story unfolds.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                {passions.map((passion, index) => (
                  <div key={index} className="text-center p-4 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
                    <passion.icon className="h-8 w-8 mx-auto mb-3 text-primary" />
                    <h4 className="mb-2">{passion.title}</h4>
                    <p className="text-sm text-muted-foreground">{passion.description}</p>
                  </div>
                ))}
              </div>
              
              <Button variant="outline" className="border-primary/20 hover:bg-primary/5">
                Read My Blog
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1700619663094-be321751b545?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3Jrc3BhY2UlMjBzZXR1cHxlbnwxfHx8fDE3NTc4NzUxMjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Creative workspace"
                className="aspect-square object-cover rounded-lg border border-primary/10"
              />
              <div className="aspect-square bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg flex items-center justify-center border border-primary/10">
                <div className="text-center">
                  <div className="text-2xl mb-2 text-primary">Always</div>
                  <div className="text-sm text-muted-foreground">Learning & Growing</div>
                </div>
              </div>
              <div className="aspect-square bg-gradient-to-br from-primary/5 to-primary/15 rounded-lg flex items-center justify-center border border-primary/10">
                <div className="text-center">
                  <BookOpen className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <div className="text-sm text-muted-foreground">Sharing Knowledge</div>
                </div>
              </div>
              <img
                src="https://images.unsplash.com/photo-1730794545099-14902983739d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx3ZWIlMjBkZXNpZ24lMjBtb2NrdXB8ZW58MXx8fHwxNzU3ODg2OTYwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Creative work"
                className="aspect-square object-cover rounded-lg border border-primary/10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl mb-4">Tools & Technologies</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The instruments I use to bring ideas to life and explore the digital realm
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3 justify-center">
            {skills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="px-4 py-2 text-sm bg-card border border-primary/20 hover:bg-primary/5 transition-colors">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl mb-6">My Philosophy</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            "Every project is a story waiting to be told, every line of code is a brushstroke on the 
            digital canvas, and every challenge is an opportunity to learn something new. I believe 
            in creating with purpose, sharing knowledge freely, and finding beauty in the process 
            of discovery."
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="group bg-primary hover:bg-primary/90">
              View My Projects
              <ExternalLink className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="border-primary/20 hover:bg-primary/5">
              Get In Touch
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}