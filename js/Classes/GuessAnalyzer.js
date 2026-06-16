import { GuessResult } from './GuessResult.js';
import { Language } from './Language.js';
export class GuessAnalyzer {

    #theLanguage

    constructor(theLanguage) {
        this.#theLanguage = theLanguage;
    }

    evaluate(inputLanguage) {

        //i teraz po prostu dla kazdej cechy z osobna trzeba porownac pola

        //pola z false to po prostu odpowiedzi tak/nie
        //pola z inf to odpowiedzi mniejsze/rowne/wieksze
        //poza paradigm gdzie to oznacza rowne/zawiera sie/rozlaczne

        //console.log( inputLanguage instanceof Language);


        let nameRes = false;
        let firstReleaseRes = Infinity;
        let lastReleaseRes = Infinity;
        let paradigmRes = Infinity; //to bedzie tablica paradygmatow i bedziemy sprawdzac jak te tablice sie pokrywaja
        let typingRes = false;
        let levelRes = false;
        let popularityRes = Infinity;

        // *********** PARADYGMATY *********** 

        const theLanguageParadigms = this.#theLanguage.getParadigm();
        const inputLanguageParadigms = inputLanguage.getParadigm();

        paradigmRes = -2;

        let anyCommon = inputLanguageParadigms.some(p => theLanguageParadigms.includes(p)); //tutaj taka fajna metoda 'some'

        if (anyCommon) {
            paradigmRes = 2; //czesciowe dopasowanie
        }

        //ale sprawdzamy czy moze byc lepiej

        if (theLanguageParadigms.length === inputLanguageParadigms.length) {
            if (inputLanguageParadigms.every(p => theLanguageParadigms.includes(p))) {
                paradigmRes = 0;
            }
        }

        // *********** TYPOWANIE *********** 

        if (inputLanguage.getTyping() === this.#theLanguage.getTyping()) {
            typingRes = true;
        }

        // *********** POZIOM **************

        if (inputLanguage.getLevel() === this.#theLanguage.getLevel()) {
            levelRes = true;
        }

        // *********** POPULARNOŚĆ *********

        if (inputLanguage.getPopularity() === this.#theLanguage.getPopularity()) {
            popularityRes = 0;
        }

        if (inputLanguage.getPopularity() < this.#theLanguage.getPopularity()) {
            popularityRes = -1;
        }

        if (inputLanguage.getPopularity() > this.#theLanguage.getPopularity()) {
            popularityRes = 1;
        }

        // *********** NAZWA ****************

        if (inputLanguage.getName() === this.#theLanguage.getName()) {
            nameRes = true;
        }

        // ********** 1. WYDANIE ************

        if (inputLanguage.getFirstRelease() === this.#theLanguage.getFirstRelease()) {
            firstReleaseRes = 0;
        }

        if (inputLanguage.getFirstRelease() < this.#theLanguage.getFirstRelease()) {
            firstReleaseRes = -1;
        }

        if (inputLanguage.getFirstRelease() > this.#theLanguage.getFirstRelease()) {
            firstReleaseRes = 1;
        }

        // ******** OSTATNIE WYDANIE **********

        if (inputLanguage.getLastRelease() === this.#theLanguage.getLastRelease()) {
            lastReleaseRes = 0;
        }

        if (inputLanguage.getLastRelease() < this.#theLanguage.getLastRelease()) {
            lastReleaseRes = -1;
        }

        if (inputLanguage.getLastRelease() > this.#theLanguage.getLastRelease()) {
            lastReleaseRes = 1;
        }

        // *** TWORZENIE WYNIKU ***

        let result = new GuessResult (
            nameRes,
            firstReleaseRes,
            lastReleaseRes,
            paradigmRes,
            typingRes,
            popularityRes,
            levelRes
        )

        return result;

    }

}