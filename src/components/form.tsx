import { useState } from "react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "./ui/card";

export type FormState = {
  name: string;
  paid: string;
};

type Props = { onSubmit: (state: FormState) => void };

/* -------------------------------- Constants ------------------------------- */

const MAX_LEN = 8;
const INIT_STATE: FormState = {
  name: "",
  paid: "",
};

/* -------------------------------- Component ------------------------------- */

// TODO Add validation - Use React Hook Form & Zod (https://ui.shadcn.com/docs/components/form)

export default function Form(props: Props) {
  const { onSubmit } = props;

  const [state, setState] = useState(INIT_STATE);

  // Submit form and reset state
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit(state);
    setState(INIT_STATE);
  }

  return (
    <motion.form layout onSubmit={handleSubmit} className="mt-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex">
            <div className="w-1/2 mr-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                maxLength={MAX_LEN}
                required={true}
                onChange={(event) =>
                  setState((prev) => ({
                    ...prev,
                    name: event.target.value.trim(),
                  }))
                }
                type="text"
                placeholder="Jane"
                value={state.name}
              />
            </div>

            <div className="w-1/2 ml-2">
              <Label htmlFor="paid">Amount</Label>
              <Input
                id="paid"
                required={true}
                onChange={(event) =>
                  setState((prev) => ({
                    ...prev,
                    paid: event.target.value,
                  }))
                }
                type="text"
                placeholder="33.1"
                value={state.paid}
              />
            </div>
          </div>
        </CardContent>

        <CardFooter>
          <Button className="w-full" type="submit">
            Add Expense
          </Button>
        </CardFooter>
      </Card>
    </motion.form>
  );
}
