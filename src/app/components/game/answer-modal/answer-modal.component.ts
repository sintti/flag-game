import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-answer-modal',
  standalone: true,
  imports: [NgIf],
  templateUrl: './answer-modal.component.html',
})
export class ModalComponent implements OnInit {
  @Input() isVisible = false; // Modalin näkyvyys
  @Input() correctAnswer = ''; // Oikea vastaus, joka näytetään modaalissa
  @Output() modalClosed = new EventEmitter<void>(); // Emitoi sulkemisen jälkeen

  ngOnInit(): void {
    if (this.isVisible) {
      // Sulje modali automaattisesti 3 sekunnin kuluttua, jos se on näkyvissä
      setTimeout(() => this.close(), 3000);
    }
  }

  close(): void {
    this.isVisible = false;
    this.modalClosed.emit(); // Ilmoita, että modal on suljettu
  }
}
