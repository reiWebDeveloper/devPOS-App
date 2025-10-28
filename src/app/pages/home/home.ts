import { Component, OnInit } from '@angular/core';
import { Data } from '../../data';
import { CommonModule } from '@angular/common';
import { Category } from '../../models/menu.model';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
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
      },
      error: (err)=> {
        console.error('Error loading menu data:', err);
      }
    }
      
    );
  }

  selectCategory(category: Category): void {
    this.selectedCategory = category;
  }
}