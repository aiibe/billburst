import { useTransactionStore } from "../transactions";

/**
 * Returns an array of unique participant names from the transactions stored in the transaction store.
 */
export const useParticipantStore = () => {
  const transactions = useTransactionStore((state) => state.transactions);

  const participants = transactions.reduce((acc: string[], transaction) => {
    const username = transaction.name.toLowerCase();
    if (!acc.includes(username)) acc.push(username);
    return acc;
  }, []);

  return participants;
};
