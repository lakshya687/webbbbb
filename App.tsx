import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CommandPalette } from '@/components/CommandPalette';
import { Home } from '@/pages/Home';
import { Tools } from '@/pages/Tools';
import { ToolDetail } from '@/pages/ToolDetail';
import { Workflows } from '@/pages/Workflows';
import { Quizzes } from '@/pages/Quizzes';
import { Quiz } from '@/pages/Quiz';
import { Blog } from '@/pages/Blog';
import { BlogPost } from '@/pages/BlogPost';
import { Changelog } from '@/pages/Changelog';
import { Suggest } from '@/pages/Suggest';
import { Examples } from '@/pages/Examples';
import { PromptVerse } from '@/pages/PromptVerse';
import { Prompts } from '@/pages/Prompts';
import { PromptDetail } from '@/pages/PromptDetail';
import { PromptDashboard } from '@/pages/PromptDashboard';

function App() {
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header onOpenPalette={() => setPaletteOpen(true)} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home onOpenPalette={() => setPaletteOpen(true)} />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/tool/:slug" element={<ToolDetail />} />
            <Route path="/workflows" element={<Workflows />} />
            <Route path="/quizzes" element={<Quizzes />} />
            <Route path="/quiz/:slug" element={<Quiz />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/changelog" element={<Changelog />} />
            <Route path="/suggest" element={<Suggest />} />
            <Route path="/examples" element={<Examples />} />
            <Route path="/promptverse" element={<PromptVerse />} />
            <Route path="/prompts" element={<Prompts />} />
            <Route path="/prompt/:slug" element={<PromptDetail />} />
            <Route path="/dashboard" element={<PromptDashboard />} />
          </Routes>
        </main>
        <Footer />
        <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
      </div>
    </BrowserRouter>
  );
}

export default App;
