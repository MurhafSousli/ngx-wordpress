import {Headers} from "@angular/http";
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

export interface ConfigInterface {

  baseUrl: string;
  timeOut: number;
  loading: BehaviorSubject<boolean>;
  errors: BehaviorSubject<any>;
  getAuth(): Headers;
  setAuth(keys,type);
}
