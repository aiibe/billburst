import { useState } from "react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { ParticipantSelect } from "./participantSelect";
import { AmountInput } from "./amountInput";

import { useParticipantStore } from "@/store/derived/participants";
import { useTransactionStore } from "@/store/transactions";

import { randString } from "@/app/utils";

type AddExpenseFormState = {
  name: string;
  paid: string;
};

/* -------------------------------- Constants ------------------------------- */

const INIT_STATE: AddExpenseFormState = {
  name: "",
  paid: "",
};

/* -------------------------------- Component ------------------------------- */

// TODO Add validation - Use React Hook Form & Zod (https://ui.shadcn.com/docs/components/form)

export default function AddExpenseForm() {
  const participants = useParticipantStore();
  const addTransaction = useTransactionStore((state) => state.addTransaction);

  const [state, setState] = useState(INIT_STATE);

  // Submit form and reset state
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const rgx = new RegExp("^-?\\d*(\\.\\d+)?$"); // Only integers and floats (comma is falsy)
    if (!rgx.test(state.paid) || parseFloat(state.paid) <= 0) return;
    addTransaction({
      name: state.name,
      paid: parseFloat(state.paid),
      id: randString(),
    });

    setState(INIT_STATE);
  }

  const disableSubmit = Object.values(state).some((value) => !value);

  return (
    <motion.form layout onSubmit={handleSubmit} className="mt-4">
      <Card>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-4">
            <ParticipantSelect
              options={participants}
              value={state.name}
              onChange={(newValue) =>
                setState((prev) => ({
                  ...prev,
                  name: newValue,
                }))
              }
            />

            <AmountInput
              value={state.paid}
              onChange={(newValue) =>
                setState((prev) => ({
                  ...prev,
                  paid: newValue,
                }))
              }
            />
          </div>
        </CardContent>

        <CardFooter>
          <Button className="w-full" type="submit" disabled={disableSubmit}>
            Add Expense
          </Button>
        </CardFooter>
      </Card>
    </motion.form>
  );
}
