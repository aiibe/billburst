import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { ExpenseList } from "./list";
import { ExpensesTotal } from "./total";
import AddExpenseDialog from "../expenseForm/dialog";
import SplitExpensesDialog from "../splitExpenses/dialog";

export default function Expenses() {
  return (
    <Card className="mt-4">
      <CardHeader className="border-b py-4">
        <ExpensesTotal />
      </CardHeader>

      <CardContent className="py-4">
        <div className="min-h-34">
          {/* Expenses */}
          <ExpenseList />
        </div>
      </CardContent>

      <CardFooter className="border-t flex justify-between py-4">
        {/* Add expense */}
        <AddExpenseDialog />

        {/* Settle */}
        <SplitExpensesDialog />
      </CardFooter>
    </Card>
  );
}
