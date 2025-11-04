import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-final-message',
  imports: [],
  templateUrl: './final-message.html',
  styleUrl: './final-message.scss',
})
export class FinalMessage {

  // create an output property
  @Output() close = new EventEmitter<void>();

  closeMessage() {
    // emit the event
    this.close.emit();
  }
}