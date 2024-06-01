import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dictionary } from '../components/models/dictionary.interface';
import { Observable, catchError, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetDictionaryService {

  constructor(private http: HttpClient) { }

  private url:string = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

  // requestWord(word: string): Observable<Dictionary[]>{

  //   return this.http.get<Dictionary[]>(this.url + word);
  // }

  requestWord(word: string): Observable<Dictionary[]> {
    return this.http.get<Dictionary[]>(this.url + word).pipe(
      catchError(err => {
        return throwError(() => err);
      })
    );
  }
  
}
