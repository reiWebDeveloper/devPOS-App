import { Component, OnInit } from '@angular/core';
import { Data } from '../../data';
import { CommonModule } from '@angular/common';
import { Category } from '../../models/menu.model';
import { Bill } from '../../components/bill/bill';



@Component({
  selector: 'app-home',
  imports: [CommonModule, Bill],
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit{

  categories: Category[] = [];
  selectedCategory: Category |  null = null;


  constructor (private data: Data) {}

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

  //display the cart
  isShow = false;
  displayCart() {
    this.isShow = true;
  }

  //display the bill
  isBillVisible = false;
  displayBill() {
    this.isBillVisible = !this.isBillVisible;
  }

}