import { getProfile, saveProfile } from '@api/profile.api';
import type { UserData } from '@data/userDefaults';
import { SYSTEM_ERROR } from '@shared/Constants/constants';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockMaybeSingle = vi.fn();
const mockEq = vi.fn(() => ({ maybeSingle: mockMaybeSingle }));
const mockSelect = vi.fn(() => ({ eq: mockEq }));

const mockSingle = vi.fn();
const mockUpsertSelect = vi.fn(() => ({ single: mockSingle }));
const mockUpsert = vi.fn(() => ({ select: mockUpsertSelect }));

vi.mock('@src/lib/supabase', () => ({
  supabase: {
    from: (): unknown => ({ select: mockSelect, upsert: mockUpsert }),
  },
}));

const FAKE_DB_ROW = {
  id: 'row_123',
  user_id: 'usr_123',
  first_name: 'John',
  last_name: 'Doe',
  email: 'john@test.com',
  company: 'TestCorp',
  phone: '+123',
  site: 'https://test.com',
  country: 'US',
  language: 'en',
  timezone: 'America/New_York',
  created_at: '2025-01-01',
  updated_at: '2025-01-01',
};

const EXPECTED_MAPPED: UserData = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@test.com',
  company: 'TestCorp',
  phone: '+123',
  site: 'https://test.com',
  country: 'US',
  language: 'en',
  timezone: 'America/New_York',
};

beforeEach(() => {
  vi.clearAllMocks();
  vi.spyOn(console, 'warn').mockImplementation(() => {});
});

describe('getProfile', () => {
  it('returns profile with snake_case → camelCase mapping', async () => {
    mockMaybeSingle.mockResolvedValue({ data: FAKE_DB_ROW, error: null });

    const result = await getProfile('usr_123');

    expect(result.data).toEqual(EXPECTED_MAPPED);
    expect(result.error).toBeNull();
  });

  it('returns null data when profile does not exist', async () => {
    mockMaybeSingle.mockResolvedValue({ data: null, error: null });
    const result = await getProfile('usr_new');
    expect(result.data).toBeNull();
    expect(result.error).toBeNull();
  });

  it('maps null phone and site to empty strings', async () => {
    mockMaybeSingle.mockResolvedValue({
      data: { ...FAKE_DB_ROW, phone: null, site: null },
      error: null,
    });
    const result = await getProfile('usr_123');
    expect(result.data?.phone).toBe('');
    expect(result.data?.site).toBe('');
  });

  it('returns SYSTEM_ERROR on unexpected exception', async () => {
    mockMaybeSingle.mockRejectedValue(new Error('Connection lost'));
    const result = await getProfile('usr_123');
    expect(result.error).toBe(SYSTEM_ERROR);
  });
});

describe('saveProfile', () => {
  it('saves profile and returns updated data', async () => {
    mockSingle.mockResolvedValue({ data: FAKE_DB_ROW, error: null });

    const result = await saveProfile('usr_123', EXPECTED_MAPPED);

    expect(result.data).toEqual(EXPECTED_MAPPED);
    expect(result.error).toBeNull();
  });

  it('converts empty phone and site to null for DB', async () => {
    mockSingle.mockResolvedValue({ data: FAKE_DB_ROW, error: null });

    await saveProfile('usr_123', { ...EXPECTED_MAPPED, phone: '', site: '' });

    expect(mockUpsert).toHaveBeenCalledWith(expect.objectContaining({ phone: null, site: null }), expect.anything());
  });
});
