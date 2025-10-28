import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Data {
  private dataURL = "https://test.dev.al/test/";

  constructor (private http : HttpClient) { }
  getData(): Observable<any> {
    return this.http.get<any[]>(this.dataURL);
  }
}
