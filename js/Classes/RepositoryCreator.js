import { Language, Typing, Level, Paradigm } from './Language.js';
import { LanguageRepository } from './LanguageRepository.js';

export class RepositoryCreator {

    #repository;

    constructor(repository) {
        this.#repository = repository;
    }

    async parse() {

        var LINE = "|";
        var NEWLINE = '\n';
        var TICK = ",";

        const mapForCsv = new Map();

        const response = await fetch('./csv/repository.csv');

        if (!response.ok) {
            const msg = `An error has occurred while trying to load the "repository.csv" file : ${response.status}`;
            throw new Error(msg);
        }

        const csvFileToString = await response.text();

        const cleanCsvString = csvFileToString.replace(/\r/g, ''); 

        const csvRows = cleanCsvString.split(NEWLINE);

        const csvHead = csvRows[0].split(LINE);

        csvRows.shift(); //usuwa pierwszy wiersz (naglowki)

        csvRows.forEach(row => {
            if (row == "") {return;}
            let csvLangInfoTemp = row.split(LINE);
            let hint = csvLangInfoTemp[7];
            let temp = row.replace(/["\[\]]/g, ''); // / ... /g, x zamienia ... na x gdzie [abc] oznacza usun a lub usun b lub usun c
            let csvLangInfo = temp.split(LINE);
            // inputField.value.trim().toLowerCase();
            this.#repository.createNewLanguage(
                csvLangInfo[0].trim().toLowerCase(), (csvLangInfo[1].replaceAll(' ', '')).split(TICK), csvLangInfo[2], 
                csvLangInfo[3], parseInt(csvLangInfo[4]),
                parseInt(csvLangInfo[5]), parseInt(csvLangInfo[6]), hint
            )
        });

    }

}