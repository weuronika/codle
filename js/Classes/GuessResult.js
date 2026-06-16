export class GuessResult {

    constructor(nameRes, firstReleaseRes, lastReleaseRes, paradigmRes, typingRes, popularityRes, levelRes) {
        this.nameRes = nameRes;
        this.firstReleaseRes = firstReleaseRes;
        this.lastReleaseRes = lastReleaseRes;
        this.paradigmRes = paradigmRes;
        this.typingRes = typingRes;
        this.popularityRes = popularityRes;
        this.levelRes = levelRes;
    }

    getNameRes() {
        return this.nameRes;
    }

    getFirstRes() {
        return this.firstReleaseRes;
    }

    getLastRes() {
        return this.lastReleaseRes;
    }

    getParaRes() {
        return this.paradigmRes;
    }

    getTypeRes() {
        return this.typingRes;
    }

    getPopRes() {
        return this.popularityRes;
    }

    getLvlRes() {
        return this.levelRes;
    }

    isFullyCorrect() {
        return this.nameRes === true;
        //jesli dwa jezyki maja taka sama nazwe, to to ten sam jezyk
    }
}