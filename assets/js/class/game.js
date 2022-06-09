import Dresseur from "./dresseur.js";
export default class Game {
  constructor() {
    this.listPlayer = [];
    this.turnPlayer = 0;
    const player1 = new Dresseur({
      name: "Blue",
      color: "blue",
    });
    const player2 = new Dresseur({
      name: "Red",
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


const displayChoiceIa = (choice, list) => {
  console.log(`Choix de l'IA :  ${choice}`);
  let divIa = document.createElement("div");
  divIa.id = "divIa";
  let img = document.createElement("img");

  switch (choice) {
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
};

const initGame = (list) => {
  let choiceIa = getRandomInt(list[1].choice.length);
  let choicePlayer2 = (list[1].choice = list[1].choice[choiceIa]);
  displayChoiceIa(choicePlayer2, list);
  getChoicePlayer(choices, list);

  battleButton.addEventListener("click", ()=>{
    battle(list[0].choice, list[1].choice, list);
})
  
};



const getChoicePlayer = (choices, list) => {
  choices.forEach((item) => {
    item.addEventListener("click", (e) => {
      let finalChoice = item.id;
      console.log("Choix du joueur : " + finalChoice);
      list[0].choice = finalChoice;
      document.getElementById(finalChoice).classList.add("highlight");
    });
  });
};

const removeColor = () => {};

const battle = (player1, player2, list) => {
    if(player1 == player2){
        console.log("égalité");
    }

};




const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};


