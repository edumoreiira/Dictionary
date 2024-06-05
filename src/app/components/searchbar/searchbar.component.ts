import { AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.scss'
})
export class SearchbarComponent implements AfterViewInit, OnInit, OnDestroy {
  
  // @Output() searchInput = new EventEmitter<string>();
  @ViewChild('searchInput') searchInputNative!: ElementRef<HTMLInputElement>;

  searchInput!: HTMLInputElement;
  querySubscription: Subscription | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  
  ){}
  ngOnInit(): void {
    
  }
  
  ngAfterViewInit(): void {
    this.searchInput = this.searchInputNative.nativeElement;
    this.querySubscription = this.route.params.subscribe(params => {
      this.searchInput.value = params['query'] || ''
      this.querySubscription?.unsubscribe();
      console.log("desinscrito")
    });
  }

  ngOnDestroy(): void {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }

  submit(search: string){

    if (search){
      this.router.navigate(['search', search]);
    }
  }
}
