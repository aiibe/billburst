import { AutoComplete } from "../ui/autocomplete";

import { capitalize } from "@/lib/utils";

interface Props {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const ParticipantSelect = (props: Props) => {
  const { options, value, onChange, disabled } = props;

  const opts = options.map((option) => ({
    value: option,
    label: capitalize(option),
  }));

  let val = opts.find((option) => option.value === value);
  if (!val) val = { value, label: capitalize(value) };

  return (
    <AutoComplete
      options={opts}
      placeholder="Find or create new"
      onSelect={(option) => onChange(option.label)}
      selected={val}
      disabled={disabled}
    />
  );
};
