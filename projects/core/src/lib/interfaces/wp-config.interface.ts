import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export const WP_CONFIG = new InjectionToken<WpConfig>('WP_CONFIG');

export interface WpConfig {
  baseUrl?: string;
  restUrl?: string;
  authUrl?: string;
  jwtOptions?: {
    tokenGetter?: () => string;
    tokenSetter?: (token: string) => void | null | Promise<void | null> | Observable<void | null>;
    tokenRemover?: () => void | null | Promise<void | null> | Observable<void | null>;
  };
  postFilters?: {
    [key: string]: (value, key?) => any
  };
}

