import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

const slideUpDown = trigger('slideUpDown', [
  state('void', style({
    opacity: 0,
    transform: 'translateY(-25%)'
  })),
  state('static', style({
    opacity: 1,
    transform: 'translateY(0%)'
  })),
  transition(':enter', [
    animate('.3s ease-in-out')
  ]),
  transition(':leave', [
    animate('.3s ease-in-out')
  ]),
]);

const fadeInOut = trigger('fadeInOut', [
  state('in', style({ opacity: 1 })),
  state('out', style({ opacity: 0, transform: 'translateY(50%)' })),
  transition('out => in', [
    animate('.2s ease-in-out')
  ]),
  transition('in => out', [
    animate('.2s ease-in-out')
  ])

]);

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  animations: [slideUpDown, fadeInOut]
})
export class NavbarComponent {
  
  @Output() fontChanged = new EventEmitter<string>();
  @Output() themeChanged = new EventEmitter<boolean>();
  selectedFont: string = 'Serif';
  isFontOpen: boolean = false;
  fadeInOutState: string = 'in';
  darkTheme: boolean = false;

  //Verifica se o click foi fora da div change-font
  @HostListener('document:click', ['$event'])
  clickOut(event: MouseEvent){
    const fontElement = document.querySelector('.change-font');
    
    if(!fontElement?.contains(event.target as Node)){
      this.isFontOpen = false;
    }
  }

  toggleFont(event: MouseEvent){
    const target = event.target as HTMLElement;
    if (target.classList.contains('fl')) {
      return; // Sai da função se o clique não ocorreu nas divs "fl"
    }

    this.isFontOpen = !this.isFontOpen;
  }

  changeFont(font: string){
    this.isFontOpen = false;
    
    if(font === this.selectedFont) return
    // animacao ao trocar de nome
    this.fadeInOutState = 'out';
    setTimeout(() => {
      this.fadeInOutState = 'in';
      this.selectedFont = font;
      this.fontChanged.emit(this.selectedFont);
    },200);
  }

  toggleTheme(){
    this.darkTheme = !this.darkTheme
    this.themeChanged.emit(this.darkTheme);
  }
}
