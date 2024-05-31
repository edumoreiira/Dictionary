import { Component, OnInit } from '@angular/core';
import { SearchbarComponent } from '../searchbar/searchbar.component';
import { CommonModule } from '@angular/common';
import { GetDictionaryService } from '../../services/get-dictionary.service';
import { Observable } from 'rxjs';
import { Dictionary, Phonetics } from '../models/dictionary.interface';

@Component({
  selector: 'app-dictionary',
  standalone: true,
  imports: [SearchbarComponent, CommonModule],
  providers:[GetDictionaryService],
  templateUrl: './dictionary.component.html',
  styleUrl: './dictionary.component.scss'
})
export class DictionaryComponent implements OnInit{

  constructor(private dictionaryService: GetDictionaryService){

  }

  ngOnInit(): void {
    this.searchDictionary('book');
  }

  $dictionary = new Observable<Dictionary[]>();

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

  
  playAudio(link: string){
    if(link){
      const audio = new Audio(link);
      audio.play();
    }
  }

  searchDictionary(searchValue: string){
    this.$dictionary = this.dictionaryService.requestWord(searchValue);
  }
  
}
