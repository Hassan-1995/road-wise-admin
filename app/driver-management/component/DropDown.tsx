"use client";
import React from "react";
import useLocalStorageState from "use-local-storage-state";

type OptionType<T> = {
  id: number;
  value: string;
  data?: T; // For optional attaching of extra data if needed
};

type DropDownProps<T> = {
  label?: string;
  options: OptionType<T>[];
  onSelect?: (selected: OptionType<T> | null) => void;
};

const DropDown = <T,>({
  label = "Select an option:",
  options,
}: // onSelect,
DropDownProps<T>) => {
  const [selectedId, setSelectedId] = useLocalStorageState<number | null>(
    label,
    {
      defaultValue: null,
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value ? parseInt(e.target.value) : null;
    setSelectedId(id);

    localStorage.setItem(label, parseInt(e.target.value, 10).toString());
  };

  return (
    <div className=" max-w-sm">
      <label className="block mb-2 text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        value={selectedId ?? ""}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-900"
      >
        <option value="">-- Choose an option --</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.value}
          </option>
        ))}
      </select>

      {/* {selectedOption && (
        <p className="mt-3 text-green-700 font-medium">
          You selected: {selectedOption.value} (ID: {selectedOption.id})
        </p>
      )} */}
    </div>
  );
};

export default DropDown;
