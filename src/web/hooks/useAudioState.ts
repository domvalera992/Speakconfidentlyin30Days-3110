import { useState, useCallback, useEffect } from "react";
import type { AudioPhrase } from "../data/audioPhrases";

interface AudioState {
  favorites: Set<string>;
  history: AudioPhrase[];
  playlists: { id: string; name: string; phrases: AudioPhrase[] }[];
  downloadedPacks: Set<string>;
}

const STORAGE_KEY = "audio_practice_state";

const loadState = (): AudioState => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        favorites: new Set(parsed.favorites || []),
        history: parsed.history || [],
        playlists: parsed.playlists || [],
        downloadedPacks: new Set(parsed.downloadedPacks || []),
      };
    }
  } catch (e) {
    console.error("Failed to load audio state:", e);
  }
  return {
    favorites: new Set(),
    history: [],
    playlists: [],
    downloadedPacks: new Set(),
  };
};

const saveState = (state: AudioState) => {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        favorites: Array.from(state.favorites),
        history: state.history.slice(0, 50), // Keep last 50 items
        playlists: state.playlists,
        downloadedPacks: Array.from(state.downloadedPacks),
      })
    );
  } catch (e) {
    console.error("Failed to save audio state:", e);
  }
};

export function useAudioState() {
  const [state, setState] = useState<AudioState>(loadState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const toggleFavorite = useCallback((phraseId: string) => {
    setState((prev) => {
      const newFavorites = new Set(prev.favorites);
      if (newFavorites.has(phraseId)) {
        newFavorites.delete(phraseId);
      } else {
        newFavorites.add(phraseId);
      }
      return { ...prev, favorites: newFavorites };
    });
  }, []);

  const addToHistory = useCallback((phrase: AudioPhrase) => {
    setState((prev) => {
      // Remove if already in history to avoid duplicates
      const filtered = prev.history.filter((p) => p.id !== phrase.id);
      return {
        ...prev,
        history: [phrase, ...filtered].slice(0, 50),
      };
    });
  }, []);

  const createPlaylist = useCallback((name: string) => {
    setState((prev) => ({
      ...prev,
      playlists: [
        ...prev.playlists,
        { id: Date.now().toString(), name, phrases: [] },
      ],
    }));
  }, []);

  const addToPlaylist = useCallback((playlistId: string, phrase: AudioPhrase) => {
    setState((prev) => ({
      ...prev,
      playlists: prev.playlists.map((p) =>
        p.id === playlistId
          ? { ...p, phrases: [...p.phrases.filter((ph) => ph.id !== phrase.id), phrase] }
          : p
      ),
    }));
  }, []);

  const removeFromPlaylist = useCallback((playlistId: string, phraseId: string) => {
    setState((prev) => ({
      ...prev,
      playlists: prev.playlists.map((p) =>
        p.id === playlistId
          ? { ...p, phrases: p.phrases.filter((ph) => ph.id !== phraseId) }
          : p
      ),
    }));
  }, []);

  const deletePlaylist = useCallback((playlistId: string) => {
    setState((prev) => ({
      ...prev,
      playlists: prev.playlists.filter((p) => p.id !== playlistId),
    }));
  }, []);

  const markPackDownloaded = useCallback((packId: string) => {
    setState((prev) => ({
      ...prev,
      downloadedPacks: new Set([...prev.downloadedPacks, packId]),
    }));
  }, []);

  const clearHistory = useCallback(() => {
    setState((prev) => ({ ...prev, history: [] }));
  }, []);

  return {
    favorites: state.favorites,
    history: state.history,
    playlists: state.playlists,
    downloadedPacks: state.downloadedPacks,
    toggleFavorite,
    addToHistory,
    createPlaylist,
    addToPlaylist,
    removeFromPlaylist,
    deletePlaylist,
    markPackDownloaded,
    clearHistory,
    isFavorite: (id: string) => state.favorites.has(id),
    isDownloaded: (id: string) => state.downloadedPacks.has(id),
  };
}
