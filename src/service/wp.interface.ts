import { EndpointService } from './endpoint/endpoint.service';
import { AuthService } from './authentication/auth.service';

export interface WpInterface {
  collection(): EndpointService;
  model(): EndpointService;
  auth(): AuthService;
}


