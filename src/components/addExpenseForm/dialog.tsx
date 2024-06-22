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

/* -------------------------------- Component ------------------------------- */

export default function AddExpenseDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add expense</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add expense</DialogTitle>

          <DialogDescription>
            {`Find or create a new participant. Then enter the amount of the expense.`}
          </DialogDescription>
        </DialogHeader>

        <AddExpenseForm onAfterSubmit={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
