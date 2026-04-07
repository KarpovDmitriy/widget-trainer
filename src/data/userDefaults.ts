export const INITIAL_USER_DATA: UserData = {
  firstName: '-',
  lastName: '-',
  email: '-',
  company: '-',
  phone: '-',
  site: '-',
  country: 'UZ',
  language: 'en',
  timezone: 'Asia/Tashkent',
};

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone?: string;
  site?: string;
  country: string;
  language: string;
  timezone: string;
}
