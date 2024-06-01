import { Routes } from '@angular/router';
import { DictionaryComponent } from './components/dictionary/dictionary.component';

export const routes: Routes = [
    { path: '', redirectTo: '/search', pathMatch: 'full'},
    { path: 'search', component: DictionaryComponent },
    { path: 'search/:query', component: DictionaryComponent}
];
