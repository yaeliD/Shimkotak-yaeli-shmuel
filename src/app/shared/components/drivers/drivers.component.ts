import { Component, OnInit } from '@angular/core';
import { DriversService } from 'src/app/core/services/drivers.service';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss']
})
export class DriversComponent implements OnInit {

  drivers!: any;

  constructor(private driversService: DriversService) { }

  ngOnInit(): void {
    this.driversService.drivers$.subscribe((res: any) => {
      this.drivers = res;
    });
  }
}
