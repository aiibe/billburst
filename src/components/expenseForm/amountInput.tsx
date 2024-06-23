import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const AmountInput = (props: Props) => {
  const { value, onChange } = props;

  return (
    <div className="grid gap-2">
      <Label htmlFor="paid">Amount</Label>
      <Input
        id="paid"
        autoComplete="off"
        required={true}
        onChange={(event) => onChange(event.target.value)}
        type="text"
        placeholder="$33.1"
        value={value}
        className="text-right h-10 focus-visible:ring-0"
      />
    </div>
  );
};
