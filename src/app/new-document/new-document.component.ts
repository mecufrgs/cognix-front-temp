import { Component, OnInit } from '@angular/core';
import { Metadata } from '../metadata';
import { emptyMock } from '../mock-data';

@Component({
  selector: 'app-new-document',
  templateUrl: './new-document.component.html',
  styleUrls: ['./new-document.component.css']
})
export class NewDocumentComponent implements OnInit {

  metadata: Metadata;

  constructor() { }
  ngOnInit() {
    this.metadata = emptyMock;
  }
  saveData(): void {
    let json = JSON.stringify(this.metadata);
  }


}
