import { create } from "zustand";

interface ExperienceUIState {
  // Loading Phase
  isLoadingAssets: boolean;
  assetsLoaded: boolean;

  // Intro Phase (auto)
  isIntroPlaying: boolean;
  introFinished: boolean;

  // User Interaction (manual)
  hasUserEntered: boolean;

  // Experience / Scene Ready
  experienceStarted: boolean;

  // UI Blocking (hover)
  isUIHovered: boolean;

  // Setters
  setIsLoadingAssets: (v: boolean) => void;
  setAssetsLoaded: (v: boolean) => void;

  setIsIntroPlaying: (v: boolean) => void;
  setIntroFinished: (v: boolean) => void;

  setHasUserEntered: (v: boolean) => void;

  setExperienceStarted: (v: boolean) => void;

  setIsUIHovered: (v: boolean) => void;
}

const useExperienceUIStore = create<ExperienceUIState>((set, get) => ({
  // --- Loading ---
  isLoadingAssets: true,
  assetsLoaded: false,

  // --- Intro ---
  isIntroPlaying: false,
  introFinished: false,

  // --- Enter Button ---
  hasUserEntered: false,

  // --- Experience ---
  experienceStarted: false,

  // --- UI Hover ---
  isUIHovered: false,

  // --- Loading setters ---
  setIsLoadingAssets: (v) => {
    if (get().isLoadingAssets === v) return;
    set({ isLoadingAssets: v });
  },
  setAssetsLoaded: (v) => {
    if (get().assetsLoaded === v) return;
    set({ assetsLoaded: v });
  },

  // --- Intro setters ---
  setIsIntroPlaying: (v) => {
    if (get().isIntroPlaying === v) return;
    set({ isIntroPlaying: v });
  },
  setIntroFinished: (v) => {
    if (get().introFinished === v) return;
    set({ introFinished: v });
  },

  // --- User enters experience ---
  setHasUserEntered: (v) => {
    if (get().hasUserEntered === v) return;
    set({ hasUserEntered: v });
  },

  // --- Scene ready ---
  setExperienceStarted: (v) => {
    if (get().experienceStarted === v) return;
    set({ experienceStarted: v });
  },

  // --- Hover blocking ---
  setIsUIHovered: (v) => {
    if (get().isUIHovered === v) return;
    set({ isUIHovered: v });
  },
}));

export default useExperienceUIStore;
