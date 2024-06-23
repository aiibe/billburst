import { useCallback, useMemo } from "react";
import { MapTransactions } from "@/store/derived/transactionsByName";
import { useTransactionStore } from "@/store/transactions";
import { randString } from "@/app/utils";

type Member = Record<string, number>;

interface Props {
  mapTransactions: MapTransactions;
}

export const SettleSteps = (props: Props) => {
  const { mapTransactions } = props;

  const transactions = useTransactionStore((state) => state.transactions);

  // Total expenses amount
  const totalSpent = transactions.reduce((t, r) => (t += r.paid), 0);

  // Count participants
  const countParticipants = Object.keys(mapTransactions).length;

  const averageCost = parseFloat((totalSpent / countParticipants).toFixed(2));

  // Get owees and lenders
  const getMembers = useCallback(
    () =>
      Object.entries(mapTransactions).reduce(
        (acc: { owees: Member; lenders: Member }, [username, transactions]) => {
          const spent = transactions.reduce((total, t) => (total += t.paid), 0);
          const left = parseFloat((spent - averageCost).toFixed(2));
          const amount = Math.abs(left);
          left < 0
            ? (acc.owees[username] = amount)
            : (acc.lenders[username] = amount);
          return acc;
        },
        { owees: {}, lenders: {} }
      ),
    [averageCost, mapTransactions]
  );

  // Generate steps to settle up
  const settleSteps = useMemo(() => {
    const { owees, lenders } = getMembers();
    const allSteps: [string, number, string][] = [];

    Object.entries(owees).forEach(([oweName, oweAmount]) => {
      Object.entries(lenders).forEach(([lenderName, lenderAmount]) => {
        if (lenderAmount > 0) {
          const toSubstract = parseFloat((lenderAmount - oweAmount).toFixed(2));
          lenders[lenderName] = Math.abs(toSubstract);
          allSteps.push([
            oweName,
            toSubstract > 0 ? oweAmount : lenderAmount,
            lenderName,
          ]);

          if (toSubstract >= 0) {
            owees[oweName] = 0;
          } else {
            owees[oweName] = Math.abs(toSubstract);
            lenders[lenderName] = 0;
          }
        }
      });
    });

    return allSteps;
  }, [getMembers]);

  return (
    <ul>
      {/* No steps */}
      {!settleSteps.length && (
        <li>
          <h4 className="scroll-m-20 text-sm tracking-tight italic text-center text-muted-foreground">
            No one owes anything 🎉
          </h4>
        </li>
      )}

      {/* Steps */}
      {settleSteps.map(([oweeName, amount, lenderName]) => (
        <li
          key={randString()}
          className="grid grid-cols-5 py-2 last:mb-0 border-b border-dashed last:border-b-0"
        >
          {/* Owe */}
          <h4 className="scroll-m-20 font-semibold tracking-tight capitalize">
            {oweeName}
          </h4>

          {/* Amount */}
          <span className="text-center text-muted-foreground">→</span>

          <p className="scroll-m-20 text-center tracking-tight">${amount}</p>

          <span className="text-center text-muted-foreground">→</span>

          {/* Lender */}
          <h4 className="scroll-m-20 font-semibold tracking-tight text-right capitalize">
            {lenderName}
          </h4>
        </li>
      ))}
    </ul>
  );
};
