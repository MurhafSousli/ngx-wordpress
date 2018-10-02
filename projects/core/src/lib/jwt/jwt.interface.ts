import { Observable } from 'rxjs';

export interface JwtConfig {
  tokenGetter?: () => Promise<string | null> | Observable<string | null>;
  headerName?: string;
  authScheme?: string;
  whitelistedDomains?: Array<string | RegExp>;
  blacklistedRoutes?: Array<string | RegExp>;
  skipWhenExpired?: boolean;
}
