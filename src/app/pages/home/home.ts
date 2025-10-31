import { Component, OnInit } from '@angular/core';
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

  // Initialize the Object
  constructor (private data: Data, public billService: BillService) {}

  ngOnInit(): void {

    this.data.getData().subscribe({
      next: (d)=> {
        this.categories = d.categories;
        // Automatically show the first category
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

    // Move the selected element to start
    const target = (event?.target as HTMLElement);
    target?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start'
    });
  }

  addDataFromBillService (product: Product) {
    //add the product data
    this.billService.addData(product);
  }

  //TODO: Add animation for the cart

  //display the cart
  isShow = false;
  displayCart() {
    this.isShow = true;
  }

  //display the bill
  isBillVisible = false;
  displayBill() {
    this.isBillVisible = true;
  }

}