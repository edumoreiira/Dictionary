import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dictionary } from '../components/models/dictionary.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetDictionaryService {

  constructor(private http: HttpClient) { }

  private url:string = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

  requestWord(word: string): Observable<Dictionary[]>{

    return this.http.get<Dictionary[]>(this.url + word);
  }

  
}
