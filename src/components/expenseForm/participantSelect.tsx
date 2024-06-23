import { Fragment } from "react";
import { useParticipantStore } from "@/store/derived/participants";

import { AutoComplete } from "../ui/autocomplete";
import { Label } from "../ui/label";

import { capitalize } from "@/lib/utils";

interface Props {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const ParticipantSelect = (props: Props) => {
  const { value, onChange, disabled } = props;

  const participants = useParticipantStore();

  const opts = participants.map((option) => ({
    value: option,
    label: capitalize(option),
  }));

  let val = opts.find((option) => option.value === value);
  if (!val) val = { value, label: capitalize(value) };

  return (
    <Fragment>
      <Label htmlFor="participants">Participant *</Label>
      <AutoComplete
        id="participants"
        options={opts}
        placeholder="Find or add a name"
        onSelect={(option) => onChange(option.label)}
        selected={val}
        disabled={disabled}
      />
    </Fragment>
  );
};
