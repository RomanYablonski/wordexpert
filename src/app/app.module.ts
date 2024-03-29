import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AddWordsComponent } from './components/add-words/add-words.component';
import { AppRoutingModule } from './app-routing.module';
import { CheckWordsComponent } from './components/check-words/check-words.component';
import { LearnWordsComponent } from './components/learn-words/learn-words.component';
import { WordService } from './shared/services/word.service';
import { HttpClientModule } from '@angular/common/http';
import { EnglishPipe } from './shared/pipes/english-transform.pipe';
import { RepeatWordsComponent } from './components/repeat-words/repeat-words.component';
import { EnglishComponent } from './components/english/english.component';
import { environment } from '../environments/environment';
import { FirebaseHelperService } from './shared/services/firebase-helper.service';
import { LoginComponent } from './components/login/login.component';
import {StatisticsComponent} from './components/statistics/statistics.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

@NgModule({
  declarations: [
    AppComponent,
    AddWordsComponent,
    CheckWordsComponent,
    LearnWordsComponent,
    EnglishPipe,
    RepeatWordsComponent,
    EnglishComponent,
    LoginComponent,
    StatisticsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase, 'wordexpert-1'),
    AngularFireDatabaseModule
  ],
  providers: [WordService, FirebaseHelperService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
