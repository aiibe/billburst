import { Fragment } from "react";

import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface Props {
  value: string;
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
        onChange={(event) => onChange(event.target.value)}
        type="text"
        inputMode="decimal"
        placeholder="33.1"
        value={value}
        className="h-10 focus-visible:ring-0"
      />
    </Fragment>
  );
};
