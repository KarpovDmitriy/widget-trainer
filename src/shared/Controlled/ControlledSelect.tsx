import React from 'react';
import { type Control, type FieldValues, type Path, useController } from 'react-hook-form';
import Select, { type SingleValue } from 'react-select';
import Field from '../Field/Field';

interface SelectOption {
  value: string;
  label: string;
}

interface ControlledSelectProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  options: SelectOption[];
  rules?: object;
}

export function ControlledSelect<T extends FieldValues>({
  name,
  control,
  label,
  options,
  rules,
}: ControlledSelectProps<T>): React.JSX.Element {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control, rules });

  const selectedValue = options.find((o) => o.value === field.value) || null;

  return (
    <Field label={label} error={error?.message}>
      <Select
        {...field}
        options={options}
        value={selectedValue}
        onChange={(val: SingleValue<SelectOption>) => field.onChange(val?.value)}
        classNamePrefix="custom-select"
      />
    </Field>
  );
}
