import { useState, useEffect } from "react";

interface Video {
    title: string;
    url: string;
    thumbnail: string;
}

export function YouTubeLatest() {
    const [videos, setVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const channelId = "UClFp32thAlJ_PKTypoKAmKw";
                const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
                const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`);
                const data = await response.json();

                if (data.status === 'ok') {
                    const fetchedVideos = data.items.slice(0, 3).map((item: any) => ({
                        title: item.title,
                        url: item.link,
                        thumbnail: item.thumbnail
                    }));
                    setVideos(fetchedVideos);
                } else {
                    setError(true);
                }
            } catch (err) {
                console.error("Error fetching YouTube videos:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, []);

    if (loading) {
        return (
            <section className="py-24 bg-secondary">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl md:text-5xl font-serif text-foreground font-bold text-center mb-16">
                        Latest <span className="italic text-muted-foreground">videos</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((n) => (
                            <div key={n} className="animate-pulse">
                                <div className="aspect-video bg-foreground/10 rounded-3xl mb-6"></div>
                                <div className="h-6 bg-foreground/10 rounded w-3/4"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (error) return null; // Or show a fallback if needed

    return (
        <section className="py-24 bg-secondary text-foreground">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl md:text-5xl font-serif text-foreground font-bold text-center mb-16">
                    Latest <span className="italic text-muted-foreground">videos</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {videos.map((video, index) => (
                        <a
                            key={index}
                            href={video.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block"
                        >
                            <div className="aspect-video bg-muted rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 relative">
                                <img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-110 shadow-lg">
                                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <h3 className="mt-6 text-xl font-serif text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                                {video.title}
                            </h3>
                        </a>
                    ))}
                    {/* Placeholders if less than 3 videos */}
                    {videos.length < 3 && Array.from({ length: 3 - videos.length }).map((_, i) => (
                        <div key={`placeholder-${i}`} className="hidden md:block group">
                            <div className="aspect-video bg-foreground/5 border-2 border-dashed border-foreground/10 rounded-3xl flex items-center justify-center p-8 text-center transition-colors group-hover:border-primary/30">
                                <p className="text-muted-foreground text-sm font-medium uppercase tracking-wider leading-relaxed">
                                    New episodes <br />
                                    coming soon
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
