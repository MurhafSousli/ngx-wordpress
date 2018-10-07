import { InjectionToken } from '@angular/core';

export interface WpMockConfig {
  delay?: number;
  postsData?: any[];
  usersData?: any[];
  usersAuthData?: any[];
}

export const MOCK_CONFIG = new InjectionToken<WpMockConfig>('CONFIG');
