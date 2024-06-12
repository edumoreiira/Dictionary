import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SwitchFontService {
  private switchFontEvent$ = new Subject<boolean>;
  
  emmitSwitchFontEvent(isOn: boolean){
    this.switchFontEvent$.next(isOn);
  }
  
  getSwitchFont(){
    return this.switchFontEvent$.asObservable();
  }
}
