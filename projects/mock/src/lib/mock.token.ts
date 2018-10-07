import { InjectionToken } from '@angular/core';
import { WpPost, WpUser } from '@ngx-wordpress/core';

export interface WpMockConfig {
  delay?: number;
  postsData?: WpPost[];
  usersData?: WpUser[];
  usersAuthData?: {username: string, password: string}[];
}

export const MOCK_CONFIG = new InjectionToken<WpMockConfig>('CONFIG');
