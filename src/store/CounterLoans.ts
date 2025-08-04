import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CounterLoanState {
  counterLoan: number[];
  setCounterLoan: (newValue: number[]) => void;
}

const useCounterLoan = create(
  persist<CounterLoanState>(
    (set) => ({
      counterLoan: [],
      setCounterLoan: (newValue) => set({ counterLoan: newValue }),
    }),
    {
      name: 'counterLoan-storage', 
    }
  )
);

export default useCounterLoan;
