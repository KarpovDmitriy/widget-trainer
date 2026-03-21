import React from 'react';
import type { ParseKeys, TOptions } from 'i18next';
import { type Control, type FieldValues, type Path, useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Field from '../Field/Field';

interface ControlledInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  rules?: object;
  type?: string;
  placeholder?: string;
  extra?: React.ReactNode;
  translateKeys?: TOptions;
}

export function ControlledInput<T extends FieldValues>({
  name,
  control,
  label,
  rules,
  type = 'text',
  placeholder,
  translateKeys,
  extra,
}: ControlledInputProps<T>): React.JSX.Element {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control, rules });
  const { t } = useTranslation();
  const keysForTranslations = {
    label,
    ...(translateKeys ?? {}),
  } as Omit<TOptions, 'context'> & { context?: string };

  const errorMessage = error?.message ? t(error.message as ParseKeys, keysForTranslations) : undefined;

  return (
    <Field label={label} error={errorMessage} extra={extra}>
      <input {...field} type={type} placeholder={placeholder} className={error ? 'invalid' : ''} />
    </Field>
  );
}
