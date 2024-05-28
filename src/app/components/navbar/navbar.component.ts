import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

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
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  animations: [slideUpDown]
})
export class NavbarComponent {
  
  @HostListener('document:click', ['$event'])
  clickOut(event: MouseEvent){
    const fontElement = document.querySelector('.change-font');
    
    if(!fontElement?.contains(event.target as Node)){
      this.isFontOpen = false;
    }

  }
  isFontOpen = false;

  toggleFont(event: MouseEvent){
    const target = event.target as HTMLElement;
    if (target.classList.contains('fl')) {
      return; // Sai da função se o clique não ocorreu nas divs "fl"
    }

    this.isFontOpen = !this.isFontOpen;
  }
}
