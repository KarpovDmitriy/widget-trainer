export const INITIAL_USER_DATA: UserData = {
  firstName: 'Max',
  lastName: 'Smith',
  email: 'max@smith.com',
  company: 'Keenthemes',
  phone: '+44453344555',
  site: 'keenthemes.com',
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
