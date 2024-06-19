/**
 * Credits :
 * https://armand-salle.fr/post/autocomplete-select-shadcn-ui/
 * https://github.com/armandsalle/my-site/blob/main/src/react/autocomplete.tsx
 */

import React, {
  useState,
  useRef,
  useCallback,
  type KeyboardEvent,
} from "react";
import { Command as CommandPrimitive } from "cmdk";
import { CheckIcon } from "@radix-ui/react-icons";

import {
  CommandGroup,
  CommandItem,
  CommandList,
  CommandInput,
} from "./command";

import { capitalize, cn } from "@/lib/utils";

export type Option = Record<"value" | "label", string> & Record<string, string>;

type Props = {
  options: Option[];
  selected?: Option;
  onSelect?: (value: Option) => void;
  disabled?: boolean;
  placeholder?: string;
};

export const AutoComplete = (props: Props) => {
  const { options, selected, onSelect } = props;
  const { placeholder, disabled } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const [isOpen, setOpen] = useState(false);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (!input) return;

      // Keep the options displayed when the user is typing
      if (!isOpen) setOpen(true);

      // This is not a default behaviour of the <input /> field
      if (event.key === "Enter" && input.value.length) {
        const optionToSelect = options.find(
          (option) => option.label === input.value
        );

        if (optionToSelect) {
          onSelect?.(optionToSelect);
        } else {
          input.blur();
        }
      }

      if (event.key === "Escape") input.blur();
    },
    [isOpen, options, onSelect]
  );

  const handleSelectOption = useCallback(
    (selectedOption: Option) => {
      onSelect?.(selectedOption);

      // This is a hack to prevent the input from being focused after the user selects an option
      // We can call this hack: "The next tick"
      setTimeout(() => {
        inputRef?.current?.blur();
      }, 0);
    },
    [onSelect]
  );

  return (
    <CommandPrimitive onKeyDown={handleKeyDown}>
      <CommandInput
        ref={inputRef}
        value={selected?.label || ""}
        onValueChange={(newValue) =>
          onSelect?.({ value: newValue, label: capitalize(newValue) })
        }
        onBlur={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        placeholder={placeholder}
        disabled={disabled}
        onClear={() => onSelect?.({ value: "", label: "" })}
      />

      <div className="relative mt-1">
        <div
          className={cn(
            "animate-in fade-in-0 zoom-in-95 absolute top-0 z-10 w-full rounded-md bg-popover text-popover-foreground",
            isOpen ? "border block" : "hidden"
          )}
        >
          <CommandList className="outline-none">
            {options.length > 0 && (
              <CommandGroup>
                {options.map((option) => {
                  const isSelected = selected?.value === option.value;
                  return (
                    <CommandItem
                      key={option.value}
                      value={option.label}
                      onMouseDown={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                      }}
                      onSelect={() => handleSelectOption(option)}
                      className={cn(
                        "flex w-full items-center gap-2",
                        !isSelected ? "pl-8" : null
                      )}
                    >
                      {isSelected ? <CheckIcon className="w-4" /> : null}
                      {option.label}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            )}

            <CommandPrimitive.Empty className="select-none rounded-sm px-2 py-3 text-center text-sm text-muted-foreground">
              {selected?.value.length
                ? `Hit Enter to add "${selected?.label}"`
                : "Type a name and hit Enter"}
            </CommandPrimitive.Empty>
          </CommandList>
        </div>
      </div>
    </CommandPrimitive>
  );
};
