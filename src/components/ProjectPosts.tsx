export function ProjectPosts() {
    const projects = [
        { title: "Project 1" },
        { title: "Project 1" },
        { title: "Project 1" }
    ];

    return (
        <section className="py-24 bg-secondary">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl md:text-5xl font-serif text-foreground font-bold text-center mb-16">
                    Latest Project posts
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <div key={index} className="aspect-[4/3] bg-accent rounded-3xl p-8 flex items-end shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                            <h3 className="text-2xl font-serif text-accent-foreground">
                                {project.title}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
