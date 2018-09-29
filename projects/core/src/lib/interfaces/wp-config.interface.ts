import { InjectionToken } from '@angular/core';
import { Observable, OperatorFunction } from 'rxjs';
import { DataFilter } from '../utilities';

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
  filters?: {
    [key: string]: WpObjectFilter;
  };
}

export interface WpObjectFilter {
  [key: string]: WpPropertyFilter;
}

export type WpPropertyFilter = OperatorFunction<DataFilter<any>, DataFilter<any>>[];
