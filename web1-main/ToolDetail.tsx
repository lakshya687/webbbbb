import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Sparkles, Copy, Download, Share2, ThumbsUp, ThumbsDown,
  ChevronDown, Layers, Save, Trash2, AlertCircle, Link2, FileText, Check,
} from 'lucide-react';
import { TOOLS, CATEGORIES } from '@/lib/tools';
import { StarButton } from '@/components/StarButton';
import { TiltCard } from '@/components/TiltCard';
import { useFavorites, usePresets, useLastInputMode } from '@/lib/hooks';
import { generate, calculatorFunctions, calculatorInputs, getUsageCount, formatCount } from '@/lib/generator';
import { getLinkPlaceholder, getScratchFields, hasLinkMode, hasScratchMode, type ScratchFieldOption } from '@/lib/scratch-config';

export function ToolDetail() {
  const { slug } = useParams<{ slug: string }>();
  const tool = TOOLS.find(t => t.slug === slug)!;
  const { isFavorite, toggleFavorite } = useFavorites();

  const [mode, setMode] = useState<string>('scratch');
  const [linkUrl, setLinkUrl] = useState('');
  const [linkLoaded, setLinkLoaded] = useState(false);
  const [linkTitle, setLinkTitle] = useState('');
  const [linkError, setLinkError] = useState(false);
  const [manualText, setManualText] = useState('');
  const [showManual, setShowManual] = useState(false);
  const [scratchPicks, setScratchPicks] = useState<Record<string, string>>({});
  const [batchMode, setBatchMode] = useState(false);
  const [batchInput, setBatchInput] = useState('');

  const [result, setResult] = useState<string | null>(null);
  const [isList, setIsList] = useState(false);
  const [batchResults, setBatchResults] = useState<{ input: string; output: string }[]>([]);
  const [batchProgress, setBatchProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [feedbackGiven, setFeedbackGiven] = useState<'up' | 'down' | null>(null);
  const [showReport, setShowReport] = useState(false);
  const [showExample, setShowExample] = useState(false);

  const [calcInputs, setCalcInputs] = useState<Record<string, number>>({});
  const [calcResult, setCalcResult] = useState<{ result: number; label: string; breakdown: string } | null>(null);

  const [lastMode, setLastMode] = useLastInputMode(tool?.category || '');
  const { presets, savePreset, deletePreset } = usePresets(tool?.category || '');
  const [presetName, setPresetName] = useState('');
  const [showSavePreset, setShowSavePreset] = useState(false);
  const [activePreset, setActivePreset] = useState<string>('');

  useEffect(() => {
    setMode(lastMode);
  }, [lastMode]);

  useEffect(() => {
    setResult(null);
    setBatchResults([]);
    setBatchProgress(0);
    setCalcResult(null);
    setError(false);
    setFeedbackGiven(null);
  }, [slug]);

  if (!tool) {
    return (
      <div className="max-w-3xl mx-auto px-4 pt-32 pb-20 text-center">
        <h1 className="font-display font-bold text-ink text-3xl">Tool not found</h1>
        <Link to="/tools" className="text-amber mt-4 inline-block">Browse all tools</Link>
      </div>
    );
  }

  const Icon = tool.icon;
  const category = CATEGORIES.find(c => c.name === tool.category);
  const glow = category?.glow || '#F2A93B';
  const isCalculator = tool.inputType === 'number';
  const isMultiInput = tool.inputType === 'multi-input';
  const scratchFields = getScratchFields(tool);
  const canLink = hasLinkMode(tool);
  const canScratch = hasScratchMode(tool);
  const count = getUsageCount(tool.slug);

  const relatedTools = TOOLS
    .filter(t => t.category === tool.category && t.slug !== tool.slug)
    .slice(0, 3);

  function handleModeChange(m: string) {
    setMode(m);
    setLastMode(m);
  }

  function handleLinkSubmit() {
    if (!linkUrl.trim()) return;
    setLoading(true);
    setLinkError(false);
    setTimeout(() => {
      const title = linkUrl.replace(/^https?:\/\//, '').split('/')[0];
      setLinkTitle(title);
      setLinkLoaded(true);
      setLoading(false);
    }, 800);
  }

  async function handleGenerate() {
    if (isCalculator) {
      const fn = calculatorFunctions[tool.slug];
      if (fn) {
        const r = fn(calcInputs);
        setCalcResult(r);
      }
      return;
    }

    setLoading(true);
    setError(false);
    setResult(null);

    let inputText = '';
    if (mode === 'link' && linkLoaded) {
      inputText = `${linkTitle} ${manualText}`.trim();
    } else if (mode === 'scratch') {
      inputText = Object.values(scratchPicks).join(' ');
      if (manualText) inputText = `${inputText} ${manualText}`.trim();
      if (!inputText) inputText = tool.name;
    } else {
      inputText = manualText;
    }

    if (batchMode) {
      const lines = batchInput.split('\n').filter(l => l.trim()).slice(0, 20);
      setBatchResults([]);
      setBatchProgress(0);
      for (let i = 0; i < lines.length; i++) {
        const r = await generate({ tool, input: lines[i], scratchPicks });
        setBatchResults(prev => [...prev, { input: lines[i], output: r.text }]);
        setBatchProgress(i + 1);
      }
      setLoading(false);
      return;
    }

    try {
      const r = await generate({ tool, input: inputText, scratchPicks });
      setResult(r.text);
      setIsList(r.isList || false);
      setFeedbackGiven(null);
    } catch {
      setError(true);
    }
    setLoading(false);
  }

  function handleCopy(text: string) {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleDownload(text: string) {
    const date = new Date().toISOString().split('T')[0];
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${tool.slug}-${date}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleShare(text: string) {
    const shareText = `${tool.name} output:\n\n${text}\n\nGenerated with Workbench — 159 free AI tools for creators.`;
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function applyPreset(name: string) {
    setActivePreset(name);
    if (!name) { setScratchPicks({}); return; }
    const preset = presets.find(p => p.name === name);
    if (preset) setScratchPicks(preset.values);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-24 pb-12">
      {/* Breadcrumb */}
      <Link to="/tools" className="flex items-center gap-2 text-ink/50 hover:text-ink text-sm mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> All tools
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
            <Icon className="w-6 h-6 text-amber" />
          </div>
          <div>
            <h1 className="font-display font-bold text-ink text-3xl">{tool.name}</h1>
            <p className="text-ink/50 text-sm mt-1">{tool.description}</p>
            <p className="font-mono text-[10px] text-ink/30 mt-1">{tool.category} · {formatCount(count)}+ generated</p>
          </div>
        </div>
        <StarButton favorited={isFavorite(tool.slug)} onToggle={() => toggleFavorite(tool.slug)} size={24} />
      </div>

      {/* Calculator */}
      {isCalculator && calculatorInputs[tool.slug] && (
        <TiltCard glowColor={glow} className="p-6">
          <div className="space-y-4">
            {calculatorInputs[tool.slug].map(field => (
              <div key={field.key}>
                <label className="font-mono text-xs uppercase tracking-wider text-ink/40 block mb-1.5">{field.label}</label>
                <input
                  type="number"
                  value={calcInputs[field.key] || ''}
                  onChange={e => setCalcInputs(prev => ({ ...prev, [field.key]: parseFloat(e.target.value) || 0 }))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-ink outline-none focus:border-amber/50 transition-colors"
                />
              </div>
            ))}
            <button
              onClick={handleGenerate}
              className="bg-amber text-bg font-semibold px-6 py-3 rounded-lg hover:scale-[0.98] active:scale-95 transition-transform flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" /> Calculate
            </button>
            {calcResult && (
              <div className="mt-6 p-5 bg-white/5 rounded-lg border border-white/5">
                <p className="font-mono text-xs uppercase tracking-wider text-ink/40">{calcResult.label}</p>
                <p className="font-display font-bold text-amber text-4xl mt-1">
                  {calcResult.label.includes('Rate') || calcResult.label.includes('NPS') || calcResult.label.includes('Lift')
                    ? `${calcResult.result.toFixed(1)}%`
                    : calcResult.label.includes('Ratio')
                    ? `${calcResult.result.toFixed(1)}:1`
                    : `$${calcResult.result.toFixed(2)}`}
                </p>
                <p className="font-mono text-xs text-ink/40 mt-3">{calcResult.breakdown}</p>
              </div>
            )}
          </div>
        </TiltCard>
      )}

      {/* Multi-input (UTM builder) */}
      {isMultiInput && (
        <TiltCard glowColor={glow} className="p-6">
          <p className="text-ink/50 text-sm">This tool uses specific structured inputs. Configure your parameters below.</p>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {['Source', 'Medium', 'Campaign', 'Term', 'Content'].map(f => (
              <div key={f}>
                <label className="font-mono text-xs uppercase tracking-wider text-ink/40 block mb-1.5">{f}</label>
                <input
                  placeholder={f.toLowerCase()}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-ink outline-none focus:border-amber/50 transition-colors"
                />
              </div>
            ))}
          </div>
          <button
            onClick={() => setResult('https://yoursite.com/?utm_source=source&utm_medium=medium&utm_campaign=campaign')}
            className="bg-amber text-bg font-semibold px-6 py-3 rounded-lg hover:scale-[0.98] active:scale-95 transition-transform flex items-center gap-2 mt-4"
          >
            <Sparkles className="w-4 h-4" /> Generate URL
          </button>
        </TiltCard>
      )}

      {/* Text/textarea tools */}
      {!isCalculator && !isMultiInput && (
        <>
          {/* Link vs Scratch toggle */}
          {canLink && canScratch && (
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => handleModeChange('link')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === 'link' ? 'bg-amber text-bg' : 'bg-white/5 text-ink/60 hover:bg-white/10'}`}
              >
                <Link2 className="w-3.5 h-3.5" /> I have a link
              </button>
              <button
                onClick={() => handleModeChange('scratch')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === 'scratch' ? 'bg-amber text-bg' : 'bg-white/5 text-ink/60 hover:bg-white/10'}`}
              >
                <FileText className="w-3.5 h-3.5" /> Starting from scratch
              </button>
            </div>
          )}

          {/* Link mode */}
          {mode === 'link' && canLink && (
            <div className="mb-4">
              <input
                type="url"
                value={linkUrl}
                onChange={e => { setLinkUrl(e.target.value); setLinkLoaded(false); setLinkError(false); }}
                onBlur={handleLinkSubmit}
                placeholder={getLinkPlaceholder(tool)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-ink placeholder-ink/30 outline-none focus:border-amber/50 transition-colors"
              />
              {linkLoaded && (
                <div className="flex items-center gap-2 mt-2 text-sm text-amber">
                  <Check className="w-4 h-4" /> Found: "{linkTitle}"
                </div>
              )}
              {linkError && (
                <div className="flex items-center gap-2 mt-2 text-sm text-ink/50">
                  <AlertCircle className="w-4 h-4" /> Couldn't read that link — try pasting your content instead.
                </div>
              )}
              {tool.linkRequired && (
                <p className="font-mono text-[10px] text-ink/40 mt-2">This works best with a link — {tool.name.toLowerCase()} needs the actual content.</p>
              )}
            </div>
          )}

          {/* Scratch mode */}
          {mode === 'scratch' && canScratch && scratchFields.length > 0 && (
            <div className="mb-4">
              {/* Presets */}
              {presets.length > 0 && (
                <div className="mb-3">
                  <label className="font-mono text-xs uppercase tracking-wider text-ink/40 block mb-1.5">My Presets</label>
                  <div className="flex items-center gap-2">
                    <select
                      value={activePreset}
                      onChange={e => applyPreset(e.target.value)}
                      className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-ink text-sm outline-none focus:border-amber/50"
                    >
                      <option value="">No preset</option>
                      {presets.map(p => <option key={p.name} value={p.name}>{p.name}</option>)}
                    </select>
                    {activePreset && (
                      <button onClick={() => { deletePreset(activePreset); setActivePreset(''); }} className="text-ink/40 hover:text-red-400 p-1.5">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {scratchFields.map(field => (
                  <div key={field.key}>
                    <label className="font-mono text-xs uppercase tracking-wider text-ink/40 block mb-1.5">{field.label}</label>
                    <select
                      value={scratchPicks[field.key] || ''}
                      onChange={e => setScratchPicks(prev => ({ ...prev, [field.key]: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-ink text-sm outline-none focus:border-amber/50 transition-colors"
                    >
                      <option value="">Select {field.label.toLowerCase()}...</option>
                      {field.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </div>
                ))}
              </div>

              {/* Save preset */}
              <div className="mt-3">
                {!showSavePreset ? (
                  <button onClick={() => setShowSavePreset(true)} className="flex items-center gap-1.5 text-ink/40 hover:text-amber text-xs transition-colors">
                    <Save className="w-3.5 h-3.5" /> Save as preset
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <input
                      value={presetName}
                      onChange={e => setPresetName(e.target.value)}
                      placeholder="Preset name (e.g. My Tech Channel)"
                      className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-ink text-sm outline-none focus:border-amber/50"
                    />
                    <button
                      onClick={() => { if (presetName) { savePreset(presetName, scratchPicks); setPresetName(''); setShowSavePreset(false); } }}
                      className="bg-amber text-bg text-sm font-medium px-3 py-1.5 rounded-lg"
                    >Save</button>
                    <button onClick={() => setShowSavePreset(false)} className="text-ink/40 text-sm px-2">Cancel</button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Manual text fallback */}
          {(canLink || canScratch) && (
            <div className="mb-4">
              {!showManual ? (
                <button onClick={() => setShowManual(true)} className="text-ink/40 hover:text-amber text-xs transition-colors">
                  or type your own input
                </button>
              ) : (
                <div>
                  <textarea
                    value={manualText}
                    onChange={e => setManualText(e.target.value)}
                    placeholder={`Enter your ${tool.name.toLowerCase()} input here...`}
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-ink placeholder-ink/30 outline-none focus:border-amber/50 transition-colors resize-none"
                  />
                </div>
              )}
            </div>
          )}

          {/* Scratch-only tools (no link toggle) */}
          {tool.scratchOnly && scratchFields.length === 0 && (
            <textarea
              value={manualText}
              onChange={e => setManualText(e.target.value)}
              placeholder={`Enter your ${tool.name.toLowerCase()} input here...`}
              rows={4}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-ink placeholder-ink/30 outline-none focus:border-amber/50 transition-colors resize-none mb-4"
            />
          )}

          {/* Batch mode toggle */}
          {!tool.scratchOnly && tool.inputType === 'textarea' && (
            <div className="mb-4">
              <button
                onClick={() => setBatchMode(!batchMode)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${batchMode ? 'bg-blueprint/20 text-blueprint' : 'bg-white/5 text-ink/50 hover:bg-white/10'}`}
              >
                <Layers className="w-3.5 h-3.5" /> Batch mode
              </button>
              {batchMode && (
                <p className="font-mono text-[10px] text-ink/40 mt-1.5">One topic per line. Max 20 items per batch.</p>
              )}
            </div>
          )}

          {/* Batch input */}
          {batchMode && (
            <textarea
              value={batchInput}
              onChange={e => setBatchInput(e.target.value)}
              placeholder="Enter one topic per line..."
              rows={6}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-ink placeholder-ink/30 outline-none focus:border-amber/50 transition-colors resize-none mb-4 font-mono text-sm"
            />
          )}

          {/* Generate button */}
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="bg-amber text-bg font-semibold px-6 py-3 rounded-lg hover:scale-[0.98] active:scale-95 transition-transform flex items-center gap-2 disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            {loading ? (batchMode ? `Generating ${batchProgress} of ${batchInput.split('\n').filter(l => l.trim()).slice(0, 20).length}...` : 'Generating...') : (isCalculator ? 'Calculate' : 'Generate')}
          </button>

          {/* Error */}
          {error && (
            <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-400 text-sm">
              <AlertCircle className="w-4 h-4" /> Something went wrong generating this — try again.
            </div>
          )}

          {/* Single result */}
          {result && !batchMode && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
              <div className="bg-slate border border-white/5 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <button onClick={() => handleCopy(result)} className="flex items-center gap-1.5 text-ink/60 hover:text-amber text-sm bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg transition-colors">
                    {copied ? <Check className="w-3.5 h-3.5 text-amber" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                  <button onClick={() => handleDownload(result)} className="flex items-center gap-1.5 text-ink/60 hover:text-amber text-sm bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg transition-colors">
                    <Download className="w-3.5 h-3.5" /> Download
                  </button>
                  <button onClick={() => handleShare(result)} className="flex items-center gap-1.5 text-ink/60 hover:text-amber text-sm bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg transition-colors">
                    <Share2 className="w-3.5 h-3.5" /> Share
                  </button>
                </div>
                {isList ? (
                  <div className="space-y-1">
                    {result.split('\n').map((item, i) => (
                      <div key={i} className="font-mono text-sm text-ink/80 py-1 px-3 bg-white/5 rounded">{item}</div>
                    ))}
                  </div>
                ) : (
                  <pre className="text-ink/80 text-sm whitespace-pre-wrap font-sans leading-relaxed">{result}</pre>
                )}

                {/* Feedback */}
                <div className="flex items-center gap-4 mt-5 pt-4 border-t border-white/5">
                  <span className="text-ink/40 text-xs">Was this helpful?</span>
                  <button
                    onClick={() => setFeedbackGiven('up')}
                    disabled={feedbackGiven !== null}
                    className={`p-1.5 rounded-lg transition-colors ${feedbackGiven === 'up' ? 'text-amber bg-amber/10' : 'text-ink/40 hover:text-amber hover:bg-white/5'}`}
                  >
                    <ThumbsUp className="w-4 h-4" fill={feedbackGiven === 'up' ? '#F2A93B' : 'none'} />
                  </button>
                  <button
                    onClick={() => setFeedbackGiven('down')}
                    disabled={feedbackGiven !== null}
                    className={`p-1.5 rounded-lg transition-colors ${feedbackGiven === 'down' ? 'text-amber bg-amber/10' : 'text-ink/40 hover:text-amber hover:bg-white/5'}`}
                  >
                    <ThumbsDown className="w-4 h-4" fill={feedbackGiven === 'down' ? '#F2A93B' : 'none'} />
                  </button>
                  {feedbackGiven && <span className="text-ink/40 text-xs">Thanks for the feedback!</span>}
                  <button onClick={() => setShowReport(true)} className="text-ink/30 hover:text-amber text-xs ml-auto transition-colors">
                    Report an issue
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Batch results */}
          {batchMode && batchResults.length > 0 && (
            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between">
                <p className="font-mono text-xs text-ink/40">{batchResults.length} results</p>
                <button
                  onClick={() => handleCopy(batchResults.map(r => r.output).join('\n\n'))}
                  className="flex items-center gap-1.5 text-ink/60 hover:text-amber text-sm bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-amber" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied!' : 'Copy all'}
                </button>
              </div>
              {batchResults.map((r, i) => (
                <div key={i} className="bg-slate border border-white/5 rounded-lg p-4">
                  <p className="font-mono text-xs text-ink/40 mb-2">Input: {r.input}</p>
                  <pre className="text-ink/80 text-sm whitespace-pre-wrap font-sans leading-relaxed">{r.output}</pre>
                  <button onClick={() => handleCopy(r.output)} className="flex items-center gap-1 text-ink/40 hover:text-amber text-xs mt-2 transition-colors">
                    <Copy className="w-3 h-3" /> Copy
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Example */}
          {tool.exampleInput && tool.exampleOutput && (
            <div className="mt-8">
              <button
                onClick={() => setShowExample(!showExample)}
                className="flex items-center gap-2 text-ink/50 hover:text-ink text-sm transition-colors"
              >
                <ChevronDown className={`w-4 h-4 transition-transform ${showExample ? 'rotate-180' : ''}`} />
                See an example
              </button>
              <AnimatePresence>
                {showExample && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="bg-white/5 rounded-lg p-4">
                        <p className="font-mono text-[10px] uppercase tracking-wider text-ink/40 mb-2">Input</p>
                        <p className="text-ink/70 text-sm">{tool.exampleInput}</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-4">
                        <p className="font-mono text-[10px] uppercase tracking-wider text-ink/40 mb-2">Output</p>
                        <pre className="text-ink/70 text-sm whitespace-pre-wrap font-sans">{tool.exampleOutput}</pre>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </>
      )}

      {/* Report modal */}
      <AnimatePresence>
        {showReport && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowReport(false)} />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-slate border border-white/10 rounded-xl p-6 w-full max-w-md"
            >
              <h3 className="font-display font-bold text-ink text-lg">Report an issue</h3>
              <p className="text-ink/50 text-sm mt-1">What went wrong with this result?</p>
              <textarea
                rows={4}
                placeholder="Describe the issue..."
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-ink placeholder-ink/30 outline-none focus:border-amber/50 mt-4 resize-none"
              />
              <div className="flex items-center justify-end gap-2 mt-4">
                <button onClick={() => setShowReport(false)} className="text-ink/50 text-sm px-3 py-1.5">Cancel</button>
                <button
                  onClick={() => { setShowReport(false); setFeedbackGiven('down'); }}
                  className="bg-amber text-bg text-sm font-medium px-4 py-1.5 rounded-lg"
                >Submit</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Related tools */}
      {relatedTools.length > 0 && (
        <div className="mt-16">
          <h2 className="font-display font-bold text-ink text-xl mb-4">Related Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedTools.map(t => {
              const RIcon = t.icon;
              return (
                <Link key={t.slug} to={`/tool/${t.slug}`}>
                  <TiltCard glowColor={glow} className="p-4 h-full">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center">
                        <RIcon className="w-4.5 h-4.5 text-amber" />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-ink text-sm">{t.name}</h3>
                        <p className="text-ink/50 text-xs mt-0.5 line-clamp-1">{t.description}</p>
                      </div>
                    </div>
                  </TiltCard>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
