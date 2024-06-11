import { useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import { randString } from "@/app/utils";
import { MapTransactions } from "@/app/page";

type Member = Record<string, number>;

type Props = {
  mapTransactions: MapTransactions;
  clearAll: () => void;
  totalSpent: number;
};

export default function Settle(props: Props) {
  const { mapTransactions, clearAll, totalSpent } = props;

  const countMembers = Object.keys(mapTransactions).length;
  const averageCost = parseFloat((totalSpent / countMembers).toFixed(2));

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
    <motion.div layout className="mt-6">
      {countMembers > 1 && !!settleSteps.length && (
        <div>
          <div className="mb-4">
            <h2 className="font-bold mb-2 text-2xl">Settle Up</h2>
          </div>
          <div className="mb-4">
            {settleSteps.map(([oweeName, amount, lenderName]) => (
              <div
                key={randString()}
                className="flex justify-between items-center border mb-2 p-3 bg-white rounded-lg"
              >
                {/* Owe */}
                <div className="flex flex-col items-center">
                  <Image
                    className="block rounded-full h-12 w-12"
                    src={`https://api.multiavatar.com/${oweeName}.png`}
                    alt=""
                    width={48}
                    height={48}
                  />
                  <span className="font-bold capitalize">{oweeName}</span>
                </div>

                {/* Amount */}
                <span>→</span>
                <span className="font-bold text-xl text-center text-orange-600">
                  ${amount}
                </span>
                <span>→</span>

                {/* Lender */}
                <div className="flex flex-col items-center">
                  <Image
                    className="block rounded-full h-12 w-12"
                    src={`https://api.multiavatar.com/${lenderName}.png`}
                    alt=""
                    width={48}
                    height={48}
                  />
                  <span className="font-bold capitalize">{lenderName}</span>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={clearAll}
            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-400 hover:bg-gray-500"
          >
            Clear All
          </button>
        </div>
      )}
    </motion.div>
  );
}
