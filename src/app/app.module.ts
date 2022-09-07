import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressBarModule } from 'primeng/progressbar';
import { DropdownModule } from 'primeng/dropdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AutocompleteComponent } from './shared/components/autocomplete/autocomplete.component';
import { TableComponent } from './shared/components/table/table.component';
import { HomeComponent } from './pages/home/home.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { AddDriverComponent } from './shared/components/add-driver/add-driver.component';
import { NgxIndexedDBModule, DBConfig } from 'ngx-indexed-db';
import { DriversComponent } from './shared/components/drivers/drivers.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { LoginComponent } from './pages/login/login.component';


export function migrationFactory() {
  return {
    1: (db: any, transaction: any) => {
      const store = transaction.objectStore('drivers');
    }
  };
}

const dbConfig: DBConfig = {
  name: 'MyDb',
  version: 3,
  objectStoresMeta: [{
    store: 'drivers',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'name', keypath: 'name', options: { unique: false } },
      { name: 'TZ', keypath: 'TZ', options: { unique: false } },
      { name: 'city', keypath: 'city', options: { unique: false } },
      { name: 'street', keypath: 'street', options: { unique: false } },
    ]
  }],
  migrationFactory
};

@NgModule({
  declarations: [
    AppComponent,
    AutocompleteComponent,
    TableComponent,
    HomeComponent,
    AddDriverComponent,
    DriversComponent,
    LoginComponent

  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AccordionModule,
    TableModule,
    CalendarModule,
    SliderModule,
    DialogModule,
    MultiSelectModule,
    ContextMenuModule,
    DropdownModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    ProgressBarModule,
    BrowserAnimationsModule,
    NgxIndexedDBModule.forRoot(dbConfig),
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
