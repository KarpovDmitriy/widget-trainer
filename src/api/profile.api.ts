import type { UserData } from '@data/userDefaults';
import { supabase } from '@src/lib/supabase';
import { NetworkError, ProfileError } from './errors';

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

export const getProfile = async (userId: string): Promise<UserData | null> => {
  try {
    const { data, error } = await supabase.from('user_profiles').select('*').eq('user_id', userId).maybeSingle();

    if (error) {
      throw new ProfileError(error.message, error.code);
    }

    return data ? mapRowToUserData(data as UserProfileRow) : null;
  } catch (err) {
    if (err instanceof ProfileError) {
      throw err;
    }

    throw new NetworkError((err as Error).message);
  }
};

export const saveProfile = async (userId: string, profileData: UserData): Promise<UserData> => {
  try {
    const row = mapUserDataToRow(profileData);

    const { data, error } = await supabase
      .from('user_profiles')
      .upsert({ user_id: userId, ...row, updated_at: new Date().toISOString() }, { onConflict: 'user_id' })
      .select()
      .single();

    if (error) {
      throw new ProfileError(error.message, error.code);
    }

    return mapRowToUserData(data as UserProfileRow);
  } catch (err) {
    if (err instanceof ProfileError) {
      throw err;
    }

    throw new NetworkError((err as Error).message);
  }
};
