import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { DriversService } from 'src/app/core/services/drivers.service';
import { Driver } from '../../models/driver.model';

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.scss']
})
export class AddDriverComponent implements OnInit {

  displayMaximizable!: boolean;
  cities: any;
  streets: any;
  autocompleteInput!: any;

  constructor(private formBuilder: FormBuilder, private driverService: DriversService, private dbService: NgxIndexedDBService) { }

  ngOnInit(): void {
    this.driverService.getCities().subscribe((cities: any) => {
      this.cities = cities.cities.city;
    });
    this.driverService.getStreets().subscribe((streets: any) => {
      this.streets = streets.streets.street;
    })
  }

  showMaximizableDialog() {
    this.displayMaximizable = true;
  }

  newDriverForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    TZ: ['', [Validators.required]],
    city: ['', [Validators.required]],
    street: ['', [Validators.required]],
  });

  get name() {
    return this.newDriverForm.get('name');
  }

  get TZ() {
    return this.newDriverForm.get('TZ');
  }

  get city() {
    return this.newDriverForm.get('city');
  }

  get street() {
    return this.newDriverForm.get('street');
  }

  currentCity(city: any) {
    this.city?.setValue(city);
  }

  currentStreet(street: any) {
    this.street?.setValue(street);
  }

  onSubmit() {
    const driver: Driver = {
      name: this.name?.value ?? '',
      TZ: this.TZ?.value ?? '',
      city: this.city?.value ?? '',
      street: this.street?.value ?? ''
    };

    this.dbService.add('drivers', driver).subscribe(() => {
      this.driverService.updateDrivers();
    });

    this.displayMaximizable = false;
    this.clearForms();
  }

  clearForms() {
    this.newDriverForm.controls['name'].setValue('');
    this.newDriverForm.controls['TZ'].setValue('');
    this.autocompleteInput = '';
    setTimeout(() => {
      this.autocompleteInput = undefined;
    }, 6000)
  }
}
