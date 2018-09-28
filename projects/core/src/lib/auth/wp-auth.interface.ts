import { WpUser } from '../interfaces';

export interface WpAuthState {
  loggedIn?: boolean;
  loading?: boolean;
  error?: Error;
  user?: WpUser;
}

export interface WpAuthToken {
  token?: string;
  user_email?: string;
  user_nicename?: string;
  user_display_name?: string;
}
