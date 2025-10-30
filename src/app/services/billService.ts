import {Data} from '../data'
import { Product } from '../models/menu.model'
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // Makes the service a singleton and available throughout the application
})

export class BillService {
    private items: Product[] =[];
    constructor (private data: Data) {}

    addData(item: Product): void {
        this.items.push(item);
    }

    getData(): Product[] {
        return this.items;
    }
}