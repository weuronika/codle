
import { Language, Typing, Level, Paradigm } from './Classes/Language.js';
import { Player } from './Classes/Player.js';
import { LanguageRepository } from  './Classes/LanguageRepository.js'
import { DailyGame } from './Classes/DailyGame.js';
import { Guess } from './Classes/Guess.js';
import { GuessAnalyzer } from './Classes/GuessAnalyzer.js';
import { GuessResult } from './Classes/GuessResult.js';
import { RepositoryCreator } from './Classes/RepositoryCreator.js';

const inputField = document.getElementById('searchInput');
const searchButton = document.getElementById('searchBtn');
const resultDisplay = document.getElementById('result');

const modal = document.getElementById('popupVictory');
const returnButton = document.getElementById('backToHome');
const restartButton = document.getElementById('restartBtn');
restartButton.addEventListener('click', () => {
    location.reload();
});

const hintButton = document.getElementById('hintBtn');
const hintText = document.getElementById('hintTxt');
const hintContainer = document.getElementById('hint-container');
let isHintShowed = false;
hintButton.addEventListener("click", addHint);

searchButton.addEventListener("click", performSearch);

inputField.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        performSearch();
    }
});

const nameBox = "Name";
const typingBox = "Typing";
const levelBox = "Level";
const firstRelBox = "First Release";
const lastRelBox = "Last Release";
const popularityBox = "Popularity";
const paradigmBox = "Paradigms";

const REPO = new LanguageRepository();

const RepoCreator = new RepositoryCreator(REPO);
await RepoCreator.parse(); //musi być await zeby RepositoryCreator skonczylo dzialac

const mapForResult = new Map();

mapForResult.set(true, 'box-success');
mapForResult.set(0, 'box-success');

// oznaczenia dla pól opisywanych przez liczby (np. Popularity)
mapForResult.set(1, 'box-partial-arr-up');
mapForResult.set(-1, 'box-partial-arr-down');

mapForResult.set(2, 'box-partial');
mapForResult.set(-2, 'box-wrong');

mapForResult.set(false, 'box-wrong');

const target = REPO.getRandomLanguage();
const analyzer = new GuessAnalyzer(target)
const gra = new DailyGame(REPO, target, analyzer);

hintText.textContent = "Unlocks in #" + gra.getLeftTries();

const guessList = [];

const guessListNames = [];

let firstGuess = false;

function performSearch() {

            const query = inputField.value.trim().toLowerCase(); 

            const boxes = [nameBox, typingBox, levelBox, firstRelBox, lastRelBox, popularityBox, paradigmBox];

            let findQuery = REPO.getLanguageByName(query);
            
            if (findQuery != undefined) {



                resultDisplay.textContent = "";

                let guessResult = gra.submitGuess(findQuery, query);

                if (guessResult === 0) {
                    resultDisplay.textContent = "You already guessed this one!";
                    return;
                }

                let leftTries = gra.getLeftTries();
                
                if (leftTries > 0) {
                    hintText.textContent = "Unlocks in #" + leftTries;
                }

                else {
                    hintText.textContent = "Unlocked!"
                }


                if (guessResult.isFullyCorrect()) {
                    resultDisplay.textContent = "Correct! You won!";
                    const victoryAttemptsText = document.getElementById('victoryAttempts');
                    victoryAttemptsText.textContent = `You guessed the language on your ${gra.getSubmittedTries()}. try!`;
                    modal.showModal();
                }


                const newRow = document.createElement('div');
                newRow.classList.add('row');

                const boxesMap = new Map();

                boxesMap.set(nameBox, { res : guessResult.getNameRes(), text : findQuery.getName()});
                boxesMap.set(typingBox, { res : guessResult.getTypeRes(), text : findQuery.getTyping() });
                boxesMap.set(levelBox, { res : guessResult.getLvlRes(), text : findQuery.getLevel() });
                boxesMap.set(firstRelBox, { res : guessResult.getFirstRes(), text : findQuery.getFirstRelease() });
                boxesMap.set(lastRelBox, { res : guessResult.getLastRes(), text : findQuery.getLastRelease() });
                boxesMap.set(popularityBox, { res : guessResult.getPopRes(), text : findQuery.getPopularity() });
                boxesMap.set(paradigmBox, { res : guessResult.getParaRes(), text : findQuery.getParadigm() });

                

                boxes.forEach(box => {

                    const column = document.createElement('div');
                    column.classList.add('column');

                    
                    if (!firstGuess) {
                        const label = document.createElement('label');
                        label.classList.add('box-label');
                        label.textContent = box;
                        const labels = document.getElementById('labels');
                        labels.appendChild(label);
                    }
                    //column.appendChild(label);
                    

                    const newBox = document.createElement('div');
                    newBox.classList.add('box');

                    let boxType = mapForResult.get(boxesMap.get(box).res);
                    newBox.classList.add(boxType);
                    let optArrow = '';

                    if (boxType === 'box-partial-arr-up') {
                        optArrow = '⬆️';
                    }

                    if (boxType === 'box-partial-arr-down') {
                        optArrow = '⬇️';
                    }

                    let temp = boxesMap.get(box).text;
                    let textField = temp;


                    if (textField instanceof Array) {
                        textField = temp.join(',\n');
                    }

                    newBox.textContent = (textField) + optArrow;

                    column.appendChild(newBox);
                    newRow.appendChild(column);
                });

                firstGuess = true;

                const container = document.getElementById('dynamicList');
                container.prepend(newRow);
                

            }

            else {
                resultDisplay.textContent = "There is no such language!";
            }
}

function addHint() {
    if (hintText.textContent == "Unlocked!" && !isHintShowed) {
        isHintShowed = true;
        const newHint = document.createElement('div');
        newHint.classList.add('hint');
        newHint.textContent = target.getHint();
        hintContainer.appendChild(newHint);
    }
}



