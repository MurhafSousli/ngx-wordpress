import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class WpConfig{

    public baseUrl: string;
    public authKeys: string;

    constructor() {
        
    }

}