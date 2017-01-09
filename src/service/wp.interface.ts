import {Observable} from "rxjs/Observable";
import {EndpointService} from "./endpoint/endpoint.service";
import {AuthService} from "./authentication/auth.service";

export interface WpInterface {
  discover(url: string): Observable<any>;
  link(url: string): Observable<any>;
  collection(): EndpointService;
  model(): EndpointService;
  auth(): AuthService;
}


