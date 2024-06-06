import { AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription, filter, shareReplay, take } from 'rxjs';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.scss'
})
export class SearchbarComponent implements AfterViewInit, OnInit, OnDestroy {
  
  // @Output() searchInput = new EventEmitter<string>();
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  querySubscription: Subscription | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  
  ){ }


  ngOnInit(): void {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.changeSearchbarValueToQuery();
   });
  }

  ngAfterViewInit(): void {
    this.changeSearchbarValueToQuery();
  }
  

  ngOnDestroy(): void {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }

  changeSearchbarValueToQuery(){
    this.querySubscription = this.route.params.pipe(
      take(1),
      shareReplay(1)
    ).subscribe(params => {
      this.searchInput.nativeElement.value = params['query'] || '';
      this.querySubscription?.unsubscribe();
    })
  }

  submit(search: string){

    if (search){
      this.router.navigate(['search', search]);
    }
  }
}
