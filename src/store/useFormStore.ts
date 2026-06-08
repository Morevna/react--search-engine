import { create } from 'zustand';
import type { FormData } from '../types/form.types';

interface FormState {
  submissions: FormData[];
  countries: string[];
  addSubmission: (submission: FormData) => void;
}

export const useFormStore = create<FormState>((set) => ({
  submissions: [],
  countries: [
    'Georgia',
    'Germany',
    'United States',
    'United Kingdom',
    'France',
    'Canada',
    'Japan',
    'Australia',
  ],
  addSubmission: (submission) =>
    set((state) => ({
      submissions: [
        ...state.submissions,
        {
          ...submission,
          id: crypto.randomUUID(),
          submittedAt: new Date().toISOString(),
        },
      ],
    })),
}));
