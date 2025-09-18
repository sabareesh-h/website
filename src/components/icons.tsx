import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement> & { className?: string };

export const Feather: React.FC<IconProps> = (props) => (
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
		<path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
		<line x1="16" y1="8" x2="2" y2="22" />
		<line x1="17.5" y1="15" x2="9" y2="15" />
	</svg>
);

export const Lightbulb: React.FC<IconProps> = (props) => (
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
		<path d="M9 18h6" />
		<path d="M10 22h4" />
		<path d="M2 12a10 10 0 1 1 20 0c0 3.87-2.69 6-4 7H6c-1.31-1-4-3.13-4-7Z" />
	</svg>
);

export const Calendar: React.FC<IconProps> = (props) => (
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
		<rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
		<line x1="16" y1="2" x2="16" y2="6" />
		<line x1="8" y1="2" x2="8" y2="6" />
		<line x1="3" y1="10" x2="21" y2="10" />
	</svg>
);

export const Clock: React.FC<IconProps> = (props) => (
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
		<circle cx="12" cy="12" r="10" />
		<polyline points="12 6 12 12 16 14" />
	</svg>
);

export const ArrowRight: React.FC<IconProps> = (props) => (
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
		<line x1="5" y1="12" x2="19" y2="12" />
		<polyline points="12 5 19 12 12 19" />
	</svg>
);

export const BookOpen: React.FC<IconProps> = (props) => (
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
		<path d="M2 4h7a4 4 0 0 1 4 4v12a4 4 0 0 0-4-4H2z" />
		<path d="M22 4h-7a4 4 0 0 0-4 4v12a4 4 0 0 1 4-4h7z" />
	</svg>
);

export const Coffee: React.FC<IconProps> = (props) => (
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
		<path d="M18 8h1a4 4 0 0 1 0 8h-1" />
		<path d="M2 8h16v7a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4Z" />
		<line x1="6" y1="2" x2="6" y2="4" />
		<line x1="10" y1="2" x2="10" y2="4" />
		<line x1="14" y1="2" x2="14" y2="4" />
	</svg>
);



