import { processPostgrestError } from '@api/helpers';
import type { UserData } from '@data/userDefaults';
import { SYSTEM_ERROR } from '@shared/Constants/constants';
import type { PostgrestSingleResponse } from '@supabase/supabase-js';
import { i18CheckPath } from '@utils/zod-i18.typecheck';
import { useLoaderStore } from '@s/loader.store';
import { useToastStore } from '@s/toast.store';
import { supabase } from '@src/lib/supabase';

interface UserProfileRow {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  company: string;
  phone: string | null;
  site: string | null;
  country: string;
  language: string;
  timezone: string;
  created_at: string;
  updated_at: string;
}

const mapRowToUserData = (row: UserProfileRow): UserData => ({
  firstName: row.first_name,
  lastName: row.last_name,
  email: row.email,
  company: row.company,
  phone: row.phone ?? '',
  site: row.site ?? '',
  country: row.country,
  language: row.language,
  timezone: row.timezone,
});

const mapUserDataToRow = (data: UserData): Omit<UserProfileRow, 'id' | 'user_id' | 'created_at' | 'updated_at'> => ({
  first_name: data.firstName,
  last_name: data.lastName,
  email: data.email,
  company: data.company,
  phone: data.phone || null,
  site: data.site || null,
  country: data.country,
  language: data.language,
  timezone: data.timezone,
});

export interface ProfileResponse {
  data: UserData | null;
  error: string | null;
}

const handleProfileRequest = async <T extends UserProfileRow>(
  request: () => PromiseLike<PostgrestSingleResponse<T>>,
): Promise<ProfileResponse> => {
  try {
    useLoaderStore.getState().setLoading({ isProfileLoading: true });
    const { data, error, status } = await request();

    if (error) {
      return { data: null, error: processPostgrestError(error, status) };
    }

    return { data: data ? mapRowToUserData(data) : null, error: null };
  } catch {
    const systemMsg = i18CheckPath('common.errors.system');
    useToastStore.getState().addToast(systemMsg, 'error');
    return { data: null, error: SYSTEM_ERROR };
  } finally {
    useLoaderStore.getState().setLoading({ isProfileLoading: false });
  }
};

export const getProfile = async (userId: string): Promise<ProfileResponse> => {
  return handleProfileRequest(() => supabase.from('user_profiles').select('*').eq('user_id', userId).maybeSingle());
};

export const saveProfile = async (user_id: string, profileData: UserData): Promise<ProfileResponse> => {
  const row = mapUserDataToRow(profileData);
  return handleProfileRequest(() =>
    supabase
      .from('user_profiles')
      .upsert({ user_id, ...row, updated_at: new Date().toISOString() }, { onConflict: 'user_id' })
      .select()
      .single(),
  );
};
