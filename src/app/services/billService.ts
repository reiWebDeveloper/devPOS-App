import {Data} from '../data'
import { Product } from '../models/menu.model'
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // Makes the file available throughout the application
})

export class BillService {
    private items: Product[] =[];
    constructor (private data: Data) {}

    addData(item: Product): Product[] {
        this.items.push(item);
        return this.items;
    }

    getData(): Product[] {
        return this.items;
    }
}