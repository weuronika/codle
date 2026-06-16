import { Guess } from './Guess.js';
import { GuessAnalyzer } from './GuessAnalyzer.js';
import { Language } from './Language.js';

export class DailyGame {

    #theLanguage;
    #guessAnalyzer;
    #repo;
    #todaysDifficulty
    #guessList
    #guessListNames
    #triesForHint

    constructor(repo, language, analyzer) {
        this.#theLanguage = language;
        this.#repo = repo;
        this.isWon = false;
        this.#guessAnalyzer = analyzer;
        this.#todaysDifficulty = "not implemented!" //pewnie w zaleznosci od liczby uzytkownikow
        this.#guessList = [];
        this.#guessListNames = [];
        this.#triesForHint = 5;
    }

    submitGuess(language, languageName) {

        let newGuess = language;
        let result = this.#guessAnalyzer.evaluate(newGuess);

        if (result.isFullyCorrect()) {
            this.isWon = true;
        }

        if (this.#guessListNames.includes(languageName)) {
            return 0;
        }

        this.#guessList.push(result);
        this.#guessListNames.push(languageName);

        return result;

    }

    getLeftTries() {
        return Math.max(this.#triesForHint - this.#guessList.length, 0);
    }

    getSubmittedTries() {
        return this.#guessList.length;
    }

}