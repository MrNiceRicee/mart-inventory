import { useEffect, useState } from "react";
import { useController } from "react-hook-form";
import {
  Autocomplete,
  BaseDataType,
  type AutocompleteComponentType,
} from "../Autocomplete";

type FormComboboxType<T> = {
  name: string;
} & AutocompleteComponentType<T>;

export const FormCombobox = <T,>({
  name,
  options,
  label,
  onChange,
}: FormComboboxType<T>) => {
  const { field, fieldState } = useController({ name });

  const [selectedItem, setSelectedItem] = useState<BaseDataType<T>>();

  useEffect(() => {
    const currentItem = options.find((option) => option.id === field.value);
    setSelectedItem(currentItem);
  }, [field.value]);
  return (
    <>
      <Autocomplete<T>
        options={options}
        selected={selectedItem}
        label={label}
        onChange={onChange ? onChange : field.onChange}
      />
      {fieldState.error?.message && <div>{fieldState.error.message}</div>}
    </>
  );
};

export default FormCombobox;
