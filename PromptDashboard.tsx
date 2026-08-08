import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Bookmark, Heart, Clock, Copy, Star, Settings, User,
  FolderPlus, Trash2, Search,
} from 'lucide-react';
import { AuroraBackground, GlassCard, GradientButton } from '@/components/pv/AuroraBackground';
import { PromptCard } from '@/components/pv/PromptCard';
import { fetchPrompts, seedPromptsIfNeeded } from '@/lib/prompt-api';
import type { PromptRow } from '@/lib/supabase';

const SAVED_KEY = 'pv-saved-prompts';
const FAVORITES_KEY = 'pv-favorites';
const HISTORY_KEY = 'pv-recently-viewed';
const COLLECTIONS_KEY = 'pv-collections';

interface Collection {
  name: string;
  promptIds: string[];
}

export function PromptDashboard() {
  const [prompts, setPrompts] = useState<PromptRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'saved' | 'favorites' | 'history' | 'collections' | 'settings'>('saved');
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [historyIds, setHistoryIds] = useState<string[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [newCollectionName, setNewCollectionName] = useState('');

  useEffect(() => {
    (async () => {
      await seedPromptsIfNeeded();
      const data = await fetchPrompts();
      setPrompts(data);
      setSavedIds(getFromStorage(SAVED_KEY));
      setFavoriteIds(getFromStorage(FAVORITES_KEY));
      setHistoryIds(getFromStorage(HISTORY_KEY));
      try {
        const c = localStorage.getItem(COLLECTIONS_KEY);
        if (c) setCollections(JSON.parse(c));
      } catch { /* empty */ }
      setLoading(false);
    })();
  }, []);

  const savedPrompts = prompts.filter(p => savedIds.includes(p.id));
  const favoritePrompts = prompts.filter(p => favoriteIds.includes(p.id));
  const historyPrompts = historyIds
    .map(id => prompts.find(p => p.id === id))
    .filter(Boolean) as PromptRow[];

  const createCollection = () => {
    if (!newCollectionName.trim()) return;
    const newCol: Collection = { name: newCollectionName, promptIds: [] };
    const updated = [...collections, newCol];
    setCollections(updated);
    try { localStorage.setItem(COLLECTIONS_KEY, JSON.stringify(updated)); } catch { /* empty */ }
    setNewCollectionName('');
  };

  const deleteCollection = (name: string) => {
    const updated = collections.filter(c => c.name !== name);
    setCollections(updated);
    try { localStorage.setItem(COLLECTIONS_KEY, JSON.stringify(updated)); } catch { /* empty */ }
  };

  const tabs = [
    { id: 'saved' as const, label: 'Saved Prompts', icon: Bookmark, count: savedPrompts.length },
    { id: 'favorites' as const, label: 'Favorites', icon: Heart, count: favoritePrompts.length },
    { id: 'history' as const, label: 'Recently Viewed', icon: Clock, count: historyPrompts.length },
    { id: 'collections' as const, label: 'My Collections', icon: FolderPlus, count: collections.length },
    { id: 'settings' as const, label: 'Settings', icon: Settings, count: 0 },
  ];

  return (
    <AuroraBackground>
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-display font-bold text-pv-text text-4xl mb-2">My Dashboard</h1>
            <p className="text-pv-muted">Manage your saved prompts, collections, and preferences</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Saved', value: savedPrompts.length, icon: Bookmark, color: 'text-pv-purple' },
              { label: 'Favorites', value: favoritePrompts.length, icon: Heart, color: 'text-pv-pink' },
              { label: 'Collections', value: collections.length, icon: FolderPlus, color: 'text-pv-cyan' },
              { label: 'Recently Viewed', value: historyPrompts.length, icon: Clock, color: 'text-pv-blue' },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <GlassCard className="p-5">
                    <Icon className={`w-5 h-5 ${stat.color} mb-2`} />
                    <div className="font-display font-bold text-pv-text text-2xl">{stat.value}</div>
                    <div className="text-pv-muted text-sm">{stat.label}</div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'pv-gradient-button text-white'
                      : 'pv-glass text-pv-muted hover:text-pv-text'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                  {tab.count > 0 && (
                    <span className={`text-xs px-1.5 py-0.5 rounded ${
                      activeTab === tab.id ? 'bg-white/20' : 'bg-white/10'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Content */}
          {loading ? (
            <div className="pv-glass rounded-2xl p-8 h-64 animate-pulse" />
          ) : activeTab === 'saved' ? (
            <PromptGrid prompts={savedPrompts} emptyMessage="You haven't saved any prompts yet." />
          ) : activeTab === 'favorites' ? (
            <PromptGrid prompts={favoritePrompts} emptyMessage="No favorites yet. Star prompts to add them here." />
          ) : activeTab === 'history' ? (
            <PromptGrid prompts={historyPrompts} emptyMessage="No viewing history yet." />
          ) : activeTab === 'collections' ? (
            <div>
              {/* Create collection */}
              <GlassCard className="p-5 mb-6" hover={false}>
                <h3 className="font-display font-semibold text-pv-text mb-3">Create New Collection</h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newCollectionName}
                    onChange={(e) => setNewCollectionName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && createCollection()}
                    placeholder="Collection name..."
                    className="flex-1 pv-glass rounded-xl px-4 py-2.5 text-pv-text placeholder:text-pv-muted outline-none text-sm"
                  />
                  <GradientButton onClick={createCollection} className="!py-2.5">
                    <FolderPlus className="w-4 h-4 mr-1" /> Create
                  </GradientButton>
                </div>
              </GlassCard>

              {/* Collections list */}
              {collections.length === 0 ? (
                <GlassCard className="p-12 text-center" hover={false}>
                  <FolderPlus className="w-12 h-12 text-pv-muted mx-auto mb-4" />
                  <p className="text-pv-muted text-lg">No collections yet. Create one above to organize your prompts.</p>
                </GlassCard>
              ) : (
                <div className="space-y-3">
                  {collections.map(col => {
                    const colPrompts = prompts.filter(p => col.promptIds.includes(p.id));
                    return (
                      <GlassCard key={col.name} className="p-5" hover={false}>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <FolderPlus className="w-5 h-5 text-pv-cyan" />
                            <h3 className="font-display font-semibold text-pv-text">{col.name}</h3>
                            <span className="text-xs text-pv-muted bg-white/5 px-2 py-0.5 rounded">
                              {colPrompts.length} prompts
                            </span>
                          </div>
                          <button
                            onClick={() => deleteCollection(col.name)}
                            className="text-pv-muted hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        {colPrompts.length === 0 ? (
                          <p className="text-pv-muted text-sm">No prompts in this collection yet.</p>
                        ) : (
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {colPrompts.slice(0, 3).map(p => (
                              <PromptCard key={p.id} prompt={p} />
                            ))}
                          </div>
                        )}
                      </GlassCard>
                    );
                  })}
                </div>
              )}
            </div>
          ) : activeTab === 'settings' ? (
            <GlassCard className="p-8" hover={false}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl pv-gradient-button flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-pv-text text-lg">Account Settings</h3>
                  <p className="text-pv-muted text-sm">Manage your profile and preferences</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-pv-muted mb-2 block">Display Name</label>
                  <input
                    type="text"
                    defaultValue="PromptVerse User"
                    className="w-full pv-glass rounded-xl px-4 py-2.5 text-pv-text outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-pv-muted mb-2 block">Email</label>
                  <input
                    type="email"
                    defaultValue="user@promptverse.ai"
                    className="w-full pv-glass rounded-xl px-4 py-2.5 text-pv-text outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-pv-muted mb-2 block">Preferred AI Model</label>
                  <select className="w-full pv-glass rounded-xl px-4 py-2.5 text-pv-text outline-none text-sm">
                    <option className="bg-pv-surface">ChatGPT</option>
                    <option className="bg-pv-surface">Claude</option>
                    <option className="bg-pv-surface">Gemini</option>
                    <option className="bg-pv-surface">Midjourney</option>
                  </select>
                </div>
                <GradientButton className="mt-4">Save Changes</GradientButton>
              </div>
            </GlassCard>
          ) : null}
        </div>
      </div>
    </AuroraBackground>
  );
}

function PromptGrid({ prompts, emptyMessage }: { prompts: PromptRow[]; emptyMessage: string }) {
  if (prompts.length === 0) {
    return (
      <GlassCard className="p-12 text-center" hover={false}>
        <Search className="w-12 h-12 text-pv-muted mx-auto mb-4" />
        <p className="text-pv-muted text-lg mb-4">{emptyMessage}</p>
        <Link to="/prompts">
          <GradientButton>Explore Prompts</GradientButton>
        </Link>
      </GlassCard>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {prompts.map((p, i) => (
        <PromptCard key={p.id} prompt={p} index={i} />
      ))}
    </div>
  );
}

function getFromStorage(key: string): string[] {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : [];
  } catch { return []; }
}
