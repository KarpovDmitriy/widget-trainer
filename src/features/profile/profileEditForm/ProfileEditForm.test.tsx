/**
 * @jest-environment jsdom
 */
import React from 'react';
import { type UserData } from '@data/userDefaults';
import { type RenderResult, act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { type Mock, beforeEach, describe, expect, it, vi } from 'vitest';
import ProfileEditForm from './ProfileEditForm';

const MOCK_USER = {
  firstName: 'Max',
  lastName: 'Mustermann',
  company: 'Keenthemes',
  email: 'max@example.com',
  site: 'https://keenthemes.com',
  phone: '+998901234567',
  country: 'UZ',
  language: 'en',
  timezone: 'Asia/Tashkent',
} as UserData;

interface MockReactSelectProps {
  options: Array<{ value: string; label: string }>;
  value: { value: string; label: string } | null;
  onChange: (val: { value: string; label: string }) => void;
  name: string;
}

vi.mock('react-i18next', () => ({
  useTranslation: (): { t: (k: string) => string } => ({
    t: (str: string): string => str,
  }),
}));

vi.mock('@utils/useSelectOptions', () => ({
  useSelectOptions: (): Record<string, Array<{ value: string; label: string }>> => ({
    countryOptions: [{ value: 'UZ', label: 'Uzbekistan' }],
    languageOptions: [{ value: 'en', label: 'English' }],
    timezoneOptions: [{ value: 'Asia/Tashkent', label: 'Tashkent' }],
  }),
}));

vi.mock('react-select', () => ({
  default: ({ options, value, onChange, name }: MockReactSelectProps): React.JSX.Element => (
    <select
      data-testid={name}
      value={value?.value || ''}
      onChange={(e: React.ChangeEvent<HTMLSelectElement>): void =>
        onChange({ value: e.target.value, label: e.target.value })
      }
    >
      {options.map(
        (opt: { value: string; label: string }): React.JSX.Element => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ),
      )}
    </select>
  ),
}));

describe('ProfileEditForm Integration Test', (): void => {
  const mockOnSubmit: Mock = vi.fn();
  const mockOnCancel: Mock = vi.fn();

  beforeEach((): void => {
    vi.clearAllMocks();
  });

  const renderForm = (data: UserData = MOCK_USER): RenderResult =>
    render(<ProfileEditForm initialValues={data} onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

  const getFirstNameInput = (): HTMLInputElement => screen.getByDisplayValue(MOCK_USER.firstName) as HTMLInputElement;

  it('1. Отображает начальные данные', (): void => {
    renderForm();
    expect(getFirstNameInput()).toBeInTheDocument();
  });

  it('2. Позволяет изменить значение в поле имени', async (): Promise<void> => {
    renderForm();
    const input: HTMLInputElement = getFirstNameInput();
    await act(async (): Promise<void> => {
      fireEvent.change(input, { target: { value: 'Maryna' } });
    });
    expect(input.value).toBe('Maryna');
  });

  it('3. Вызывает onSubmit при нажатии Save', async (): Promise<void> => {
    renderForm();
    const input: HTMLInputElement = getFirstNameInput();

    await act(async (): Promise<void> => {
      fireEvent.change(input, { target: { value: 'NewName' } });
      fireEvent.blur(input);
    });

    const saveBtn: HTMLElement = screen.getByRole('button', { name: 'profile.form.buttons.save' });

    await waitFor((): void => {
      expect(saveBtn).toBeEnabled();
    });

    await act(async (): Promise<void> => {
      fireEvent.click(saveBtn);
    });

    await waitFor((): void => {
      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });

  it('4. Сбрасывает форму при нажатии Cancel', async (): Promise<void> => {
    renderForm();
    const input: HTMLInputElement = getFirstNameInput();

    await act(async (): Promise<void> => {
      fireEvent.change(input, { target: { value: 'Changed' } });
    });

    const cancelBtn: HTMLElement = screen.getByRole('button', { name: 'profile.form.buttons.cancel' });
    await act(async (): Promise<void> => {
      fireEvent.click(cancelBtn);
    });

    await waitFor((): void => {
      expect(input.value).toBe(MOCK_USER.firstName);
    });
  });

  it('5. Кнопка Save заблокирована при пустом поле', async (): Promise<void> => {
    renderForm();
    const input: HTMLInputElement = getFirstNameInput();

    await act(async (): Promise<void> => {
      fireEvent.change(input, { target: { value: '' } });
      fireEvent.blur(input);
    });

    const saveBtn: HTMLElement = screen.getByRole('button', { name: 'profile.form.buttons.save' });
    await waitFor((): void => {
      expect(saveBtn).toBeDisabled();
    });
  });
});
