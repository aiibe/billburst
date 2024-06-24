import { Fragment } from "react";

import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface Props {
  value: number;
  onChange: (value: string) => void;
}

export const AmountInput = (props: Props) => {
  const { value, onChange } = props;

  return (
    <Fragment>
      <Label htmlFor="paid">Amount *</Label>
      <Input
        id="paid"
        autoComplete="off"
        required={true}
        onChange={(event) => onChange(event.target.value)}
        type="number"
        placeholder="33.1"
        value={value}
        className="text-right h-10 focus-visible:ring-0"
      />
    </Fragment>
  );
};
