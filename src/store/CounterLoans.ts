import { create } from 'zustand';

interface CounterLoanState {
  counterLoan: number[];
  setCounterLoan: (newValue: number[]) => void;
}

const useCounterLoan = create<CounterLoanState>((set) => ({
  counterLoan: [],
  setCounterLoan: (newValue) => set({ counterLoan: newValue }),
}),

);

export default useCounterLoan;
