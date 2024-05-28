import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Dictionary';

  selectedFont: string = 'Serif';
  darkTheme: boolean = false;
  
  onFontChange(font: string){
    this.selectedFont = font;
  }

  onThemeChange(theme: boolean){
    this.darkTheme = theme;
  }
}
