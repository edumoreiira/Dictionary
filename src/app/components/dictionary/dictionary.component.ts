import { Component, OnInit } from '@angular/core';
import { SearchbarComponent } from '../searchbar/searchbar.component';
import { CommonModule } from '@angular/common';
import { GetDictionaryService } from '../../services/get-dictionary.service';
import { Observable, catchError, of, shareReplay, throwError } from 'rxjs';
import { Dictionary } from '../models/dictionary.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { elementAnimation, parentAnimation, popUpAnimation } from '../../animations/animations';

@Component({
  selector: 'app-dictionary',
  standalone: true,
  imports: [SearchbarComponent, CommonModule],
  providers:[GetDictionaryService],
  templateUrl: './dictionary.component.html',
  styleUrl: './dictionary.component.scss',
  animations: [elementAnimation, parentAnimation, popUpAnimation]
})
export class DictionaryComponent implements OnInit{
  
  dictionary$ = new Observable<Dictionary[]>();
  private dictionaryRequests: { [word: string]: Observable<Dictionary[]> } = {};
  query: string = '';
  hasError: boolean = false;
  isSAAvailable: { 
    word?: string,
    isAvailable?: boolean
  } = {};


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

  checkAvailableSA(word: string): void{
    const checkSubscription = this.getDictionary(word).subscribe({
      next: ok => { 
        this.navigateTo(word);
        this.isSAAvailable = {word: word, isAvailable: true}
        checkSubscription.unsubscribe(); 
      },
      error: err => {
        console.error(err);
        this.isSAAvailable = {word: word, isAvailable: false}
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
