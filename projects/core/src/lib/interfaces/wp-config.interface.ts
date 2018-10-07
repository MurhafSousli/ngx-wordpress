import { InjectionToken } from '@angular/core';
import { Observable, OperatorFunction } from 'rxjs';

export const WP_CONFIG = new InjectionToken<WpConfig>('WP_CONFIG');

export interface WpConfig {
  baseUrl?: string;
  restUrl?: string;
  authUrl?: string;
  validateAuthUrl?: string;
  cdnOptions?: any;
  jwtOptions?: {
    headerName?: string;
    authScheme?: string;
    skipWhenExpired?: boolean;
    tokenGetter?: () => Promise<string | null> | Observable<string | null>;
    tokenSetter?: (token: string) => Promise<void | null> | Observable<void | null>;
    tokenRemover?: () => Promise<void | null> | Observable<void | null>;
  };
  filters?: {
    [key: string]: WpObjectFilter;
  };
}

export interface WpObjectFilter {
  [key: string]: WpPropertyFilter;
}

export type WpPropertyFilter = OperatorFunction<WpFilterRes<any>, WpFilterRes<any>>[];

export interface WpFilterRes<T> {
  key?: string;
  value: T;
}
