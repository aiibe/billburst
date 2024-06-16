import Image from "next/image";
import { motion } from "framer-motion";

import { Card, CardContent } from "./ui/card";
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
        <motion.div layout key={username} className="mb-4">
          <Card>
            <CardContent className="p-6">
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
                    <motion.h4
                      layout
                      className="scroll-m-20 text-xl font-semibold tracking-tight capitalize"
                    >
                      {username}
                    </motion.h4>
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

                <motion.h4
                  layout
                  className="scroll-m-20 text-xl font-semibold tracking-tight"
                >
                  <span className="text-sm mr-1">{currency}</span>
                  {transactions.reduce((total, t) => (total += t.paid), 0)}
                </motion.h4>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
