import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

import content from "../content.json";

export function Experience() {
    const { experiences, playlists, reading } = content;

    return (
        <section className="py-24 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Experience Column */}
                    <Card className="bg-white/50 backdrop-blur-sm border-none shadow-sm overflow-hidden h-full">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-2 mb-6">
                                <Badge variant="secondary" className="rounded-full px-3 py-1">My Experience</Badge>
                            </div>
                            <div className="space-y-8 relative">
                                {/* Vertical Line */}
                                <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-gray-200"></div>

                                {experiences.map((exp, index) => (
                                    <div key={index} className="relative pl-8">
                                        <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-black border-4 border-white"></div>
                                        <h3 className="font-bold text-lg">{exp.title}</h3>
                                        <p className="text-sm text-muted-foreground">{exp.year}</p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Music Playlist Column */}
                    <Card className="bg-white/50 backdrop-blur-sm border-none shadow-sm overflow-hidden h-full">
                        <CardContent className="p-6 flex flex-col items-center text-center h-full justify-between">
                            <div className="w-full flex justify-start mb-4">
                                <Badge variant="secondary" className="rounded-full px-3 py-1">My music playlist</Badge>
                            </div>
                            <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-4 shadow-lg">
                                <img src={playlists[0].image} alt="Playlist" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/20"></div>
                            </div>
                            <div>
                                <h3 className="font-bold text-xl">{playlists[0].title}</h3>
                                <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                                    {playlists[0].subtitle}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Reading Column */}
                    <Card className="bg-white/50 backdrop-blur-sm border-none shadow-sm overflow-hidden h-full">
                        <CardContent className="p-6 flex flex-col h-full">
                            <div className="w-full flex justify-start mb-4">
                                <Badge variant="secondary" className="rounded-full px-3 py-1">What I'm reading</Badge>
                            </div>
                            <div className="flex-1 flex flex-col">
                                <h3 className="font-bold text-xl mb-1">{reading[0].title}</h3>
                                <p className="text-sm text-muted-foreground mb-6">{reading[0].author}</p>
                                <div className="relative flex-1 rounded-xl overflow-hidden shadow-md">
                                    <img src={reading[0].image} alt="Book" className="w-full h-full object-cover" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}
