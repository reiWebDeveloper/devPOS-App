import { Component, OnInit } from '@angular/core';
import { Data } from '../../data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit{
[x: string]: any;
  items: any[] = [];

  constructor (private data: Data) {}

  ngOnInit(): void {
    this.data.getData().subscribe(
      response=> {
        console.log('Response from API:', response);
      this.items = response.categories[0]?.products ?? [];
      },
      error=> console.error('Error fetching data:', error)
    );
  }
}
