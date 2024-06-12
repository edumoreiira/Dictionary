import { AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SearchbarComponent } from '../searchbar/searchbar.component';
import { CommonModule } from '@angular/common';
import { GetDictionaryService } from '../../services/get-dictionary.service';
import { Observable, Subscription, catchError, finalize, map, merge, of, race, shareReplay, switchMap, take, takeUntil, tap, throwError, timer } from 'rxjs';
import { Dictionary } from '../models/dictionary.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { elementAnimation, errorAnimation, parentAnimation, popUpAnimation } from '../../animations/animations';
import { SwitchFontService } from '../../services/switch-font.service';

@Component({
  selector: 'app-dictionary',
  standalone: true,
  imports: [SearchbarComponent, CommonModule],
  providers: [GetDictionaryService],
  templateUrl: './dictionary.component.html',
  styleUrl: './dictionary.component.scss',
  animations: [elementAnimation, parentAnimation, popUpAnimation, errorAnimation]
})
export class DictionaryComponent implements OnInit, OnDestroy, AfterViewInit, AfterViewChecked {

  dictionary$ = new Observable<Dictionary[]>();
  private dictionaryRequests: { [word: string]: Observable<Dictionary[]> } = {};
  query: string = '';
  hasError: boolean = false;
  private observer: IntersectionObserver | undefined;
  checkSubscription: Subscription | undefined;
  routeSubscription: Subscription | undefined;
  toggleSwitchFontSubscription: Subscription | undefined;
  toggleSwitchFont: boolean = true;
  errorMessage: string = '';
  loadingScreen: boolean = false;
  isSAAvailable: {
    word?: string,
    isAvailable?: boolean
  } = {};


  constructor(
    private dictionaryService: GetDictionaryService,
    private route: ActivatedRoute,
    private router: Router,
    private switchFontService: SwitchFontService
  ) { }

  ngOnInit(): void {
    this.toggleSwitchFontSubscription = this.switchFontService.getSwitchFont().subscribe(value => this.toggleSwitchFont = value)

    this.routeSubscription = this.route.params.subscribe(params => {
      this.query = params['query'];

      if (this.query) {

        if (this.query.length > 30) {
          this.hasError = true;
          this.errorMessage = 'Maximum characteres (30)'

        } else if (!this.filterSearch(this.query)) {
          this.hasError = true;
          this.errorMessage = 'No special characteres allowed'

        } else {
          this.hasError = false;
          this.searchDictionary(this.query);
          this.errorMessage = '';
        }
      }
    });
  }

  ngAfterViewInit(): void {
    //prevents the code to run before window(browser) loads && verify if IntersectionObserver API is available.
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {

      const options = {
        root: null,
        threshold: 0,
        rootMargin: "-100px"
      }
      this.observer = new IntersectionObserver(function
        (entries, observer) {
        entries.forEach(entry => {
          if (!entry.isIntersecting) {
            entry.target.classList.add("animate-entry")
            return;
          }
          entry.target.classList.add("on-view");
          observer.unobserve(entry.target);
        });
      }, options);
    }

  }

  ngAfterViewChecked(): void {
    //verify if observer and document exists, it prevents to run this function before page loads.
    if (this.observer && typeof document !== 'undefined') {

      const definitions = document.querySelectorAll('.definitions-content');
      definitions.forEach((definition) => {
        const childrenHTML = definition.children;  //creates an array(HTMLCollection) of definition`s childs. 
        const children = Array.from(childrenHTML); //turn the HTMLCollection into a standard array.

        children.forEach(child => {
          if (!child.classList.contains('on-view')) {
            this.observer!.observe(child);
          }
        })
      })
    }
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
    if(this.toggleSwitchFontSubscription){
      this.toggleSwitchFontSubscription.unsubscribe();
    }
  }

  validateAudio(dictionaryArr: Dictionary[]): string {
    let link = "";
    for (const dictionary of dictionaryArr) {
      const audio = dictionary.phonetics.find(phonetic => phonetic.audio)?.audio;
      //verifica se audio tem valor
      link = audio ? audio : "";
      break
    }
    return link;
  }

  filterSearch(search: string) {
    const pattern = /^[a-zA-Z0-9 .,-]+$/;
    return pattern.test(search);
  }

  playAudio(link: string): void {
    if (link) {
      const audio = new Audio(link);
      audio.play();
    }
  }

  searchDictionary(searchValue: string): void {
    this.dictionary$ = this.getDictionary(searchValue).pipe(
      take(1),
      catchError(err => {
        this.hasError = true;
        return of([]);
      })
    );
  }

  navigateTo(word: string): void {
    if (word) {
      this.router.navigate(['/search', word]);
    }
  }

  checkAvailableSA(word: string): void {
    this.checkSubscription = this.getDictionary(word).pipe(
      take(1)
    )
    .subscribe({
      next: ok => {
        const top = document.querySelector('#top');

        top?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        this.navigateTo(word);
        this.isSAAvailable = { word: word, isAvailable: true }
      },
      error: err => {
        console.error(err);
        this.isSAAvailable = { word: word, isAvailable: false }
      }
    })
  }

  deleteLastDictionaryRequest(): void{
    const requests = this.dictionaryRequests;
    const firstRequest = Object.keys(requests)[0];
    delete requests[firstRequest];
  }

  private getDictionary(word: string): Observable<Dictionary[]> {
    
    //clear last item of cache if > 25 dictionary searches;
    const dictionaryLength = Object.keys(this.dictionaryRequests).length;
    if(dictionaryLength > 25){ this.deleteLastDictionaryRequest(); }

    if (!this.dictionaryRequests[word]) {
      const request$ = this.dictionaryService.requestWord(word).pipe(
        tap(() => this.loadingScreen = false),
        take(1),
        shareReplay(),
        catchError(err => {
          delete this.dictionaryRequests[word]
          return throwError(() => new Error('Word not found.'));
        })
      )

      const delay$ = timer(600).pipe(
        take(1),
        tap(() => this.loadingScreen = true)
      )

      this.dictionaryRequests[word] = race(
        request$,
        delay$.pipe(
          switchMap(() => request$))
      );
    }

    return this.dictionaryRequests[word];
  }
}
