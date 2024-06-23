import { useTransactionStore } from "@/store/transactions";

import { CardTitle } from "../ui/card";

export const ExpensesTotal = () => {
  const transactions = useTransactionStore((state) => state.transactions);

  // Total expenses amount
  const totalSpent = transactions.reduce((t, r) => (t += r.paid), 0);

  return (
    <div className="w-full flex justify-between items-baseline">
      <CardTitle>Total spent</CardTitle>
      <span className="scroll-m-20 text-xl font-semibold tracking-tight">
        {`$${totalSpent}`}
      </span>
    </div>
  );
};
