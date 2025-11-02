import { Product } from '../models/menu.model'
import { Injectable } from '@angular/core';
import { CartItem } from '../models/menu.model';

@Injectable({
  providedIn: 'root' // Makes the file available throughout the application
})

export class BillService {
    private items: CartItem[] = [];
    constructor () {}

    //add item function
    addData(product: Product): void {
        const existing = this.items.find(i => i.product.name === product.name);
        if (existing) {
            existing.quantity++;
        } else {
            this.items.push({ product, quantity: 1 });
        }
    }

    //getter function
    getData(): CartItem[] {
        return this.items;
    }

    // get total items
    getTotalItems(): number {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
    }

    //increase quantity function
    increaseQuantity(product: Product): void {
        //iterate through the array
        const item = this.items.find(i => i.product.name === product.name);
        if (item) {
            //add qunatity
            item.quantity++;
        }
    }

    //decrease quantity function
    decreaseQuantity(product: Product): void {
        //iterate through the array
        const item = this.items.find(i => i.product.name === product.name);
        if (item) {
            // check if there is at least one item
            if (item.quantity > 1) {
            item.quantity--;
            } else {
            // remove item if quantity go to 0
            this.removeItem(product);
            }
        }
    }

    //remove function
    removeItem(product: Product): void {
        const index = this.items.findIndex(i => i.product.name === product.name);
        if (index > -1) {
            //remove from the array
            this.items.splice(index, 1);
        }
    }
}