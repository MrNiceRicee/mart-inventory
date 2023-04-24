import { useState } from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandList,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

import { FormInputProps } from "./FormTextInput";
import { useFormikContext } from "formik";

type FormAutocompleteProps<T extends { id: string; name: string }> = {
  data: T[];
} & FormInputProps;

const FormAutocomplete = <T extends { id: string; name: string }>({
  data,
  name,
  placeholder = "",
}: FormAutocompleteProps<T>) => {
  const [open, setOpen] = useState(false);
  const { getFieldProps, setFieldValue } = useFormikContext<T>();
  const selected: T = getFieldProps(name).value;

  return (
    <div className="my-4">
      <Command>
        <CommandInput
          placeholder={placeholder}
          value={selected?.name}
          onValueChange={() => {
            setOpen(true);
          }}
        />
        <CommandList>
          {open &&
            data.map((element) => (
              <CommandItem
                key={element.id}
                onSelect={(currentValue) => {
                  const selected = data.find(
                    (category) => category.name.toLowerCase() === currentValue
                  );
                  setFieldValue(name, selected);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selected?.id === element.id ? "opacity-100" : "opacity-0"
                  )}
                />
                {element.name}
              </CommandItem>
            ))}
        </CommandList>
      </Command>
    </div>
  );
};

export default FormAutocomplete;
