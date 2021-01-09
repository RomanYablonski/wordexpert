import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { WordService } from '../../shared/services/word.service';
import { Subject } from 'rxjs/internal/Subject';
import { debounceTime, distinctUntilChanged, take, takeUntil } from 'rxjs/operators';
import { Word } from '../../shared/models/word.model';

@Component({
  selector: 'app-add-words',
  templateUrl: './add-words.component.html',
  styleUrls: ['./add-words.component.sass']
})
export class AddWordsComponent implements OnInit, OnDestroy {

  wordValue = new Subject<string>();
  destroyed = new Subject();
  loaded = false;
  wordsList: Word[] = [];
  searchResult: Word[] = [];
  newWords = {};

  @ViewChild('word') wordInput: ElementRef<HTMLInputElement>;
  @ViewChild('translation') translationInput: ElementRef<HTMLInputElement>;

  constructor(private wordService: WordService) { }

  ngOnInit() {
    this.setWordList();
    this.handleSearch();
  }

  setWordList() {
    this.wordService.getWords().subscribe(res => {
      this.wordsList = res;
      this.loaded = true;
    })
  }

  handleSearch() {
    this.wordValue.asObservable().pipe(
      takeUntil(this.destroyed),
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(value => {
      this.updateSearch(value)
    })
  }

  addWord() {
    const english = this.wordInput.nativeElement.value;
    const russian = this.translationInput.nativeElement.value;
    if (!english || !russian) {
      return;
    }
    const newWord: Word = {
      english: english,
      russian: russian,
      status: 'queue',
      wasMistaked: true,
      successes: 0
    };
    this.wordService.addWord(String(this.wordsList.length), newWord).then(res => this.clear())
  }

  clear() {
    this.wordInput.nativeElement.value = '';
    this.translationInput.nativeElement.value = '';
  }

  onChangeWordInput(event: Event) {
    this.wordValue.next((event.target as HTMLInputElement).value)
  }

  updateSearch(value: string) {
    if (!value) {
      this.searchResult = [];
      return;
    }
    this.searchResult = this.wordsList.filter(word => word.english.toLowerCase().includes(value.toLowerCase()));
  }

  addExistingToLearn(word: Word) {
    if (this.isAlreadyAdded(word)) {
      return;
    }

    const updatedWord: Word = {
      ...word,
      status: 'queue',
      successes: 0,
      wasMistaked: true
    }
    this.wordService.updateWord(updatedWord).then(res => this.newWords[updatedWord.english] = true)
  }

  isAlreadyAdded(word: Word): boolean {
    return this.newWords[word.english]
  }


  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
