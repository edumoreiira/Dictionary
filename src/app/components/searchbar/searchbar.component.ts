import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.scss'
})
export class SearchbarComponent {
  
  @Output() searchInput = new EventEmitter<string>();

  constructor(private router: Router){}
  
  submit(search: string){

    if (search){
      this.router.navigate(['search', search]);
    }
  }
}
