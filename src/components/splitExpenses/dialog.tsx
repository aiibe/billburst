import { useState } from "react";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { ScissorsIcon } from "@radix-ui/react-icons";
import { SettleSteps } from "./list";
import { useTransactionStore } from "@/store/transactions";
import { useMapTransactionsByName } from "@/store/derived/transactionsByName";

/* -------------------------------- Component ------------------------------- */

export default function SplitExpensesDialog() {
  const mapTransactions = useMapTransactionsByName();
  const clearTransactions = useTransactionStore((state) => state.clearAll);

  const [open, setOpen] = useState(false);

  // Count participants
  const countParticipants = Object.keys(mapTransactions).length;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button disabled={countParticipants <= 1}>
          <ScissorsIcon className="mr-2 h-4 w-4" />
          Split equally
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Split up equally</DialogTitle>

          <DialogDescription>
            {`Follow the steps below to settle up`}
          </DialogDescription>
        </DialogHeader>

        {/* Settle steps */}
        <div className="bg-card p-4 border rounded-md">
          <SettleSteps mapTransactions={mapTransactions} />
        </div>

        <DialogFooter>
          {/* Clear transactions */}
          <Button
            variant="destructive"
            disabled={countParticipants <= 1}
            onClick={clearTransactions}
          >
            Clear All
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
