import { makeAutoObservable } from 'mobx';

export interface Word {
  id: number;
  text: string;
  status: 'correct' | 'incorrect' | 'unanswered';
}

export default class WordStore {
  words: Array<Word> = [];

  currentIndex: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  loadWords(words: Array<string>): void {
    this.words = words.map((item, index) => ({
      id: index,
      text: item,
      status: 'unanswered',
    }));
  }

  nextWord = (text: string): void => {
    this.compareWord(text);
    this.currentIndex++;
  };

  get currentWord(): Word {
    return this.words[this.currentIndex];
  }

  get currentWordList(): Array<Word> {
    const modIndex = this.currentIndex % 10;

    const startIndex = this.currentIndex - modIndex;
    const endIndex = this.currentIndex + (10 - modIndex);

    return this.words.slice(startIndex, endIndex);
  }

  private compareWord = (text: string): void => {
    const word = { ...this.currentWord };

    word.status = word.text === text ? 'correct' : 'incorrect';
    this.words[this.currentIndex] = word;
  };

  compareRealTime = (text: string): void => {
    const word = { ...this.currentWord };
    const isEqual = word.text.slice(0, text.length) === text;

    word.status = !isEqual
      ? 'incorrect'
      : word.text === text
      ? 'correct'
      : 'unanswered';

    this.words[this.currentIndex] = word;
  };

  get score(): number {
    return this.words.filter((word) => word.status === 'correct').length;
  }

  reset = (): void => {
    this.currentIndex = 0;
  };
}
