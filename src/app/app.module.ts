import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {AddWordsComponent} from './components/add-words/add-words.component';
import {AppRoutingModule} from './app-routing.module';
import { CheckWordsComponent } from './components/check-words/check-words.component';
import { LearnWordsComponent } from './components/learn-words/learn-words.component';
import {WordService} from './shared/services/word.service';
import { HttpClientModule } from '@angular/common/http';
import {EnglishPipe} from './shared/pipes/english-transform.pipe';
import { RepeatWordsComponent } from './components/repeat-words/repeat-words.component';

@NgModule({
  declarations: [
    AppComponent,
    AddWordsComponent,
    CheckWordsComponent,
    LearnWordsComponent,
    EnglishPipe,
    RepeatWordsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [WordService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
