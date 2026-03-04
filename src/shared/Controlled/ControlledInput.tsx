import React from 'react';
import { type Control, type FieldValues, type Path, useController } from 'react-hook-form';
import Field from '../Field/Field';

interface ControlledInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  rules?: object;
  type?: string;
  placeholder?: string;
}

export function ControlledInput<T extends FieldValues>({
  name,
  control,
  label,
  rules,
  type = 'text',
  placeholder,
}: ControlledInputProps<T>): React.JSX.Element {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control, rules });

  return (
    <Field label={label} error={error?.message}>
      <input {...field} type={type} placeholder={placeholder} className={error ? 'invalid' : ''} />
    </Field>
  );
}
