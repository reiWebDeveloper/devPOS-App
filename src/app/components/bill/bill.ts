import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillService } from '../../services/billService';

@Component({
  selector: 'app-bill',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './bill.html',
  styleUrl: './bill.scss',
})
export class Bill {

  constructor(public billService: BillService) {}

  //total function
  get totalPrice(): number {
    return this.billService.getData().reduce((sum, item) => sum + item.product.unitPrice*item.quantity, 0);
  }

}