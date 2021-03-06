import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddWordsComponent } from './components/add-words/add-words.component';
import { CheckWordsComponent } from './components/check-words/check-words.component';
import { LearnWordsComponent } from './components/learn-words/learn-words.component';
import { RepeatWordsComponent } from './components/repeat-words/repeat-words.component';
import { EnglishComponent } from './components/english/english.component';
import { AuthGuard } from './shared/guards/auth-guard';

const routes: Routes = [

  { path: '',
    canActivateChild: [AuthGuard],
    children: [
      { path: 'add-words', component: AddWordsComponent },
      { path: 'check-words', component: CheckWordsComponent },
      { path: 'learn-words', component: LearnWordsComponent },
      { path: 'repeat-words', component: RepeatWordsComponent },
      { path: 'english', component: EnglishComponent },
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {
}
