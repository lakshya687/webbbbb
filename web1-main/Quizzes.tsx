import { Link } from 'react-router-dom';
import { Target, User, BarChart3, ArrowRight } from 'lucide-react';
import { TiltCard } from '@/components/TiltCard';

export function Quizzes() {
  const quizzes = [
    { slug: 'tool-finder', name: 'Which Tool Do You Actually Need?', hook: 'Answer 4 questions, get matched to the exact tool for your situation.', time: '2 min', icon: Target, glow: '#F2A93B' },
    { slug: 'creator-personality', name: "What's Your Creator Personality?", hook: 'Find out your content style in under 2 minutes.', time: '2 min', icon: User, glow: '#F2A93B' },
    { slug: 'marketing-trivia', name: 'Test Your Marketing IQ', hook: '10 questions. How high can you score?', time: '3 min', icon: BarChart3, glow: '#4C7EA8' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-24 pb-12">
      <h1 className="font-display font-bold text-ink text-4xl mb-2">Quick Quizzes</h1>
      <p className="text-ink/50 text-sm mb-10">Answer a few questions, get something useful back.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {quizzes.map(q => {
          const Icon = q.icon;
          return (
            <Link key={q.slug} to={`/quiz/${q.slug}`}>
              <TiltCard glowColor={q.glow} className="p-6 h-full flex flex-col">
                <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center">
                  <Icon className="w-5.5 h-5.5 text-amber" />
                </div>
                <h3 className="font-display font-semibold text-ink text-lg mt-4">{q.name}</h3>
                <p className="text-ink/60 text-sm mt-1.5 flex-1">{q.hook}</p>
                <div className="flex items-center justify-between mt-5">
                  <span className="font-mono text-xs text-ink/40">{q.time}</span>
                  <span className="text-amber text-sm font-medium flex items-center gap-1">
                    Start <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </TiltCard>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
