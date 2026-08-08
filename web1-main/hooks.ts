import { useState, useEffect, useCallback } from 'react';

const FAVORITES_KEY = 'favorite-tools';
const PRESETS_KEY = 'tool-presets';
const ONBOARDING_KEY = 'onboarding-seen';
const LAST_CHANGELOG_KEY = 'last-viewed-changelog';
const LAST_MODE_KEY = 'last-input-mode';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      if (stored) setFavorites(JSON.parse(stored));
    } catch { /* empty */ }
  }, []);

  const toggleFavorite = useCallback((slug: string) => {
    setFavorites(prev => {
      const next = prev.includes(slug)
        ? prev.filter(s => s !== slug)
        : [...prev, slug];
      try { localStorage.setItem(FAVORITES_KEY, JSON.stringify(next)); } catch { /* empty */ }
      return next;
    });
  }, []);

  const isFavorite = useCallback((slug: string) => favorites.includes(slug), [favorites]);

  return { favorites, toggleFavorite, isFavorite };
}

export interface Preset {
  name: string;
  category: string;
  values: Record<string, string>;
}

export function usePresets(category: string) {
  const [presets, setPresets] = useState<Preset[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(PRESETS_KEY);
      if (stored) {
        const all: Preset[] = JSON.parse(stored);
        setPresets(all.filter(p => p.category === category));
      }
    } catch { /* empty */ }
  }, [category]);

  const savePreset = useCallback((name: string, values: Record<string, string>) => {
    const preset: Preset = { name, category, values };
    setPresets(prev => {
      const next = [...prev.filter(p => p.name !== name), preset];
      try {
        const stored = localStorage.getItem(PRESETS_KEY);
        const all: Preset[] = stored ? JSON.parse(stored) : [];
        const updated = [...all.filter(p => !(p.name === name && p.category === category)), preset];
        localStorage.setItem(PRESETS_KEY, JSON.stringify(updated));
      } catch { /* empty */ }
      return next;
    });
  }, [category]);

  const deletePreset = useCallback((name: string) => {
    setPresets(prev => {
      const next = prev.filter(p => p.name !== name);
      try {
        const stored = localStorage.getItem(PRESETS_KEY);
        const all: Preset[] = stored ? JSON.parse(stored) : [];
        const updated = all.filter(p => !(p.name === name && p.category === category));
        localStorage.setItem(PRESETS_KEY, JSON.stringify(updated));
      } catch { /* empty */ }
      return next;
    });
  }, [category]);

  return { presets, savePreset, deletePreset };
}

export function useLastInputMode(category: string): [string, (mode: string) => void] {
  const [mode, setMode] = useState<string>('scratch');

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LAST_MODE_KEY);
      if (stored) {
        const map: Record<string, string> = JSON.parse(stored);
        setMode(map[category] || 'scratch');
      }
    } catch { /* empty */ }
  }, [category]);

  const setLastMode = useCallback((m: string) => {
    setMode(m);
    try {
      const stored = localStorage.getItem(LAST_MODE_KEY);
      const map: Record<string, string> = stored ? JSON.parse(stored) : {};
      map[category] = m;
      localStorage.setItem(LAST_MODE_KEY, JSON.stringify(map));
    } catch { /* empty */ }
  }, [category]);

  return [mode, setLastMode];
}

export function hasSeenOnboarding(): boolean {
  try { return localStorage.getItem(ONBOARDING_KEY) === 'true'; } catch { return false; }
}

export function markOnboardingSeen() {
  try { localStorage.setItem(ONBOARDING_KEY, 'true'); } catch { /* empty */ }
}

export function getLastChangelogView(): string {
  try { return localStorage.getItem(LAST_CHANGELOG_KEY) || ''; } catch { return ''; }
}

export function setLastChangelogView(date: string) {
  try { localStorage.setItem(LAST_CHANGELOG_KEY, date); } catch { /* empty */ }
}
