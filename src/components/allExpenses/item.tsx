import { useTransactionStore } from "@/store/transactions";

import { Cross2Icon } from "@radix-ui/react-icons";

interface Props {
  id: string;
  paid: number;
  description?: string;
}

export const ExpenseItem = (props: Props) => {
  const { id, description, paid } = props;

  const removeTransaction = useTransactionStore(
    (state) => state.removeTransaction
  );

  return (
    <li className="grid grid-cols-5 text-sm tracking-tight py-2 last:mb-0 border-b border-dashed last:border-b-0">
      <p className="flex flex-row items-center col-span-4">
        {/* Remove */}
        <button
          className="w-4 h-4 mr-2 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          onClick={() => removeTransaction(id)}
        >
          <Cross2Icon />
        </button>

        {/* Description */}
        <span
          className={`tracking-tight truncate ${
            !description && "text-muted-foreground italic"
          }`}
        >
          {description || "No description"}
        </span>
      </p>
      <p className="text-right">${paid}</p>
    </li>
  );
};
