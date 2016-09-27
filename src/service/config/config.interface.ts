import {BehaviorSubject} from 'rxjs';

export interface ConfigInterface{

    baseUrl:string;
    authKeys:string;
    timeOut: number;
    loading:BehaviorSubject<boolean>;
    errors: BehaviorSubject<any>;
    authUser: BehaviorSubject<any>;
}
