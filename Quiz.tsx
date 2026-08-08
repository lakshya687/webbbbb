import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { QuizFlipCard } from '@/components/QuizFlipCard';
import { ArrowLeft, ArrowRight, RotateCcw, Copy, Check } from 'lucide-react';
import { TOOLS } from '@/lib/tools';

export function Quiz() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Quiz 1: Tool Finder
  const toolFinderQuestions = [
    { q: 'What platform do you create content for most?', options: ['YouTube', 'Instagram', 'TikTok', 'LinkedIn', 'My own blog or website'] },
    { q: "What's your biggest struggle right now?", options: ['Getting more views/clicks', 'Writing captions or titles fast', 'Growing followers', 'Understanding my numbers', 'Building a stronger brand'] },
    { q: 'How much time do you want to spend today?', options: ['Under 5 minutes', '15-30 minutes', 'I want a full content plan'] },
    { q: "What's your main goal this month?", options: ['More engagement', 'More sales or leads', 'Staying consistent', 'Growing my audience size'] },
  ];

  const toolFinderMap: Record<string, string> = {
    'YouTube|Getting more views/clicks': 'youtube-thumbnail-text',
    'YouTube|Writing captions or titles fast': 'youtube-title-generator',
    'YouTube|Growing followers': 'youtube-idea-generator',
    'YouTube|Understanding my numbers': 'roi-calculator',
    'YouTube|Building a stronger brand': 'youtube-channel-description',
    'YouTube|Staying consistent': 'content-calendar-generator',
    'Instagram|Getting more views/clicks': 'instagram-reel-hook',
    'Instagram|Writing captions or titles fast': 'instagram-caption-generator',
    'Instagram|Growing followers': 'instagram-hashtag-generator',
    'Instagram|Understanding my numbers': 'engagement-rate-calculator',
    'Instagram|Building a stronger brand': 'instagram-bio-generator',
    'Instagram|Staying consistent': 'content-calendar-generator',
    'TikTok|Getting more views/clicks': 'tiktok-hook-generator',
    'TikTok|Writing captions or titles fast': 'tiktok-caption-generator',
    'TikTok|Growing followers': 'tiktok-idea-generator',
    'TikTok|Understanding my numbers': 'engagement-rate-calculator',
    'TikTok|Building a stronger brand': 'brand-voice-generator',
    'LinkedIn|Getting more views/clicks': 'linkedin-post-generator',
    'LinkedIn|Writing captions or titles fast': 'linkedin-post-generator',
    'LinkedIn|Growing followers': 'linkedin-headline-generator',
    'LinkedIn|Understanding my numbers': 'engagement-rate-calculator',
    'LinkedIn|Building a stronger brand': 'linkedin-about-generator',
    'My own blog or website|Getting more views/clicks': 'meta-title-generator',
    'My own blog or website|Writing captions or titles fast': 'blog-title-generator',
    'My own blog or website|Growing followers': 'blog-outline-generator',
    'My own blog or website|Understanding my numbers': 'bounce-rate-calculator',
    'My own blog or website|Building a stronger brand': 'brand-voice-generator',
  };

  // Quiz 2: Creator Personality
  const personalityQuestions = [
    { q: 'An idea for a post pops into your head. What\'s your first instinct?', options: ['Check if it fits the algorithm', 'Think about the story I want to tell', 'Think about how to make it funny', 'Think about what I can teach people', 'Check if it matches what\'s trending'] },
    { q: 'Pick a Sunday activity', options: ['Reviewing last week\'s analytics', 'Journaling or planning a story arc', 'Scrolling for meme inspiration', 'Researching a new skill to teach', 'Scrolling trending sounds/hashtags'] },
    { q: 'Your ideal comment section reaction', options: ['"Smart, I need to try this strategy"', '"I felt this so hard"', '"I\'m crying"', '"This actually worked for me!"', '"Wait this is exactly what\'s blowing up"'] },
    { q: 'What frustrates you most about content creation?', options: ['Slow growth despite good content', 'Struggling to be vulnerable/honest', 'Not being naturally funny on camera', 'Simplifying complex topics', 'Trends moving faster than I can keep up'] },
    { q: 'Pick a content format', options: ['A data-backed listicle', 'A personal story post', 'A skit or meme', 'A tutorial', 'A trend remix'] },
    { q: 'What do people compliment you on most?', options: ['Your consistency and strategy', 'Making people feel something', 'Making people laugh', 'Explaining things clearly', 'Always knowing what\'s next'] },
  ];

  const archetypes = ['Strategist', 'Storyteller', 'Entertainer', 'Educator', 'Trendsetter'];
  const archetypeDescriptions: Record<string, { desc: string; tools: string[] }> = {
    Strategist: { desc: 'You\'re the planner. You think in systems, track your numbers, and make decisions based on data. Your content succeeds because you understand the game and play it strategically.', tools: ['roi-calculator', 'content-calendar-generator'] },
    Storyteller: { desc: 'You create content that makes people feel something. Whether it\'s a personal story or a brand narrative, you know that emotion drives connection — and connection drives growth.', tools: ['blog-title-generator', 'brand-story-generator'] },
    Entertainer: { desc: 'You\'re here to make people laugh, smile, and share. Your content is bold, fun, and impossible to scroll past. You thrive on the energy of a good hook and a great punchline.', tools: ['youtube-hook-generator', 'tiktok-script-generator'] },
    Educator: { desc: 'You break things down so others can understand them. Your content teaches, explains, and empowers. People come to you when they want to actually learn something — not just be entertained.', tools: ['blog-outline-generator', 'faq-generator'] },
    Trendsetter: { desc: 'You always know what\'s next. You spot trends before they peak and ride them perfectly. Your content feels fresh because you\'re constantly experimenting with new formats, sounds, and ideas.', tools: ['youtube-shorts-idea', 'tiktok-trending-planner'] },
  };

  // Quiz 3: Marketing Trivia
  const triviaQuestions = [
    { q: 'What does "CTR" stand for?', options: ['Click-through rate', 'Content timing report', 'Customer tracking record', 'Click-to-revenue'], correct: 0 },
    { q: "What's generally considered a strong email open rate?", options: ['1-5%', '15-25%', '50-70%', '90%+'], correct: 1 },
    { q: 'What does "CAC" measure?', options: ['Customer annual cost', 'Cost to acquire a customer', 'Content amplification cost', 'Campaign ad credit'], correct: 1 },
    { q: 'True or false: shorter YouTube titles always outperform longer ones', options: ['True', 'False — it depends on relevance and hook strength', 'Only on mobile', 'Only for gaming channels'], correct: 1 },
    { q: "What's a meta description primarily used for?", options: ['Direct ranking boost', 'Improving CTR from search results', 'Image alt text', 'Internal linking'], correct: 1 },
    { q: 'What does UTM stand for?', options: ['Universal Tracking Method', 'Urchin Tracking Module', 'User Targeting Metric', 'Unified Tag Management'], correct: 1 },
    { q: "What's a healthy bounce rate for a content blog?", options: ['0-10%', '40-60% is often normal', '80-90%', '100%'], correct: 1 },
    { q: 'What does "organic reach" mean?', options: ['Paid promotion reach', 'Unpaid views/reach', 'Email newsletter reach', 'In-store reach'], correct: 1 },
    { q: "What's the ideal Instagram carousel length for engagement?", options: ['1-2 slides', '7-10 slides (test to confirm)', '20+ slides', 'Carousels don\'t matter'], correct: 1 },
    { q: 'What does NPS measure?', options: ['Net profit score', 'Customer loyalty/likelihood to recommend', 'New product sales', 'Network performance score'], correct: 1 },
  ];

  const [triviaScore, setTriviaScore] = useState(0);
  const [triviaAnswers, setTriviaAnswers] = useState<number[]>([]);
  const [triviaTimer, setTriviaTimer] = useState(15);

  // Timer for trivia
  useState(() => {
    if (slug === 'marketing-trivia' && !result && currentStep < triviaQuestions.length) {
      const interval = setInterval(() => {
        setTriviaTimer(prev => {
          if (prev <= 1) {
            handleAnswer(-1);
            return 15;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  });

  function handleAnswer(optionIndex: number) {
    const newAnswers = { ...answers, [currentStep]: optionIndex.toString() };
    setAnswers(newAnswers);

    if (slug === 'marketing-trivia') {
      const q = triviaQuestions[currentStep];
      if (optionIndex === q.correct) setTriviaScore(s => s + 1);
      setTriviaAnswers(prev => [...prev, optionIndex]);
      if (currentStep < triviaQuestions.length - 1) {
        setCurrentStep(s => s + 1);
        setTriviaTimer(15);
      } else {
        setResult('done');
      }
    } else if (currentStep < getTotalSteps() - 1) {
      setCurrentStep(s => s + 1);
    } else {
      computeResult(newAnswers);
    }
  }

  function getTotalSteps(): number {
    if (slug === 'tool-finder') return toolFinderQuestions.length;
    if (slug === 'creator-personality') return personalityQuestions.length;
    if (slug === 'marketing-trivia') return triviaQuestions.length;
    return 0;
  }

  function computeResult(allAnswers: Record<number, string>) {
    if (slug === 'tool-finder') {
      const platform = allAnswers[0] ? toolFinderQuestions[0].options[parseInt(allAnswers[0])] : '';
      const struggle = allAnswers[1] ? toolFinderQuestions[1].options[parseInt(allAnswers[1])] : '';
      const key = `${platform}|${struggle}`;
      const toolSlug = toolFinderMap[key] || toolFinderMap[`${platform}|Getting more views/clicks`] || 'youtube-title-generator';
      setResult(toolSlug);
    } else if (slug === 'creator-personality') {
      const counts: Record<string, number> = {};
      Object.values(allAnswers).forEach(v => {
        const archetype = archetypes[parseInt(v)];
        counts[archetype] = (counts[archetype] || 0) + 1;
      });
      const winner = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Strategist';
      setResult(winner);
    }
  }

  function restart() {
    setCurrentStep(0);
    setAnswers({});
    setResult(null);
    setTriviaScore(0);
    setTriviaAnswers([]);
    setTriviaTimer(15);
  }

  function copyResult() {
    let text = '';
    if (slug === 'tool-finder' && result) {
      const tool = TOOLS.find(t => t.slug === result);
      text = `I needed a ${tool?.name} — found it on Workbench. What tool do YOU need?`;
    } else if (slug === 'creator-personality' && result) {
      text = `I'm The ${result} — what's your creator personality? Take the quiz:`;
    } else if (slug === 'marketing-trivia') {
      text = `I scored ${triviaScore}/10 on the Marketing IQ quiz — can you beat me?`;
    }
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const totalSteps = getTotalSteps();
  const isResult = result !== null;

  // Render result
  if (isResult) {
    let resultContent;
    if (slug === 'tool-finder') {
      const tool = TOOLS.find(t => t.slug === result);
      const Icon = tool?.icon;
      resultContent = (
        <div className="text-center">
          <p className="font-mono text-xs uppercase tracking-wider text-amber mb-3">Your tool</p>
          <div className="w-16 h-16 rounded-2xl bg-amber/10 flex items-center justify-center mx-auto mb-4">
            {Icon && <Icon className="w-8 h-8 text-amber" />}
          </div>
          <h2 className="font-display font-bold text-ink text-2xl">{tool?.name}</h2>
          <p className="text-ink/60 text-sm mt-2 max-w-md mx-auto">{tool?.description}</p>
          <Link to={`/tool/${tool?.slug}`} className="inline-flex items-center gap-2 bg-amber text-bg font-semibold px-6 py-3 rounded-lg mt-6 hover:scale-[0.98] active:scale-95 transition-transform">
            Try it now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      );
    } else if (slug === 'creator-personality') {
      const data = archetypeDescriptions[result];
      const tools = (data?.tools || []).map(s => TOOLS.find(t => t.slug === s)).filter(Boolean);
      resultContent = (
        <div className="text-center">
          <p className="font-mono text-xs uppercase tracking-wider text-amber mb-3">You are</p>
          <h2 className="font-display font-bold text-ink text-3xl">The {result}</h2>
          <p className="text-ink/60 text-sm mt-4 max-w-md mx-auto leading-relaxed">{data?.desc}</p>
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {tools.map(t => t && (
              <Link key={t.slug} to={`/tool/${t.slug}`} className="bg-white/5 hover:bg-white/10 rounded-lg px-4 py-2 text-sm text-ink transition-colors">
                {t.name}
              </Link>
            ))}
          </div>
        </div>
      );
    } else if (slug === 'marketing-trivia') {
      const tier = triviaScore <= 3 ? 'Marketing Rookie' : triviaScore <= 6 ? 'Rising Marketer' : triviaScore <= 8 ? 'Marketing Pro' : 'Marketing Genius';
      resultContent = (
        <div className="text-center">
          <p className="font-mono text-xs uppercase tracking-wider text-amber mb-3">Your score</p>
          <h2 className="font-display font-bold text-amber text-5xl">{triviaScore}/10</h2>
          <p className="font-display font-semibold text-ink text-xl mt-3">{tier}</p>
          <div className="mt-8 text-left space-y-2 max-h-[40vh] overflow-y-auto">
            {triviaQuestions.map((q, i) => (
              <div key={i} className="flex items-start gap-2 text-sm">
                <span className={`font-mono ${triviaAnswers[i] === q.correct ? 'text-amber' : 'text-red-400'}`}>
                  {triviaAnswers[i] === q.correct ? '✓' : '✗'}
                </span>
                <div>
                  <p className="text-ink/70">{q.q}</p>
                  <p className="text-ink/40 text-xs">Correct: {q.options[q.correct]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-24 pb-12">
        <QuizFlipCard cardKey="result">
          {resultContent}
          <div className="flex items-center justify-center gap-3 mt-8">
            <button onClick={copyResult} className="flex items-center gap-1.5 text-ink/60 hover:text-amber text-sm bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg transition-colors">
              {copied ? <Check className="w-3.5 h-3.5 text-amber" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied!' : 'Copy my result'}
            </button>
            <button onClick={restart} className="flex items-center gap-1.5 text-ink/60 hover:text-amber text-sm bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg transition-colors">
              <RotateCcw className="w-3.5 h-3.5" /> Try again
            </button>
          </div>
        </QuizFlipCard>
      </div>
    );
  }

  // Render question
  const questions = slug === 'tool-finder' ? toolFinderQuestions : slug === 'creator-personality' ? personalityQuestions : triviaQuestions;
  const currentQ = questions[currentStep];

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-24 pb-12">
      <Link to="/quizzes" className="flex items-center gap-2 text-ink/50 hover:text-ink text-sm mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> All quizzes
      </Link>

      {/* Progress dots */}
      <div className="flex items-center gap-2 mb-8">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-colors ${i < currentStep ? 'bg-amber' : i === currentStep ? 'bg-amber/60' : 'bg-white/10'}`}
            style={{ width: `${100 / totalSteps}%` }}
          />
        ))}
      </div>

      <QuizFlipCard cardKey={currentStep}>
        <div className="relative">
          {slug === 'marketing-trivia' && (
            <div className="absolute top-0 right-0 w-10 h-10">
              <svg className="w-10 h-10 -rotate-90">
                <circle cx="20" cy="20" r="16" fill="none" stroke="#2A2E38" strokeWidth="3" />
                <circle
                  cx="20" cy="20" r="16" fill="none" stroke="#F2A93B" strokeWidth="3"
                  strokeDasharray={`${(triviaTimer / 15) * 100} 100`}
                  style={{ strokeDasharray: `${(triviaTimer / 15) * 100.5} 100.5` }}
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center font-mono text-xs text-amber">{triviaTimer}</span>
            </div>
          )}

          <p className="font-mono text-xs uppercase tracking-wider text-ink/40 mb-3">
            Question {currentStep + 1} of {totalSteps}
          </p>
          <h2 className="font-display font-semibold text-ink text-xl mb-6 leading-snug">{currentQ.q}</h2>

          <div className="space-y-2">
            {currentQ.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                className="w-full text-left bg-white/5 hover:bg-amber/10 hover:border-amber/30 border border-white/5 rounded-lg px-4 py-3 text-ink/80 text-sm transition-colors"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </QuizFlipCard>
    </div>
  );
}
