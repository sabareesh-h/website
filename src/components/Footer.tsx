import { Link } from "react-router-dom";
import { Newsletter } from "./Newsletter";

export function Footer() {
    return (
        <footer id="contact" className="py-24 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
                <div className="border-b border-foreground/10 pb-24">
                    <Newsletter />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Pages Column */}
                    <div>
                        <h3 className="text-xl font-serif font-bold mb-6">Pages</h3>
                        <ul className="space-y-4">
                            {['Home', 'Blog', 'Projects', 'About me'].map((item) => (
                                <li key={item}>
                                    <Link to={`/${item.toLowerCase().replace(' ', '-')}`} className="text-foreground/80 hover:text-primary transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Links Column */}
                    <div className="lg:col-span-1">
                        <h3 className="text-xl font-serif font-bold mb-6">Links</h3>
                        <ul className="grid grid-cols-2 gap-x-8 gap-y-4">
                            {[
                                { name: 'Github', url: 'https://github.com/sabareesh-h/' },
                                { name: 'Linkedin', url: 'https://www.linkedin.com/in/sabareesh-h-352391227/' },
                                { name: 'Instagram', url: 'https://www.instagram.com/i_am_sabareesh_/' },
                                { name: 'Substack', url: 'https://sabareeshh.substack.com/' },
                                { name: 'Medium', url: 'https://medium.com/@sabarigirimana123' },
                                { name: 'Goodreads', url: 'https://www.goodreads.com/sabareesh-h' },
                                { name: 'Youtube', url: 'https://www.youtube.com/@sabareeshh460' },
                                { name: 'Trakt', url: 'https://app.trakt.tv/profile/sabareesh12' },
                                { name: 'Stash', url: 'https://stash.games/users/lnfx5al1ufue/games' }
                            ].map((item) => (
                                <li key={item.name}>
                                    <a
                                        href={item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-foreground/80 hover:text-primary transition-colors whitespace-nowrap"
                                    >
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div className="lg:col-span-2 text-right flex flex-col items-end">
                        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">
                            Contact me
                        </h2>
                        <div className="space-y-4 text-lg mb-8">
                            <p><span className="font-bold">Name :</span> Sabareesh H</p>
                            <p><span className="font-bold">Phone:</span> 9092626123</p>
                            <p><span className="font-bold">Email:</span> sabareeshh124@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
