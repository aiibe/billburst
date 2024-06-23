import { useState } from "react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { ParticipantSelect } from "./participantSelect";
import { AmountInput } from "./amountInput";
import { DescriptionInput } from "./descriptionInput";

import { useTransactionStore } from "@/store/transactions";

import { randString } from "@/app/utils";

type AddExpenseFormState = {
  name: string;
  paid: string;
  description: string;
};

/* -------------------------------- Constants ------------------------------- */

const INIT_STATE: AddExpenseFormState = {
  name: "",
  paid: "",
  description: "",
};

/* -------------------------------- Component ------------------------------- */

// TODO Add validation - Use React Hook Form & Zod (https://ui.shadcn.com/docs/components/form)

interface Props {
  onAfterSubmit?: () => void;
}

export default function AddExpenseForm(props: Props) {
  const { onAfterSubmit } = props;

  const addTransaction = useTransactionStore((state) => state.addTransaction);

  const [state, setState] = useState(INIT_STATE);

  // Submit form and reset state
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const rgx = new RegExp("^-?\\d*(\\.\\d+)?$"); // Only integers and floats (comma is falsy)
    if (!rgx.test(state.paid) || parseFloat(state.paid) <= 0) return;
    addTransaction({
      id: randString(),
      name: state.name,
      paid: parseFloat(state.paid),
      description: state.description,
    });

    setState(INIT_STATE);

    onAfterSubmit?.();
  }

  const disableSubmit = Object.values([state.name, state.paid]).some(
    (value) => !value
  );

  return (
    <motion.form layout onSubmit={handleSubmit}>
      <div className="grid gap-2 md:gap-4 md:grid-cols-2 ">
        <ParticipantSelect
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

        <DescriptionInput
          value={state.description}
          onChange={(newValue) =>
            setState((prev) => ({
              ...prev,
              description: newValue,
            }))
          }
        />
      </div>

      <Button className="w-full mt-6" type="submit" disabled={disableSubmit}>
        Add Expense
      </Button>
    </motion.form>
  );
}
