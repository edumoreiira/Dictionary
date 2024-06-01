import { Component, OnInit } from '@angular/core';
import { SearchbarComponent } from '../searchbar/searchbar.component';
import { CommonModule } from '@angular/common';
import { GetDictionaryService } from '../../services/get-dictionary.service';
import { Observable, catchError, of, tap } from 'rxjs';
import { Dictionary, Phonetics } from '../models/dictionary.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dictionary',
  standalone: true,
  imports: [SearchbarComponent, CommonModule],
  providers:[GetDictionaryService],
  templateUrl: './dictionary.component.html',
  styleUrl: './dictionary.component.scss'
})
export class DictionaryComponent implements OnInit{
  
  $dictionary = new Observable<Dictionary[]>();
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

  // searchDictionary(searchValue: string): void{
  //   this.$dictionary = this.dictionaryService.requestWord(searchValue);
  // }

  searchDictionary(searchValue: string): void {
    console.log("estou funcionando")
    this.$dictionary = this.dictionaryService.requestWord(searchValue).pipe(
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
}
