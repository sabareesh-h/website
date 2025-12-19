import React, { useState, useEffect } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { toast } from "sonner";
import { Github } from 'lucide-react';

const SECRET_KEY = 'gemini-secret-key';
const AUTH_KEY = 'post_generator_auth';

// Helper to create a URL-friendly slug
const createSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 50);
};

export function PostGeneratorPage() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  // GitHub Settings State
  const [githubToken, setGithubToken] = useState('');
  const [githubOwner, setGithubOwner] = useState('');
  const [githubRepo, setGithubRepo] = useState('');

  // Post Content State
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [readTime, setReadTime] = useState('');
  const [body, setBody] = useState('');
  const [fileName, setFileName] = useState('');

  const [isPublishing, setIsPublishing] = useState(false);

  // Load saved settings from localStorage on mount
  useEffect(() => {
    const storedAuth = localStorage.getItem(AUTH_KEY);
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }
    setGithubToken(localStorage.getItem('github_token') || '');
    setGithubOwner(localStorage.getItem('github_owner') || '');
    setGithubRepo(localStorage.getItem('github_repo') || '');
  }, []);

  // Update filename slug when title changes
  useEffect(() => {
    setFileName(createSlug(title));
  }, [title]);

  const handleLogin = () => {
    if (password === SECRET_KEY) {
      setIsAuthenticated(true);
      localStorage.setItem(AUTH_KEY, 'true');
      toast.success("Authentication successful!");
    } else {
      toast.error("Incorrect password.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(AUTH_KEY);
    toast.info("You have been logged out.");
  };

  const handleSaveGitHubSettings = () => {
    localStorage.setItem('github_token', githubToken);
    localStorage.setItem('github_owner', githubOwner);
    localStorage.setItem('github_repo', githubRepo);
    toast.success("GitHub settings saved!");
  };

  const generatedContent = `---\ntitle: '${title.replace(/'/g, "'")}'
date: '${new Date().toISOString().split('T')[0]}'
excerpt: '${excerpt.replace(/'/g, "'")}'
image: '${image.replace(/'/g, "'")}'
category: '${category.replace(/'/g, "'")}'
readTime: '${readTime.replace(/'/g, "'")}'
---

${body}
`;

  const handlePublish = async () => {
    if (!githubToken || !githubOwner || !githubRepo) {
      toast.error("Please configure GitHub settings first.");
      return;
    }
    if (!fileName) {
      toast.error("Please provide a file name for the post.");
      return;
    }
    if (!title || !body) {
      toast.error("Title and content are required to publish.");
      return;
    }

    setIsPublishing(true);
    const path = `src/posts/${fileName}.md`;
    const url = `https://api.github.com/repos/${githubOwner}/${githubRepo}/contents/${path}`;

    const contentBase64 = btoa(unescape(encodeURIComponent(generatedContent)));

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${githubToken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.github.v3+json'
        },
        body: JSON.stringify({
          message: `feat: add new post '${title}'`,
          content: contentBase64,
          branch: 'main'
        })
      });

      if (response.ok) {
        toast.success("Post published to GitHub successfully!", {
          description: "Your site should redeploy automatically in a few moments."
        });
      } else {
        const errorData = await response.json();
        console.error('GitHub API Error:', errorData);
        toast.error("Failed to publish post.", {
          description: errorData.message || "Check your GitHub settings and token permissions."
        });
      }
    } catch (error: any) {
      console.error('Unexpected Error:', error);
      toast.error("An unexpected error occurred.", {
        description: error.message || JSON.stringify(error)
      });
    } finally {
      setIsPublishing(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    toast("Content copied to clipboard!");
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-16 flex items-center justify-center">
        <Card>
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>Please enter the password to access the post generator.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleLogin} className="w-full">Login</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Post Generator</h1>
        <Button variant="outline" onClick={handleLogout}>Logout</Button>
      </div>

      {/* GitHub Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center"><Github className="mr-2" /> GitHub Settings</CardTitle>
          <CardDescription>
            Configure your GitHub repository details to enable publishing.
            You need to create a <a href="https://github.com/settings/tokens/new?scopes=repo" target="_blank" rel="noopener noreferrer" className="text-primary underline">Personal Access Token</a> with the "repo" scope.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="githubOwner">GitHub Username / Org</Label>
              <Input id="githubOwner" value={githubOwner} onChange={(e) => setGithubOwner(e.target.value)} placeholder="e.g., octocat" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="githubRepo">Repository Name</Label>
              <Input id="githubRepo" value={githubRepo} onChange={(e) => setGithubRepo(e.target.value)} placeholder="e.g., my-blog" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="githubToken">Personal Access Token (PAT)</Label>
            <Input id="githubToken" type="password" value={githubToken} onChange={(e) => setGithubToken(e.target.value)} placeholder="ghp_..." />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSaveGitHubSettings}>Save GitHub Settings</Button>
        </CardFooter>
      </Card>

      {/* Post Editor */}
      <Card>
        <CardHeader>
          <CardTitle>Post Content</CardTitle>
          <CardDescription>Fill in the details below to generate the Markdown for your new blog post.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* ... (form fields for title, excerpt, etc.) ... */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Your Post Title" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input id="category" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g., Personal, Tech" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Input id="excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="A short summary of the post" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input id="image" value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://example.com/image.jpg" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="readTime">Read Time</Label>
              <Input id="readTime" value={readTime} onChange={(e) => setReadTime(e.target.value)} placeholder="e.g., 5 min read" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="body">Content (Markdown)</Label>
            <Textarea id="body" value={body} onChange={(e) => setBody(e.target.value)} placeholder="Write your blog post content here..." rows={15} />
          </div>
        </CardContent>
      </Card>

      {/* Generated Markdown & Publish */}
      <Card>
        <CardHeader>
          <CardTitle>Publish</CardTitle>
          <CardDescription>Review the generated content and file name, then publish directly to GitHub.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fileName">File Name</Label>
            <div className="flex items-center">
              <Input id="fileName" value={fileName} onChange={(e) => setFileName(e.target.value)} placeholder="my-awesome-post" />
              <span className="ml-2 text-muted-foreground">.md</span>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Generated Markdown Preview</Label>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto h-64">
              <code>{generatedContent}</code>
            </pre>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="secondary" onClick={handleCopy}>Copy Markdown</Button>
          <Button onClick={handlePublish} disabled={isPublishing}>
            {isPublishing ? "Publishing..." : "Publish to GitHub"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}