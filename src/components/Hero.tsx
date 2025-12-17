import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { ArrowRight, Github, Linkedin, Youtube } from "lucide-react";
import myImage from "../my_image.jpeg";
import scrollIcon from "../assets/scroll_icon.png";

// Substack Icon Component
const SubstackIcon = ({ className }: { className?: string }) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor">
        <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
    </svg>
);

export function Hero() {
    return (
        <section className="relative min-h-screen flex items-center pt-20 pb-32 overflow-visible bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center justify-items-center">
                    {/* Text Content */}
                    <div className="space-y-8 flex flex-col items-center lg:items-start text-center lg:text-left">
                        <h1 className="text-5xl md:text-7xl font-serif text-foreground leading-tight">
                            Hello, I'm <br />
                            Sabareesh H
                        </h1>
                        <p className="text-lg md:text-xl text-foreground/80 max-w-lg font-sans leading-relaxed">
                            I explore questions that challenge my logic and my worldview. Building things and thinking deeply are two sides of the same journey for me.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link to="/projects">
                                <Button className="rounded-xl bg-[#8B6F2B] text-white hover:bg-[#8B6F2B]/90 px-8 py-6 text-lg">
                                    Explore My Projects <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link to="/blog">
                                <Button variant="outline" className="rounded-xl border-2 border-[#8B6F2B] text-[#8B6F2B] hover:bg-[#000000]/5 px-8 py-6 text-lg">
                                    Read My Blog
                                </Button>
                            </Link>
                        </div>

                        {/* Social Icons */}
                        <div className="flex gap-6 pt-4 items-center">
                            <a href="https://github.com/sabareesh-h/" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
                                <Github className="h-6 w-6" />
                            </a>
                            <a href="https://www.linkedin.com/in/sabareesh-h-352391227/" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
                                <Linkedin className="h-7 w-7" />
                            </a>

                            <a href="https://sabareeshh.substack.com/" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
                                <SubstackIcon className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Image Content */}
                    {/* Image Content */}
                    <div className="relative flex justify-center lg:justify-end">
                        <div className="relative w-full max-w-md aspect-square">
                            {/* Blob Background */}
                            <div className="absolute inset-0 bg-secondary/30 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] animate-blob mix-blend-multiply filter blur-xl opacity-70 transform scale-110"></div>
                            <div className="absolute top-0 -right-4 w-72 h-72 bg-accent/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-primary/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

                            {/* Image Container */}
                            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/50 bg-white/20 backdrop-blur-sm group">
                                <img
                                    src={myImage}
                                    alt="Sabareesh H"
                                    className="w-full h-full object-cover object-top"
                                />
                            </div>

                            {/* Life Story FAB attached to Image */}
                            <Link
                                to="/post/my-life"
                                className="absolute -bottom-6 -right-6 z-20 transition-transform hover:scale-105 active:scale-95"
                                title="My Life Story"
                            >
                                <img
                                    src={scrollIcon}
                                    alt="Life Story"
                                    className="w-20 h-20 rounded-full shadow-xl border-4 border-background hover:shadow-2xl transition-all duration-300 object-cover"
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
