export function About() {
    return (
        <section className="py-32 bg-secondary">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Heading */}
                    <div className="md:col-span-1">
                        <h2 className="text-4xl md:text-5xl font-serif text-foreground font-bold">
                            About <br /> Me
                        </h2>
                    </div>

                    {/* Content */}
                    <div className="md:col-span-2">
                        <p className="text-xl md:text-2xl font-medium text-foreground leading-relaxed font-sans">
                            I study mechanical engineering and spend a lot of time building things. I read philosophy and psychology, searching for a life that's calm but fully lived. I like long walks, good books, and learning new skills—even cooking. This site is where I document what I build and what I learn along the way.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
