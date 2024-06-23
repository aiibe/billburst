import { useState } from "react";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import AddExpenseForm from "./form";
import { PlusCircledIcon } from "@radix-ui/react-icons";

/* -------------------------------- Component ------------------------------- */

export default function AddExpenseDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PlusCircledIcon className="mr-2 h-4 w-4" />
          Add expense
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add expense</DialogTitle>

          <DialogDescription>
            {`Find or add a participant. Then enter the amount of the expense.`}
          </DialogDescription>
        </DialogHeader>

        <div className="bg-card p-4 border rounded-md">
          <AddExpenseForm onAfterSubmit={() => setOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
