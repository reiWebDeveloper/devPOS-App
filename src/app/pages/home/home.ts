import { Component, OnInit, signal } from '@angular/core';
import { Data } from '../../data';
import { CommonModule } from '@angular/common';
import { Category } from '../../models/menu.model';
import { Bill } from '../../components/bill/bill';
import { Product } from '../../models/menu.model';
import { BillService } from '../../services/billService';
import { FinalMessage } from '../../components/final-message/final-message';


@Component({
  selector: 'app-home',
  imports: [CommonModule, Bill, FinalMessage],
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit{

  categories: Category[] = [];
  selectedCategory: Category | null = null;
  //isDarkMode = false;

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

  /* dark mode toggle
  darkModeFunction() : void {
    this.isDarkMode = !this.isDarkMode;
    const container = document.querySelector('.container');

    if (this.isDarkMode) {
      container?.classList.add('dark-mode');
    } else {
      container?.classList.remove('dark-mode');
    }
  }*/

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
  selectedProducts: Set<string> = new Set();

  toggleProductSelection(product: Product, index: number): void {
    this.addDataFromBillService(product);
    this.displayCart();

    // to mark the product as selected
    this.selectedProducts.add(product.name);
  }

  // to check if is selected
  isProductSelected(product: Product): boolean {
    return this.selectedProducts.has(product.name);
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
    // disable body scroll
    document.body.style.overflow = 'hidden';
  }

  // animation for the bill
  isShown = signal(false);
  toggle() {
    this.isShown.update((isShown)=> !isShown);
    
    if (this.isShown()) {
      this.displayBill();
    } else {
      // Closing the bill
      this.isBillVisible = false;
      // Re-enable scroll
      document.body.style.overflow = 'auto';
    }
  }

  // getter for checking if bill should show
  get shouldShowBill(): boolean {
    const hasItems = this.billService.getData().length > 0;
    // reset the flag when cart empties
    if (!hasItems) {
      this.isBillVisible = false;
      // Re-enable scroll when bill auto-closes
      document.body.style.overflow = 'auto';
    }
    return this.isBillVisible && hasItems;
  }

  // final message logic
  isFinalMessageShwon = false;
  showFinalMessage() {
    // hide the bill
    this.isBillVisible = false;
    this.isShown.set(false);
    // show final message
    this.isFinalMessageShwon = true;
  }

  //final message close
  closeFinalMessage() {
    // hide final message
    this.isFinalMessageShwon = false;
    // clear the cart
    this.billService.clearCart();
    // hide cart icon
    this.isShow = false;
    // Clear selected products overlay
    this.selectedProducts.clear();
    // Re-enable scroll
    document.body.style.overflow = 'auto';
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