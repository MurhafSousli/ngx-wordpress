import {Headers} from "@angular/http";

export interface ConfigInterface {

  baseUrl: string;
  debug: boolean;
  getAuth(): Headers;
  setAuth(keys,type);
}
