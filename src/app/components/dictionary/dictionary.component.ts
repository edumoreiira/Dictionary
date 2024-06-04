import { Component, OnInit } from '@angular/core';
import { SearchbarComponent } from '../searchbar/searchbar.component';
import { CommonModule } from '@angular/common';
import { GetDictionaryService } from '../../services/get-dictionary.service';
import { Observable, catchError, map, of, shareReplay, tap, throwError } from 'rxjs';
import { Dictionary, Phonetics } from '../models/dictionary.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { animate, animateChild, query, state, style, transition, trigger } from '@angular/animations';

//força o elemento pai esperar a animacao do elemento filho, para se remover do DOM
const parentAnimation =  trigger('parentAnimation', [
  transition(':enter, :leave', [
    query('@animateElement', animateChild(), { optional: true })
  ])
])

const elementAnimation = trigger('animateElement', [
  state('void', style({
    opacity: 0
  })),
  transition(':enter', [
    style({
      transform: 'translateY(30px)'
    }),
    animate('400ms ease-out')
  ]),
  transition(':leave', [
    animate('100ms ease-in')
  ])

]);

@Component({
  selector: 'app-dictionary',
  standalone: true,
  imports: [SearchbarComponent, CommonModule],
  providers:[GetDictionaryService],
  templateUrl: './dictionary.component.html',
  styleUrl: './dictionary.component.scss',
  animations: [elementAnimation, parentAnimation]
})
export class DictionaryComponent implements OnInit{
  
  dictionary$ = new Observable<Dictionary[]>();
  private dictionaryRequests: { [word: string]: Observable<Dictionary[]> } = {};
  

  query: string = '';
  hasError: boolean = false;
  constructor(
    private dictionaryService: GetDictionaryService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.query = params['query'];
      if (this.query) {
        this.hasError = false;
        this.searchDictionary(this.query);
      }
    });
  }


  validateAudio(dictionaryArr: Dictionary[]): string{
    let link = "";

    for(const dictionary of dictionaryArr){
      const audio = dictionary.phonetics.find(phonetic => phonetic.audio)?.audio;

      //verifica se audio tem valor
      link = audio ? audio : "";
      break
    }
    return link;
  }

  
  playAudio(link: string): void{
    if(link){
      const audio = new Audio(link);
      audio.play();
    }
  }

  searchDictionary(searchValue: string): void {
    this.dictionary$ = this.getDictionary(searchValue).pipe(
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

  checkAvailableSA(word: string){
    const checkSubscription = this.getDictionary(word).subscribe({
      next: ok => { 
        this.navigateTo(word);
        checkSubscription.unsubscribe(); 
      },
      error: err => {
        console.error(err);
        checkSubscription.unsubscribe();
      }
    })
  }

  private getDictionary(word: string): Observable<Dictionary[]>{
    if(!this.dictionaryRequests[word]){
      this.dictionaryRequests[word] = this.dictionaryService.requestWord(word).pipe(
        shareReplay(1),
        catchError(err => {
          delete this.dictionaryRequests[word]
          return throwError(() => new Error('Word not found.'));
        })
      )
    }
    return this.dictionaryRequests[word];
  }
}
