import { useState } from "react";
import { motion } from "framer-motion";

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
    <motion.form layout onSubmit={handleSubmit} className="mb-8">
      <div className="flex mb-2">
        <div className="w-1/2 mr-2 mb-3">
          <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
            Name
            <span className="font-normal normal-case text-xs text-gray-400 ml-2">
              {MAX_LEN} characters max.
            </span>
          </label>
          <input
            maxLength={MAX_LEN}
            required={true}
            onChange={(event) =>
              setState((prev) => ({
                ...prev,
                name: event.target.value.trim(),
              }))
            }
            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-2 px-2 focus:outline-none focus:ring focus:border-blue-300 shadow-none"
            type="text"
            placeholder="Jane"
            value={state.name}
          />
        </div>
        <div className="w-1/2 ml-2">
          <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
            Amount
          </label>
          <input
            required={true}
            onChange={(event) =>
              setState((prev) => ({
                ...prev,
                paid: event.target.value,
              }))
            }
            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-2 px-2 focus:outline-none focus:ring focus:border-blue-300 shadow-none"
            type="text"
            placeholder="33.1"
            value={state.paid}
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
      >
        Add Expense
      </button>
    </motion.form>
  );
}
