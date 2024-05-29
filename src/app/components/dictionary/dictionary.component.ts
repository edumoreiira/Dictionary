import { Component } from '@angular/core';
import { SearchbarComponent } from '../searchbar/searchbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dictionary',
  standalone: true,
  imports: [SearchbarComponent, CommonModule],
  templateUrl: './dictionary.component.html',
  styleUrl: './dictionary.component.scss'
})
export class DictionaryComponent {

  
  playAudio(){
    const audio = new Audio('https://api.dictionaryapi.dev/media/pronunciations/en/keyboard-us.mp3');
    audio.play()
  }
}
