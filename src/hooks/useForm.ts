import { useState } from 'react';
import type { ChangeEvent, Dispatch, SetStateAction } from 'react';
import type { SingleValue } from 'react-select';
import type { SelectOption } from '../data/selectOptions';

interface UseFormReturn<T> {
  formData: T;
  setFormData: Dispatch<SetStateAction<T>>;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: <K extends keyof T>(newValue: SingleValue<SelectOption>, name: K) => void;
  resetForm: () => void;
}

export function useForm<T>(initialState: T): UseFormReturn<T> {
  const [formData, setFormData] = useState<T>(initialState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = <K extends keyof T>(newValue: SingleValue<SelectOption>, name: K): void => {
    if (newValue) {
      setFormData((prev) => ({
        ...prev,
        [name]: newValue.value as unknown as T[K],
      }));
    }
  };

  const resetForm = (): void => setFormData(initialState);

  return {
    formData,
    setFormData,
    handleChange,
    handleSelectChange,
    resetForm,
  };
}
