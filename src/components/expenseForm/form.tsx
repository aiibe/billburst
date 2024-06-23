import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { ParticipantSelect } from "./participantSelect";
import { AmountInput } from "./amountInput";
import { DescriptionInput } from "./descriptionInput";
import { Form, FormField, FormMessage } from "../ui/form";

import { useTransactionStore } from "@/store/transactions";

import { randString } from "@/app/utils";

/* -------------------------------- Constants ------------------------------- */

const expenseFormSchema = z.object({
  name: z.string().min(2).max(8),
  paid: z.preprocess(
    (s) => parseFloat(z.string().parse(s).replace(",", ".")),
    z.number().min(0).max(1000000)
  ),
  description: z.string().max(100).optional(),
});

const INIT_STATE = {
  name: "",
  paid: 0,
  description: "",
};

/* -------------------------------- Component ------------------------------- */

type AddExpenseFormState = z.infer<typeof expenseFormSchema>;

interface Props {
  onAfterSubmit?: () => void;
}

export default function AddExpenseForm(props: Props) {
  const { onAfterSubmit } = props;

  const addTransaction = useTransactionStore((state) => state.addTransaction);

  const form = useForm<AddExpenseFormState>({
    resolver: zodResolver(expenseFormSchema),
    defaultValues: INIT_STATE,
  });

  // Submit form
  const onSubmit = (values: AddExpenseFormState) => {
    addTransaction({
      ...values,
      id: randString(),
    });

    onAfterSubmit?.();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-2 md:gap-4 md:grid-cols-2 ">
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <div className="flex flex-col gap-2">
                <ParticipantSelect
                  value={field.value}
                  onChange={field.onChange}
                />
                <FormMessage />
              </div>
            )}
          />

          <FormField
            name="paid"
            control={form.control}
            render={({ field }) => (
              <div className="flex flex-col gap-2">
                <AmountInput value={field.value} onChange={field.onChange} />
                <FormMessage />
              </div>
            )}
          />

          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <div className="md:col-span-2">
                <DescriptionInput
                  value={field.value}
                  onChange={field.onChange}
                />
                <FormMessage />
              </div>
            )}
          />
        </div>

        <Button className="w-full mt-6" type="submit">
          Add Expense
        </Button>
      </form>
    </Form>
  );
}
