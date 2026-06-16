export class Player {

    constructor() {
        this.gamesPlayed = parseInt(localStorage.getItem("gamesPlayed"));
        this.gamesWon = parseInt(localStorage.getItem("gamesWon"));
    }

    startDailyGame() {
        //na stronie glownej bedzie przycisk play - po wkliknieciu odpali sie gra
        return "not implemented!"
    }

}