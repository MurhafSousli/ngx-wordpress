import { InjectionToken } from '@angular/core';
import { JwtConfig } from './jwt.interface';

export const JWT_OPTIONS = new InjectionToken<JwtConfig>('JWT_OPTIONS');
