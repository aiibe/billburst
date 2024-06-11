import Image from "next/image";
import { motion } from "framer-motion";

import Transaction from "./transaction";
import { MapTransactions } from "@/app/page";

type Props = {
  mapTransactions: MapTransactions;
  currency: string;
  onRemove: (transactionId: string) => void;
};

export default function Group(props: Props) {
  const { mapTransactions, currency, onRemove } = props;

  return (
    <div className="mt-4">
      {Object.entries(mapTransactions).map(([username, transactions]) => (
        <motion.div layout key={username}>
          <div className="px-3 py-3 bg-white border overflow-hidden mb-4 rounded-lg">
            <div className="flex justify-between items-center">
              <div className="flex">
                <div className="flex-shrink-0 h-12 w-12 mr-3">
                  <Image
                    className="block rounded-full mr-4"
                    src={`https://api.multiavatar.com/${username}.png`}
                    alt={username}
                    width={48}
                    height={48}
                  />
                </div>

                <div>
                  <motion.h3 layout className="text-base font-bold capitalize">
                    {username}
                  </motion.h3>
                  <ul>
                    {transactions.map(({ id, paid }, idx) => (
                      <Transaction
                        key={idx}
                        id={id}
                        paid={paid}
                        currency={currency}
                        onRemove={onRemove}
                      />
                    ))}
                  </ul>
                </div>
              </div>

              <motion.h2 layout className="text-2xl font-bold">
                <span className="text-sm mr-1 align-top">{currency}</span>
                {transactions.reduce((total, t) => (total += t.paid), 0)}
              </motion.h2>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
