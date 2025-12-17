import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export function Newsletter() {
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Redirects to Substack with the email pre-filled
        const substackDomain = "sabareeshh";
        window.open(`https://${substackDomain}.substack.com/subscribe?email=${encodeURIComponent(email)}`, '_blank');
        setEmail('');
    };

    return (
        <div className="flex flex-col items-center text-center space-y-6 w-full py-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight">
                Subscribe to my newsletter
            </h2>

            <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
                I am interested in learning about the things that will make me a
                better person. If you find my blogs interesting, Subscribe to newsletter.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 w-full max-w-md mt-4">
                <Input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 h-12 rounded-full bg-[#FFF5E6] border-none text-black placeholder:text-black/50 px-6 focus-visible:ring-1 focus-visible:ring-[#82AAB3]"
                />
                <Button
                    type="submit"
                    className="h-12 rounded-full bg-[#82AAB3] text-black hover:bg-[#6D959E] px-8 font-medium text-base transition-colors"
                >
                    Subscribe
                </Button>
            </form>
        </div>
    );
}
