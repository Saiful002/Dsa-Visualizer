import './globals.css';
import ThemeRegistry from './ThemeRegistry';
import Nav from '../Component/NavBar/Nav';
import Footer from '../components/Footer/Footer';

export const metadata = {
  title: 'DSA Visualizer - Interactive Data Structures & Algorithms Learning Platform',
  description: 'Master Data Structures and Algorithms through interactive step-by-step visualizers, animated data flow, C & PHP implementations, code downloads, and Big-O complexity guides.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
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
