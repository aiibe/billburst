import { motion } from "framer-motion";

import { useTransactionStore } from "@/store/transactions";

type Props = {
  id: string;
  paid: number;
  currency: string;
};

export default function Transaction(props: Props) {
  const { id, paid, currency } = props;

  const removeTransaction = useTransactionStore(
    (state) => state.removeTransaction
  );

  return (
    <li className="text-sm mt-2 ">
      <motion.p layout>
        {" "}
        → paid {currency}
        {paid}
        <span
          className="text-xs ml-2 text-red-500 cursor-pointer"
          onClick={() => removeTransaction(id)}
        >
          remove
        </span>
      </motion.p>
    </li>
  );
}
