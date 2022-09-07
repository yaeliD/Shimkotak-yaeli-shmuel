import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Subject } from 'rxjs';
import { Driver } from 'src/app/shared/models/driver.model';

@Injectable({
  providedIn: 'root'
})

export class DriversService {

  drivers: Driver[] = [{ name: 'david', TZ: 205036524, city: 'בני ברק', street: 'רימון' },
  { name: 'דוד', TZ: 205036524, city: 'בני ברק', street: 'רימון' },
  { name: 'שמואל', TZ: 205036524, city: 'אלעד', street: 'רימון' },
  { name: 'מיכאל', TZ: 205036524, city: 'ירושלים', street: 'רימון' },
  { name: 'יוסף', TZ: 205036524, city: 'בני ברק', street: 'רימון' },
  { name: 'יונתן', TZ: 205036524, city: 'בני ברק', street: 'רימון' },
  { name: 'ינון', TZ: 205036524, city: 'באר שבע', street: 'רימון' },
  { name: 'חיים', TZ: 205036524, city: 'רמת גן', street: 'רימון' },
  { name: 'ישראל', TZ: 205036524, city: 'בני ברק', street: 'רימון' },
  { name: 'מיכאל', TZ: 205036524, city: 'גבתיים', street: 'רימון' },
  { name: 'םנחס', TZ: 205036524, city: 'חולון', street: 'רימון' },
  { name: 'מנחם', TZ: 205036524, city: 'בת ים', street: 'רימון' },
  { name: 'נחמן', TZ: 205036524, city: 'בני ברק', street: 'רימון' },
  { name: 'נתן', TZ: 205036524, city: 'בני ברק', street: 'רימון' },
  { name: 'יואל', TZ: 205036524, city: 'בני ברק', street: 'רימון' }
  ];
  drivers$: Subject<any> = new Subject;

  constructor(private dbService: NgxIndexedDBService, private http: HttpClient) {
    this.updateDrivers();
  }

  updateDrivers() {
    this.dbService.getAll('drivers').subscribe((drivers) => {
      if (drivers.length < this.drivers.length) {
        this.drivers$.next(this.drivers);
        this.dbService.bulkAdd('drivers', this.drivers).subscribe();
      } else {
        this.drivers$.next(drivers);
      }
    });
  }

  getCities() {
    return this.http.get('assets/israel_cities.json')
  }

  getStreets() {
    return this.http.get('assets/israel_streets.json')
  }
}
