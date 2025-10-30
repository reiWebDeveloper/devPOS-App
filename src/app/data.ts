import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MenuData } from './models/menu.model';



@Injectable({
  providedIn: 'root'
})
export class Data {
  private dataURL = "https://test.dev.al/test/";

  constructor (private http : HttpClient) { }

  getData(): Observable<MenuData> {
    return this.http.get<MenuData>(this.dataURL);
  }
}