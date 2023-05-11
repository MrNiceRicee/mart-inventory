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

// i'm not TOO familar with formik, but this should either get you close to your solution or at least help out :)
const FormAutocomplete = <T extends { id: string; name: string }>({
  data,
  name,
  placeholder = "",
}: FormAutocompleteProps<T>) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(""); // for what the user is typing
  const { getFieldProps, setFieldValue } = useFormikContext<T>();
  const selected: T = getFieldProps(name).value;

  const filteredData = data.filter((item) =>
    // use what the user has typed to just client side filter
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="my-4">
      <Command>
        <CommandInput
          placeholder={placeholder}
          onFocusCapture={() => {
            // open the dropdown when the input is focused
            setOpen(true);
          }}
          value={query}
          onChangeCapture={(e) => {
            setQuery(e.currentTarget.value);
          }}
          // close input if user tabs out
          onBlurCapture={() => {
            setOpen(false);
          }}
        />
        <CommandList>
          {open &&
            filteredData.map((element) => (
              <CommandItem
                key={element.id}
                value={element.id}
                onSelect={(currentValue) => {
                  // currentValue will be the value of the selected item (element.id)
                  setFieldValue(name, currentValue);
                  // set the query to update (because the query is also the display value)
                  setQuery(element.name);
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
