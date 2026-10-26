import './globals.css';
import ThemeRegistry from './ThemeRegistry';
import Nav from '../Component/NavBar/Nav';
import Footer from '../components/Footer/Footer';

export const metadata = {
  title: 'DSA Visualizer - Interactive Data Structures & Algorithms Platform',
  description: 'Master Data Structures and Algorithms with interactive step-by-step visualizers, 3D animated graphs, verified C & Python source code, and code downloads.',
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body>
        <ThemeRegistry>
          <Nav />
          <main style={{ minHeight: 'calc(100vh - 160px)' }}>
            {children}
          </main>
          <Footer />
        </ThemeRegistry>
      </body>
    </html>
  );
}
