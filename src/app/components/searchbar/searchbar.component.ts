import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.scss'
})
export class SearchbarComponent {
  
  @Output() searchInput = new EventEmitter<string>();

  submit(search: string){
    console.log(search);
    this.searchInput.emit(search);
  }
}
