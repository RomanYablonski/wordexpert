import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddWordsComponent} from './components/add-words/add-words.component';
import {CheckWordsComponent} from './components/check-words/check-words.component';
import {LearnWordsComponent} from './components/learn-words/learn-words.component';
import {RepeatWordsComponent} from './components/repeat-words/repeat-words.component';

const routes: Routes = [
  {path: 'add-words', component: AddWordsComponent},
  {path: 'check-words', component: CheckWordsComponent},
  {path: 'learn-words', component: LearnWordsComponent},
  {path: 'repeat-words', component: RepeatWordsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
