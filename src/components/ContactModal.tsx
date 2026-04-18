import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Github, Linkedin, Instagram, Copy, Check, ExternalLink } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { toast } from 'sonner';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [copied, setCopied] = React.useState(false);
  const email = "sabareeshh124@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    toast.success("Email copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const emailOptions = [
    {
      name: 'Gmail Web',
      icon: Mail,
      color: 'hover:text-red-500',
      url: `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`,
      description: 'Quick compose in browser'
    },
    {
      name: 'Outlook',
      icon: Mail,
      color: 'hover:text-blue-500',
      url: `https://outlook.office.com/mail/deeplink/compose?to=${email}`,
      description: 'For Outlook/Hotmail users'
    },
    {
      name: 'Default App',
      icon: ExternalLink,
      color: 'hover:text-primary',
      url: `mailto:${email}`,
      description: 'Open in system mail client'
    }
  ];

  const socialLinks = [
    { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/sabareesh-h-352391227/', color: 'hover:bg-blue-600' },
    { name: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/i_am_sabareesh_/', color: 'hover:bg-pink-600' },
    { name: 'GitHub', icon: Github, url: 'https://github.com/sabareesh-h/', color: 'hover:bg-gray-800' }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-black/90 border-white/10 backdrop-blur-2xl text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50">
            Let's Connect
          </DialogTitle>
          <DialogDescription className="text-white/50">
            Choose your preferred way to reach out. I'm usually quick to respond!
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Email Section */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/30 px-1">Send an Email</h4>
            <div className="grid gap-2">
              {emailOptions.map((option) => (
                <a
                  key={option.name}
                  href={option.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all group ${option.color}`}
                >
                  <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10">
                    <option.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{option.name}</p>
                    <p className="text-xs text-white/40">{option.description}</p>
                  </div>
                </a>
              ))}
              
              <button
                onClick={handleCopy}
                className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all group text-left"
              >
                <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10">
                  {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5 transition-transform group-hover:scale-110" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Copy Address</p>
                  <p className="text-xs text-white/40">{email}</p>
                </div>
              </button>
            </div>
          </div>

          {/* Socials Section */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/30 px-1">Social Profiles</h4>
            <div className="flex justify-between gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-1 flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 transition-all group ${social.color}`}
                >
                  <social.icon className="w-6 h-6 transition-transform group-hover:scale-110" />
                  <span className="text-[10px] font-bold uppercase tracking-tighter opacity-50 group-hover:opacity-100">{social.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
