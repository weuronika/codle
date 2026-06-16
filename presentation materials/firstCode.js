//Zadanie 1:
/*Stwórz klasę Vehicle, która przyjmuje w konstruktorze brand (markę) i ustawia ją.
Dodaj metodę startEngine(), która zwraca string: "Silnik [marka] został uruchomiony!".*/

class Vehicle {
    constructor(brand) {
        this.brand = brand;
    }

    startEngine() {
        //return "auto marki " + this.brand + " robi Wrum";
        return `auto marki ${this.brand} robi Wrum`;
    }
}

/*
Zadanie 2:
Stwórz klasę Car, która dziedziczy po Vehicle.
Konstruktor Car powinien przyjmować brand oraz nową zmienną 
– prywatne pole #fuelLevel (poziom paliwa) z wartością początkową podaną w argumencie.
Nadpisz metodę startEngine().
 Jeśli #fuelLevel jest większe od 0, 
 zmniejsz paliwo o 1 i wywołaj oryginalne zachowanie startEngine() z klasy rodzica. 
 Jeśli paliwo wynosi 0, zwróć "Brak paliwa!". 
*/

class Car extends Vehicle {

    #fuelLevel //prywatna zmienna

    constructor(brand, fuelLevel) {
        super(brand); //robi to co ta klasa, po której dziedziczy
        this.#fuelLevel = fuelLevel;
    }

    startEngine() {

        if (this.#fuelLevel > 0) {
            this.#fuelLevel--;
            return super.startEngine();
        }
        
        else {
            return "No fuel!"
        }
    }
}

const mojeAuto = new Car("Mini Cooper", 5);

for (let i=0; i<6; i++) {
    console.log(mojeAuto.startEngine());
}

let array1 = [1,2,3,4,5];

let array2 = [];

for (let i=0; i<=5; i++) {
    array2.push(i);
}

if (array1.every(p => array2.includes(p))) {
    console.log("jej");
}

const newMap = new Map();
newMap.set(1, 3);
newMap.set(2, 6);
newMap.set(3, 9);

const newArr = [];

for (let i=0; i<=5; i++) {
    newArr.push(i);
}

//const arrToString = Object.fromEntries(newArr);
const mapToString = Object.fromEntries(newMap);

console.log(mapToString);
console.log(newArr);