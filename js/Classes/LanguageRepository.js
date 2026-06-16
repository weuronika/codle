import { Language, Typing, Level, Paradigm } from './Language.js';
export class LanguageRepository {

    #languageMap = new Map();
    #languageList; //do losowania

    constructor() {
        this.#languageMap = new Map(); //klucz - nazwa jezyka, wartosc - jezyk typu Language
        this.#languageList = [];
    }

    createNewLanguage(languageName, paradigm, typing, level, firstRelease, lastRelease, popularity, hint) {
        if (this.#languageMap.has(languageName)) {
            //jest, wiec go nie dodajemy
            return;
        }
        else {
            const newLang = new Language(languageName, firstRelease, lastRelease, paradigm, typing, popularity, level, hint);
            this.#languageMap.set(languageName.toLowerCase(), newLang);
            this.#languageList.push(languageName.toLowerCase());
            return;
        }
    }

    getLanguageByName(languageName) {
        return this.#languageMap.get(languageName);
    }

    getRandomLanguage() {
        if (this.#languageList.length == 0) {
            return "the list is empty!";
        }
        let randomName = this.#languageList[Math.floor(Math.random() * this.#languageList.length)];
        return this.#languageMap.get(randomName);
    }
}
