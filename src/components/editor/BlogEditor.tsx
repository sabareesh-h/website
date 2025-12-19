import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Save, FileText, Image as ImageIcon, Tag, Clock, Layout } from 'lucide-react';
import { toast } from 'sonner';
import { createPost, getStoredSettings, GitHubSettings, testConnection } from '../../lib/github';

export function BlogEditor() {
    const [settings, setSettings] = useState<GitHubSettings | null>(null);
    const [showSettings, setShowSettings] = useState(false);

    // Form State
    const [title, setTitle] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [readTime, setReadTime] = useState('');
    const [content, setContent] = useState('');
    const [slug, setSlug] = useState('');
    const [isPublishing, setIsPublishing] = useState(false);
    const [isTesting, setIsTesting] = useState(false);

    useEffect(() => {
        const stored = getStoredSettings();
        if (stored) {
            setSettings(stored);
        } else {
            setShowSettings(true);
        }
    }, []);

    useEffect(() => {
        // Auto-generate slug from title
        setSlug(title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
    }, [title]);

    const handleSaveSettings = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const newSettings = {
            token: (formData.get('token') as string).trim(),
            owner: (formData.get('owner') as string).trim(),
            repo: (formData.get('repo') as string).trim(),
        };

        localStorage.setItem('github_token', newSettings.token);
        localStorage.setItem('github_owner', newSettings.owner);
        localStorage.setItem('github_repo', newSettings.repo);

        setSettings(newSettings);
        setShowSettings(false);
        toast.success('Settings saved successfully');
    };

    const handleTestConnection = async () => {
        if (!settings) {
            toast.error('Please save settings first');
            return;
        }

        setIsTesting(true);
        try {
            await testConnection(settings);
            toast.success('Connection successful! Your settings are correct.');
        } catch (error: any) {
            console.error(error);
            toast.error(`Connection failed: ${error.message || 'Check your token and repo names'}`);
        } finally {
            setIsTesting(false);
        }
    };

    const handlePublish = async () => {
        if (!settings) {
            toast.error('Please configure GitHub settings first');
            setShowSettings(true);
            return;
        }

        if (!title || !content || !slug) {
            toast.error('Please fill in all required fields');
            return;
        }

        setIsPublishing(true);
        const fileContent = `---
title: '${title.replace(/'/g, "''")}'
date: '${new Date().toISOString().split('T')[0]}'
excerpt: '${excerpt.replace(/'/g, "''")}'
image: '${image}'
category: '${category}'
readTime: '${readTime}'
---

${content}`;

        try {
            await createPost(
                settings,
                `src/posts/${slug}.md`,
                fileContent,
                `feat: add new post "${title}"`
            );
            toast.success('Post published successfully!');
            // Optional: Reset form
        } catch (error: any) {
            console.error('Full error object:', error);
            let message = 'Failed to publish post.';

            if (error.status === 401) {
                message = 'Authentication failed: Invalid GitHub token.';
            } else if (error.status === 404) {
                message = 'Repository not found: Check your Owner and Repo settings.';
            } else if (error.status === 403) {
                message = 'Access denied: Check token permissions (needs "repo" scope).';
            } else if (error.message) {
                message = `GitHub Error: ${error.message}`;
            } else {
                message = `Raw Error: ${JSON.stringify(error) || error.toString()}`;
            }

            const debugEl = document.getElementById('debug-error-log');
            if (debugEl) {
                debugEl.classList.remove('hidden');
                debugEl.innerText = `DEBUG INFO:\nMessage: ${message}\n\nRaw Error: ${JSON.stringify(error, null, 2)}`;
            }
            toast.error(message, { duration: 10000 });
        } finally {
            setIsPublishing(false);
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground p-8 pt-24">
            <div className="max-w-5xl mx-auto space-y-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-4xl font-bold tracking-tight">New Story <span className="text-xs font-mono opacity-30">v2.1</span></h1>
                    <div className="flex gap-4">
                        <button
                            onClick={() => setShowSettings(!showSettings)}
                            className="p-2 rounded-full hover:bg-muted transition-colors"
                            title="GitHub Settings"
                        >
                            <Github className="w-6 h-6" />
                        </button>
                        <button
                            onClick={handlePublish}
                            disabled={isPublishing}
                            className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2 rounded-full font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                        >
                            {isPublishing ? <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" /> : <Save className="w-4 h-4" />}
                            Publish
                        </button>
                    </div>
                </div>

                {showSettings && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-card border rounded-xl p-6 shadow-lg"
                    >
                        <h2 className="text-xl font-semibold mb-4">GitHub Configuration</h2>
                        <form onSubmit={handleSaveSettings} className="grid gap-4 md:grid-cols-3">
                            <div>
                                <label className="block text-sm font-medium mb-1">Owner</label>
                                <input name="owner" defaultValue={settings?.owner || 'sabareesh-h'} className="w-full bg-background border rounded-md px-3 py-2" placeholder="username" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Repo</label>
                                <input name="repo" defaultValue={settings?.repo || 'website'} className="w-full bg-background border rounded-md px-3 py-2" placeholder="repository" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Token (PAT)</label>
                                <input name="token" type="password" defaultValue={settings?.token} className="w-full bg-background border rounded-md px-3 py-2" placeholder="ghp_..." required />
                            </div>
                            <div className="md:col-span-3 flex justify-between gap-4 mt-2">
                                <button
                                    type="button"
                                    onClick={handleTestConnection}
                                    disabled={isTesting || !settings}
                                    className="text-primary text-sm font-medium hover:underline disabled:opacity-30"
                                >
                                    {isTesting ? 'Testing...' : 'Test Connection'}
                                </button>
                                <button type="submit" className="bg-primary text-primary-foreground px-6 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity">
                                    Save Configuration
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}

                {/* Visible Error Fallback */}
                <div id="debug-error-log" className="hidden bg-red-900/20 border border-red-500/50 p-4 rounded-xl text-red-200 text-sm font-mono whitespace-pre-wrap">
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="space-y-2">
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Title"
                                className="w-full text-5xl font-bold bg-transparent border-none focus:ring-0 placeholder:text-muted-foreground/50 p-0"
                            />
                            <div className="flex items-center gap-2 text-muted-foreground text-sm">
                                <span className="opacity-50">slug:</span>
                                <code className="bg-muted px-1 rounded">{slug}</code>
                            </div>
                        </div>

                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Tell your story..."
                            className="w-full min-h-[500px] text-lg leading-relaxed bg-transparent border-none focus:ring-0 resize-none placeholder:text-muted-foreground/50 p-0 font-serif"
                        />
                    </div>

                    <div className="space-y-6">
                        <div className="bg-card border rounded-xl p-6 space-y-4 sticky top-24">
                            <h3 className="font-semibold flex items-center gap-2">
                                <Layout className="w-4 h-4" />
                                Metadata
                            </h3>

                            <div className="space-y-2">
                                <label className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
                                    <FileText className="w-4 h-4" /> Excerpt
                                </label>
                                <textarea
                                    value={excerpt}
                                    onChange={(e) => setExcerpt(e.target.value)}
                                    className="w-full bg-background border rounded-md px-3 py-2 text-sm min-h-[100px]"
                                    placeholder="Short summary..."
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
                                    <ImageIcon className="w-4 h-4" /> Cover Image URL
                                </label>
                                <input
                                    type="text"
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                    className="w-full bg-background border rounded-md px-3 py-2 text-sm"
                                    placeholder="https://..."
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
                                        <Tag className="w-4 h-4" /> Category
                                    </label>
                                    <input
                                        type="text"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="w-full bg-background border rounded-md px-3 py-2 text-sm"
                                        placeholder="Tech"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
                                        <Clock className="w-4 h-4" /> Read Time
                                    </label>
                                    <input
                                        type="text"
                                        value={readTime}
                                        onChange={(e) => setReadTime(e.target.value)}
                                        className="w-full bg-background border rounded-md px-3 py-2 text-sm"
                                        placeholder="5 min"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
