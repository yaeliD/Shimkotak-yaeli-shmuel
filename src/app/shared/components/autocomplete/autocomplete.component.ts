import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent {

  @Input() listSearch: any;
  @Input() autocompleteInput: string = '';
  @Output() selected: EventEmitter<any> = new EventEmitter<any>();
  searchResults: any;
  queryWait: boolean = false;
  isEnglishName!: boolean;

  constructor() { }

  getPlaceAutocomplete() {
    if (this.autocompleteInput) {

      if ('a' <= this.autocompleteInput && this.autocompleteInput <= 'z' || 'A' <= this.autocompleteInput && this.autocompleteInput <= 'Z') {
        this.isEnglishName = true;
        this.searchResults = this.listSearch.filter((item: any) => {
          return item.english_name[0].toLowerCase().startsWith(this.autocompleteInput);
        });

      } else {
        this.isEnglishName = false;
        this.searchResults = this.listSearch.filter((item: any) => {
          return item.hebrew_name[0].toLowerCase().startsWith(this.autocompleteInput);
        });
      }

      if (this.searchResults.length > 5) {
        let results = this.searchResults;
        this.searchResults = [];
        for (let i = 0; i <= 4; i++) {
          this.searchResults[i] = results[i];
        }
      }
      this.queryWait = true;

    } else {
      this.queryWait = false;
      this.searchResults = [];
    }
  }

  selectedEntity(entity: string) {
    this.selected.emit(entity);
    this.autocompleteInput = entity;
    this.queryWait = false;
    this.searchResults = [];
  }
}
