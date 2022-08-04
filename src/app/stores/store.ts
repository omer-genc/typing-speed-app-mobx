import { createContext, useContext } from 'react';
import WordStore from './wordStore';

interface Store {
  wordStore: WordStore;
}

export const store: Store = {
  wordStore: new WordStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
