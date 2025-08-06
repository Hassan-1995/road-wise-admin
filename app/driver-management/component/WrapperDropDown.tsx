"use client";
import React, { useEffect, useState } from "react";
import DropDown from "./DropDown";

type OptionType<T> = {
  id: number;
  value: string;
  data?: T;
};

type WrapperDropDownProps<T> = {
  label: string;
  fetchData: () => Promise<T[]>;
  mapToOption: (item: T) => OptionType<T>;
  filter?: (item: T) => boolean;
};

const WrapperDropDown = <T,>({
  label,
  fetchData,
  mapToOption,
  filter,
}: WrapperDropDownProps<T>) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await fetchData();
        setData(filter ? result.filter(filter) : result);
        setError(null);
      } catch (err) {
        console.error(`Error fetching data for ${label}:`, err);
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [fetchData, filter, label]);

  const formattedOptions = data.map(mapToOption);

  if (loading) return <p className="p-4 text-gray-600">Loading...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;

  return <DropDown label={label} options={formattedOptions} />;
};

export default WrapperDropDown;
