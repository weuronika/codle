export class Language {

    #name;
    #firstRelease;
    #lastRelease;
    #paradigm;
    #typing;
    #popularity;
    #level;
    #hint;


        constructor(name, firstRelease, lastRelease, paradigmList, typing, popularity, level, hint) {

            this.#name = name;
            this.#firstRelease = firstRelease;
            this.#lastRelease = lastRelease;
            this.#paradigm = paradigmList;
            this.#typing = typing;
            this.#popularity = popularity;
            this.#level = level;
            this.#hint = hint;

        }

        getName() {
            return this.#name;
        }

        getFirstRelease() {
            return this.#firstRelease;
        }

        getLastRelease() {
            return this.#lastRelease;
        }

        getLevel() {
            return this.#level;
        }

        getTyping() {
            return this.#typing;
        }

        getParadigm() {
            return this.#paradigm;
        }

        getPopularity() {
            return this.#popularity;
        }

        getHint() {
            return this.#hint;
        }

        /*getDifficulty() {
            if (this.#popularity > 10) {
                return 5;
            }
            else {
                return 8;
            }
        }*/

        
}

//object freeze to taki sposob na enuma

export const Typing = Object.freeze({
    STATIC: "STATIC",
    DYNAMIC: "DYNAMIC"
});

export const Level = Object.freeze({
    HIGH_LEVEL: "HIGH_LEVEL",
    LOW_LEVEL: "LOW_LEVEL"
});

export const Paradigm = Object.freeze({
    //jednak troche wiecej sie okazalo ze jest paradygmatow niz zakladalam xd
    OBJECT_ORIENTED: "OOP",
    FUNCTIONAL: "FUNCTIONAL",
    PROCEDURAL: "PROCEDURAL",
    DECLARATIVE: "DECLARATIVE",
    LOGIC: "LOGIC",
    CONCURRENT: "CONCURRENT",
    EVENT_DRIVEN: "EVENT"

})