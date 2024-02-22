import type { Metadata } from 'next';
import { Inter, Satisfy } from 'next/font/google';
import './globals.css';
import 'console-prod';

const inter = Inter({ subsets: ['latin'] });
const satisfy = Satisfy({ weight: '400', subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Raspodium AI',
	description:
		'Find words based on a description, a vague idea or a line of thought.',
	keywords: [
		'Word',
		'Finder',
		'Find Words',
		'AI',
		'Thoughts to Word',
		'Idea to Word',
		'Word Finder',
	],
	abstract:
		"Raspodium AI helps you find words based on a description, \
		a vague idea or a line of thought. You are looking for a \
		word that seems to be just behind your tongue but can't \
		figure out what it is, Raspodium AI will help you find those \
		words faster",
	applicationName: 'Raspodium AI',
	authors: { name: 'Emeka Orji', url: 'https://twitter.com/code_rabbi' },
	creator: 'Emeka Orji',
	metadataBase: new URL('https://raspodium.vercel.app'),
	openGraph: {
		type: 'website',
		url: 'https://raspodium.vercel.app',
		title: 'Raspodium AI',
		description:
			'Find words based on a description, a vague idea or a line of thought.',
		siteName: 'Raspodium AI',
		countryName: 'Nigeria',
	},
	generator: 'Next.js',
	publisher: 'Vercel',
	twitter: {
		creator: 'Emeka Orji',
		title: 'Raspodium AI',
		site: 'https://raspodium.vercel.app',
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<nav className={satisfy.className}>
					<h1>r</h1>
				</nav>
				{children}
				<footer>
					Made with 💙 by&nbsp;
					<a href='https://github.com/emekaorji'>Emeka Orji</a>
				</footer>
			</body>
		</html>
	);
}
