import { create } from 'zustand';

export type Element = {
  id: number;
};

interface ElementState {
  elements: Element[],
  add: () => void;
}

export const useElementStore = create<ElementState>()((set) => ({
  elements: [],
  add: () => {
    set(state => {
      const len = state.elements.length;

      return { elements: [...state.elements, ...[{ id: len }]]};
    });
  }
}));

