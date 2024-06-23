import { create } from "zustand";

export type Transaction = {
  id: string;
  name: string;
  paid: number;
  description?: string;
};

interface TransactionState {
  transactions: Transaction[];
  addTransaction: (newTransaction: Transaction) => void;
  removeTransaction: (transactionId: string) => void;
  clearAll: () => void;
}

export const useTransactionStore = create<TransactionState>((set) => ({
  transactions: [],
  addTransaction: (newTransaction) =>
    set((prev) => ({ transactions: prev.transactions.concat(newTransaction) })),
  removeTransaction: (transactionId) =>
    set((prev) => ({
      transactions: prev.transactions.filter(({ id }) => id !== transactionId),
    })),
  clearAll: () => set({ transactions: [] }),
}));
