/**
 * @jest-environment jsdom
 */
import { INITIAL_USER_DATA } from '@data/userDefaults';
import { type RenderResult, fireEvent, render, screen } from '@testing-library/react';
import { type Mock, beforeEach, describe, expect, it, vi } from 'vitest';
import ProfileEditForm from './ProfileEditForm';

interface ReactSelectProps {
  options: Array<{ value: string; label: string }>;
  value: { value: string; label: string } | null;
  onChange: (val: { value: string; label: string }) => void;
  name: string;
}

vi.mock('react-select', () => ({
  default: ({ options, value, onChange, name }: ReactSelectProps): React.ReactElement => (
    <select
      data-testid={name}
      value={value?.value || ''}
      onChange={(e: React.ChangeEvent<HTMLSelectElement>): void =>
        onChange({ value: e.target.value, label: e.target.value })
      }
    >
      {options.map(
        (opt: { value: string; label: string }): React.ReactElement => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ),
      )}
    </select>
  ),
}));

vi.mock('@data/selectOptions', () => ({
  countryOptions: [{ value: 'UZ', label: 'Uzbekistan' }],
  languageOptions: [{ value: 'en', label: 'English' }],
  timezoneOptions: [{ value: 'Asia/Tashkent', label: 'Tashkent' }],
}));

describe('ProfileEditForm Integration Test', (): void => {
  const mockOnSubmit: Mock = vi.fn();
  const mockOnCancel: Mock = vi.fn();

  beforeEach((): void => {
    vi.clearAllMocks();
  });

  const renderForm = (): RenderResult =>
    render(<ProfileEditForm initialValues={INITIAL_USER_DATA} onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

  it('1. Отображает начальные данные (Max) из INITIAL_USER_DATA', (): void => {
    renderForm();
    expect(screen.getByDisplayValue(INITIAL_USER_DATA.firstName)).toBeInTheDocument();
  });

  it('2. Отображает название компании (Keenthemes)', (): void => {
    renderForm();
    expect(screen.getByDisplayValue(INITIAL_USER_DATA.company)).toBeInTheDocument();
  });

  it('3. Находит кнопку Save через роль и текст', (): void => {
    renderForm();
    const saveBtn: HTMLElement = screen.getByRole('button', { name: /save/i });
    expect(saveBtn).toBeInTheDocument();
    expect(saveBtn).toHaveAttribute('type', 'submit');
  });

  it('4. Позволяет изменить значение в поле имени', (): void => {
    renderForm();
    const input = screen.getByDisplayValue(INITIAL_USER_DATA.firstName) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Maryna' } });
    expect(input.value).toBe('Maryna');
  });

  it('5. Рендерит кнопку Cancel и она активна', (): void => {
    renderForm();
    const cancelBtn: HTMLElement = screen.getByRole('button', { name: /cancel/i });
    expect(cancelBtn).toBeEnabled();
  });
});
