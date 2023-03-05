import { Combobox, Transition } from "@headlessui/react";
import { useFormikContext } from "formik";
import { Fragment, useState } from "react";
import { FormInputProps } from "./FormTextInput";

type FormAutocompleteProps<T extends { id: string; name: string }> = {
  data: T[];
} & FormInputProps;

const FormAutocomplete = <T extends { id: string; name: string }>({
  name,
  label,
  data,
}: FormAutocompleteProps<T>) => {
  const { getFieldProps, setFieldValue } = useFormikContext();

  const [query, setQuery] = useState("");

  const filteredPeople =
    query === ""
      ? data
      : data.filter((item) =>
          item.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className="my-4">
      <Combobox
        value={getFieldProps(name).value as T}
        onChange={(data) => setFieldValue(name, data)}
      >
        <Combobox.Label className="mr-3">{label}</Combobox.Label>
        <Combobox.Input
          className="w-full rounded py-2 pr-2 pl-2 text-sm text-black placeholder-gray-400 focus:border-indigo-400 focus:outline-none sm:text-base"
          onChange={({ target }) => setQuery(target.value)}
          displayValue={(item: T) => item.name}
        />
        <Combobox.Button className="inset-y-0 right-0 flex items-center pr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </Combobox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
        >
          <Combobox.Options className="mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base text-black shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredPeople.length === 0 ? (
              <Combobox.Option value={{ name: query }}>
                Създай "{query}"
              </Combobox.Option>
            ) : (
              filteredPeople.map((person) => (
                <Combobox.Option
                  key={person.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-teal-600 text-white" : "text-gray-900"
                    }`
                  }
                  value={person}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {person.name}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? "text-white" : "text-teal-600"
                          }`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="h-5 w-5"
                            aria-hidden="true"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M4.5 12.75l6 6 9-13.5"
                            />
                          </svg>
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </Combobox>
    </div>
  );
};

export default FormAutocomplete;
