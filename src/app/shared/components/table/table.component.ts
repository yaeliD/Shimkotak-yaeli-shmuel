import { Component, Input, ViewChild } from '@angular/core';
import { Driver } from '../../models/driver.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent {

  @Input() drivers!: Driver[];
  @ViewChild('dt') table!: any;
  selectedDriver!: Driver[];

  constructor() { }
}
