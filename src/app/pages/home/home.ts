import { Component, OnInit, signal } from '@angular/core';
import { Data } from '../../data';
import { CommonModule } from '@angular/common';
import { Category } from '../../models/menu.model';
import { Bill } from '../../components/bill/bill';
import { Product } from '../../models/menu.model';
import { BillService } from '../../services/billService';


@Component({
  selector: 'app-home',
  imports: [CommonModule, Bill],
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit{

  categories: Category[] = [];
  selectedCategory: Category | null = null;

  // initialize the Object
  constructor (private data: Data, public billService: BillService) {}

  ngOnInit(): void {

    this.data.getData().subscribe({
      next: (d)=> {
        this.categories = d.categories;
        // show the first category
        if (this.categories.length > 0) {
          this.selectedCategory = this.categories[0];
        }
      },
      error: (err)=> {
        console.error('Error loading menu data:', err);
      }
    }
      
    );
  }

  selectCategory(category: Category, event?: Event): void {
    this.selectedCategory = category;

    // move the selected element to start with scrollIntoView() method
    const target = (event?.target as HTMLElement);
    target?.scrollIntoView({
      behavior: 'smooth', //scroll behaviour
      block: 'nearest', //vertical alignment
      inline: 'start' //horizontal alignment
    });
  }

  // keeps track of which product have been clicked
  selectedProducts: Set<number> = new Set();

  toggleProductSelection(product: Product, index: number): void {
    this.addDataFromBillService(product);
    this.displayCart();

    // to mark the product as selected
    this.selectedProducts.add(index);
  }

  addDataFromBillService (product: Product) {
    //add the product data
    this.billService.addData(product);
  }

  //display the cart
  isShow = false;
  displayCart() {
    this.isShow = true;
  }

  //display the bill
  isBillVisible = false;
  displayBill() {
    this.isBillVisible = true;
    // remove all gray overlays
    this.selectedProducts.clear();
  }

  // animation for the bill
  isShown = signal(false);
  toggle() {
    this.isShown.update((isShown)=> !isShown);
    this.displayBill();
  }

  // getter for checking if bill should show
  get shouldShowBill(): boolean {
    const hasItems = this.billService.getData().length > 0;
    // reset the flag when cart empties
    if (!hasItems) {
      this.isBillVisible = false;
    }
    return this.isBillVisible && hasItems;
  }

  // generate colors
  private colorPalette = [
    '#ff6b6bb5',
    '#4ECDC4',
    '#45B7D1',
    '#FFA07A',
    '#98D8C8',
    '#F7DC6F',
    '#BB8FCE',
    '#85C1E2',
    '#F8B739',
    '#6C5CE7'
  ];

  getProductColor(index: number): string {
    // cycle through colors if there are more products than colors
    while (index >= this.colorPalette.length) {
      // make the index smaller if array length (item list) is bigger
      index = index - this.colorPalette.length;
    }
    return this.colorPalette[index];
  }

}