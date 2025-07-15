"use client";
import React, { useEffect, useState } from "react";

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
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // const [selectedId, setSelectedId] = useState<number | null>(() => {
  //   const stored = localStorage.getItem(label);
  //   return stored !== null ? Number(stored) : null;
  // });

  // useEffect(() => {
  //   const stored = localStorage.getItem(label);
  //   if (stored !== null) {
  //     const num = Number(stored);
  //     setSelectedId(Number.isNaN(num) ? null : num);
  //   }
  // }, [label]);

  useEffect(() => {
    // Set initial values on mount
    // setSelectedId(localStorage.getItem(label));
    setSelectedId(Number(localStorage.getItem(label)));

    // Function to update from localStorage
    const updateFromLocalStorage = () => {
      setSelectedId(Number(localStorage.getItem(label)));
    };

    window.addEventListener("storage", updateFromLocalStorage);

    const interval = setInterval(updateFromLocalStorage, 500);

    return () => {
      window.removeEventListener("storage", updateFromLocalStorage);
      clearInterval(interval);
    };
  }, [label]);

  // setSelectedId();
  // const selectedOption =
  //   options.find((option) => option.id === selectedId) ?? null;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value ? parseInt(e.target.value) : null;
    setSelectedId(id);
    // if (onSelect) {
    //   const selected = options.find((option) => option.id === id) ?? null;
    //   onSelect(selected);
    // }

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
