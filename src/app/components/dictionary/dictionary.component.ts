import { Component } from '@angular/core';
import { SearchbarComponent } from '../searchbar/searchbar.component';
import { CommonModule } from '@angular/common';
import { GetDictionaryService } from '../../services/get-dictionary.service';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dictionary } from '../models/dictionary.interface';

@Component({
  selector: 'app-dictionary',
  standalone: true,
  imports: [SearchbarComponent, CommonModule, HttpClientModule],
  providers:[GetDictionaryService],
  templateUrl: './dictionary.component.html',
  styleUrl: './dictionary.component.scss'
})
export class DictionaryComponent {

  constructor(private dictionaryService: GetDictionaryService){

  }

  $teste = new Observable<Dictionary[]>();

  playAudio(){
    const audio = new Audio('https://api.dictionaryapi.dev/media/pronunciations/en/keyboard-us.mp3');
    audio.play()
  }
  
  searchDictionary(searchValue: string){
    this.$teste = this.dictionaryService.requestWord(searchValue);
    // this.$teste.subscribe(a=>{console.log(a[0].word)})
  }
}
