import { Fragment } from "react";

import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface Props {
  value?: string;
  onChange: (value: string) => void;
}

export const DescriptionInput = (props: Props) => {
  const { value, onChange } = props;

  return (
    <Fragment>
      <Label htmlFor="description">Description</Label>
      <Input
        id="description"
        autoComplete="off"
        onChange={(event) => onChange(event.target.value)}
        type="text"
        placeholder="House cleaning"
        value={value}
        className="h-10 focus-visible:ring-0"
      />
    </Fragment>
  );
};
