import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators"; 

@Injectable()
export class MyEditorService {
  constructor(private http: HttpClient) { 
  }

  getUsers(): Observable<any> {
    return this.http.get("assets/data/users.json")
    .pipe(map(res => res));
}

}