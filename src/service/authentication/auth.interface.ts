import {Observable} from "rxjs/Observable";
export interface AuthInterface {

  basic(username: string, password: string, remember?: boolean): Observable<any>;
  cookies(): Observable<any>;
  logout(): void;
}
