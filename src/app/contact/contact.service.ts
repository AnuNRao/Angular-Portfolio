import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
}

@Injectable()
export class ContactService{
    constructor(private http: HttpClient){

    }

    getStates() {
        return this.http.get('./data/states.json');
    }

}