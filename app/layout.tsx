import type { Metadata } from 'next';
import { Inter, Satisfy } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });
const satisfy = Satisfy({ weight: '400', subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
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
