import { Input } from "../ui/input";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const AmountInput = (props: Props) => {
  const { value, onChange } = props;

  return (
    <Input
      id="paid"
      required={true}
      onChange={(event) => onChange(event.target.value)}
      type="text"
      placeholder="33.1"
      value={value}
      className="text-right h-10 focus-visible:ring-0"
    />
  );
};
