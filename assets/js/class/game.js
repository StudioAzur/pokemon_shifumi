import Dresseur from "./dresseur.js";
export default class Game {
    constructor() {
        this.listPlayer = [];
        this.turnPlayer = 0;
        const player1 = new Dresseur({
            name: "Player1",
            color: "blue",
        });
        const player2 = new Dresseur({
            name: "IA",
            color: "red",
        });
        this.listPlayer.push(player1, player2);
        initGame(this.listPlayer);
        
        const getCurrentTurnPlayer = () => {
            return this.listPlayer[this.turnPlayer];
        };
        
    }
    
}

const body = document.querySelector("body"); 
let container = document.querySelector("#container");
let battleButton = document.querySelector("#battle");
const choices = document.querySelectorAll(".choice__player");
const displayChoiceIa = (choice)=>{
    console.log(choice);
    let divIa = document.createElement("div");
    divIa.id = "divIa";
    let img = document.createElement("img");

    switch(choice){
        case "Feu": 
        img.src = "./assets/img/salameche.png";
        break;
        case "Eau": 
        img.src = "./assets/img/carapuce.png";
        break;
        case "Plante": 
        img.src = "./assets//img/bulbizarre.png";
        break;
    }
    battleButton.after(divIa);
    divIa.appendChild(img);
}

const initGame = (list) => {
    console.log(list);
    let choiceIa = getRandomInt(list[1].choice.length);
    let choicePlayer = list[1].choice = list[1].choice[choiceIa]; 
    displayChoiceIa(choicePlayer);
    getChoicePlayer(choices, list);
}


const getChoicePlayer = (choices, list) => {
     choices.forEach(item => {
         item.addEventListener("click", () =>{
             list[0].choice = item.id;
         })
     });
} 

const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
}






