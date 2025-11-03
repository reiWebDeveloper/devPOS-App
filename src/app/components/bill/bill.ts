import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillService } from '../../services/billService';
import { FinalMessage } from '../final-message/final-message';

@Component({
  selector: 'app-bill',
  imports: [CommonModule, FinalMessage],
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

  //display the final Message
  isVisible: boolean = false; // Initialize to false to hide the element initially
  displayFinalMessage() {
    this.isVisible = true;
  }

}