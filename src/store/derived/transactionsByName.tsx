import { Transaction, useTransactionStore } from "../transactions";

export type MapTransactions = Record<Transaction["id"], Transaction[]>;

export const useMapTransactionsByName = () => {
  const transactions = useTransactionStore((state) => state.transactions);

  // Map transactions by username
  const mapTransactions: MapTransactions = transactions.reduce(
    (acc: MapTransactions, transaction) => {
      const username = transaction.name.toLowerCase();
      if (!acc[username]) {
        acc[username] = [transaction];
      } else {
        acc[username] = [...acc[username], transaction];
      }
      return acc;
    },
    {}
  );

  return mapTransactions;
};
