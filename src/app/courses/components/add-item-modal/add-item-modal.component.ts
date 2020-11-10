import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-item-modal',
  templateUrl: './add-item-modal.component.html',
  styleUrls: ['./add-item-modal.component.scss']
})
export class AddItemModalComponent implements OnInit {

  public title: string;
  public description: string;
  public duration: string;
  public creationDate: string;
  public authors: string;

  constructor() { }

  public ngOnInit(): void {
  }

}
