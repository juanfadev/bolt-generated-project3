import { create } from 'zustand';

    export const useApiKeyStore = create(set => ({
      apiKey: null,
      setApiKey: apiKey => set({ apiKey }),
    }));
