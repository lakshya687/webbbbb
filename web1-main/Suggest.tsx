import { useState } from 'react';
import { Lightbulb, Check } from 'lucide-react';
import { CATEGORIES } from '@/lib/tools';
import { TiltCard } from '@/components/TiltCard';

export function Suggest() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit() {
    setSubmitted(true);
    setName('');
    setDescription('');
    setCategory('');
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-24 pb-12">
      <h1 className="font-display font-bold text-ink text-4xl mb-2">Suggest a Tool</h1>
      <p className="text-ink/50 text-sm mb-10">Tell us what tool you'd like to see. We review these regularly.</p>

      {submitted ? (
        <TiltCard glowColor="#F2A93B" className="p-8 text-center">
          <div className="w-14 h-14 rounded-2xl bg-amber/10 flex items-center justify-center mx-auto mb-4">
            <Check className="w-7 h-7 text-amber" />
          </div>
          <h2 className="font-display font-bold text-ink text-xl">Thanks — we review these regularly!</h2>
          <p className="text-ink/50 text-sm mt-2">Your suggestion has been noted.</p>
          <button onClick={() => setSubmitted(false)} className="text-amber text-sm mt-6 hover:underline">
            Suggest another tool
          </button>
        </TiltCard>
      ) : (
        <TiltCard glowColor="#F2A93B" className="p-6">
          <div className="space-y-4">
            <div>
              <label className="font-mono text-xs uppercase tracking-wider text-ink/40 block mb-1.5">Tool name</label>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Podcast Intro Generator"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-ink placeholder-ink/30 outline-none focus:border-amber/50 transition-colors"
              />
            </div>
            <div>
              <label className="font-mono text-xs uppercase tracking-wider text-ink/40 block mb-1.5">What should it do?</label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Describe what the tool should generate or do..."
                rows={4}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-ink placeholder-ink/30 outline-none focus:border-amber/50 transition-colors resize-none"
              />
            </div>
            <div>
              <label className="font-mono text-xs uppercase tracking-wider text-ink/40 block mb-1.5">Category</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-ink outline-none focus:border-amber/50 transition-colors"
              >
                <option value="">Select a category...</option>
                {CATEGORIES.map(c => <option key={c.slug} value={c.name}>{c.name}</option>)}
                <option value="Other">Other</option>
              </select>
            </div>
            <button
              onClick={handleSubmit}
              disabled={!name || !description}
              className="bg-amber text-bg font-semibold px-6 py-3 rounded-lg hover:scale-[0.98] active:scale-95 transition-transform disabled:opacity-50 flex items-center gap-2"
            >
              <Lightbulb className="w-4 h-4" /> Submit suggestion
            </button>
          </div>
        </TiltCard>
      )}
    </div>
  );
}
