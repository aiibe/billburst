import { motion } from "framer-motion";

type Props = {
  id: string;
  paid: number;
  currency: string;
  onRemove: (transactionId: string) => void;
};

export default function Transaction(props: Props) {
  const { id, paid, currency, onRemove } = props;

  return (
    <li className="text-sm text-gray-500 mt-2">
      <motion.p layout>
        {" "}
        → paid {currency}
        {paid}
        <span
          className="text-xs ml-2 text-red-500 cursor-pointer"
          onClick={() => onRemove(id)}
        >
          remove
        </span>
      </motion.p>
    </li>
  );
}
