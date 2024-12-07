import { create } from 'zustand';

export function createStore<T extends object>(initialState: T) {
  const useStore = create<T>(() => initialState);
  const store = {
    getState: useStore.getState,
    setState: useStore.setState,
  };
  return [useStore, store] as const;
} 