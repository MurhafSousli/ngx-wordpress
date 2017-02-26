import { Observable } from 'rxjs/Observable';

export interface ModelInterface {

  get(id: number, args?): Observable<ModelResponse>;
  add(body: any): Observable<ModelResponse>;
  update(id: number, body: any): Observable<ModelResponse>;
  delete(id: number): Observable<ModelResponse>;
}

export interface ModelResponse {
  data: any;
  error: any;
}
