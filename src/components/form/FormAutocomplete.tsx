import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
  const [open, setOpen] = React.useState(false);
  const { getFieldProps, setFieldValue } = useFormikContext<T>();
  const selected: T = getFieldProps(name).value;

  return (
    <div className="my-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {selected?.name
              ? data.find((element) => element.id === selected.id)?.name
              : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder={placeholder} />
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {data.map((element) => (
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
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default FormAutocomplete;
