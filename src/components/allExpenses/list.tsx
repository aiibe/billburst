import { ExpenseItem } from "./item";
import { useMapTransactionsByName } from "@/store/derived/transactionsByName";
import { ExpenseEmpty } from "./emptyList";

export const ExpenseList = () => {
  const mapTransactions = useMapTransactionsByName();

  // Count participants
  const countParticipants = Object.keys(mapTransactions).length;

  if (countParticipants < 1) return <ExpenseEmpty />;

  return (
    <ul>
      {Object.entries(mapTransactions).map(([username, userTransactions]) => (
        <li
          key={username}
          className="border-b py-2 first:pt-0 last:border-b-0 last:pb-0"
        >
          <div className="grid grid-cols-5">
            {/* Username */}
            <h4 className="col-span-4 scroll-m-20 font-semibold tracking-tight capitalize">
              {username}
            </h4>

            {/* User total expenses */}
            <h4 className="scroll-m-20 font-semibold tracking-tight text-right truncate">
              $
              {userTransactions
                .reduce((total, t) => (total += t.paid), 0)
                .toFixed(2)}
            </h4>
          </div>

          {/* User expenses list */}
          <ul>
            {userTransactions.map(({ id, paid, description }) => (
              <ExpenseItem
                key={id}
                id={id}
                description={description}
                paid={paid}
              />
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};
