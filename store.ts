import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'


interface RecommendationState {
    recommendations: String[];
    addRecommendation: (newRecommendation: string) => void;
    removeRecommendation: (recommendation: string) => void;
    setHasHydrated: (state: any) => void;
    _hasHydrated: boolean;
}


export const useRecommendationStore = create<RecommendationState>()(
  devtools(
    persist(
      (set) => ({
        recommendations: [],
        addRecommendation: (newRecommendation) => set((state) => ({recommendations: [...state.recommendations, newRecommendation]})),
        removeRecommendation: (recommendation) => set((state) => ({recommendations: state.recommendations.filter(r => r !== recommendation)})),
        _hasHydrated: false,
      setHasHydrated: (state) => {
        set({
          _hasHydrated: state
        });
      }
      }),
      {
        name: 'recommendation-storage',
        storage: createJSONStorage(() => localStorage),
        onRehydrateStorage: () => (state) => {
          state!.setHasHydrated(true)
        }
      }
    ),
  ),
)

