import Dresseur from "./dresseur.js";
/* La classe Game est une classe qui contient une liste de joueurs et une fonction qui renvoie le
joueur actuel. */
export default class Game {
  constructor() {
    this.params = {
      listPlayer: [],
      battleButton: document.querySelector("#battle"),
      choices: document.querySelectorAll(".choice__player"),
      restart: document.querySelector("#restart"),
      elements: ["Feu", "Eau", "Plante"],
    };
    this.player = {
      blue: new Dresseur("Blue", "blue"),
      red: new Dresseur("Red", "red"),
    };
    this.params.listPlayer.push(this.player.blue, this.player.red);
    this.initGame(this.params.listPlayer);
  }

  /**
   * Cette fonction initialise le jeu en obtenant le choix du joueur, en ajoutant un écouteur d'événement
   * au bouton de combat et en affichant le score.
   * @param list - un tableau d'objets
   */
  initGame = (list) => {
    let winner = "";
    this.displayScore();
    this.getChoicePlayer(this.params.choices, list);
    this.params.battleButton.addEventListener("click", () => {
      let choiceIa = this.getRandomInt(this.params.elements.length);
      this.player.red.choice = this.params.elements[choiceIa];
      this.displayChoiceIa(this.player.red.choice);
      this.battle(this.player.blue.choice, this.player.red.choice);

      if (this.player.blue.score == 2 || this.player.red.score == 2) {
        if (this.player.blue.score == 2) {
          winner = this.player.blue.name;
        } else {
          winner = this.player.red.name;
        }
        this.gameOver(winner);
      }
    });
  };

  /**
   * Cette fonction supprime l'image, crée une nouvelle image et enregistre le choix de l'IA.
   * @param choice - le choix de l'IA
   * @param list - la liste des choix
   */
  displayChoiceIa = (choice) => {
    this.removeImg();
    this.createImage(choice);
    console.log(`Choix de l'IA :  ${choice}`);
  };

  /**
   * Il crée un élément d'image, définit son id et src, et l'ajoute à la div avec l'id divIa.
   * @param choice - le choix de l'IA
   */
  createImage = (choice) => {
    let img = document.createElement("img");
    let divIa = document.querySelector("#divIa");
    img.id = "choiceIa";
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
    divIa.appendChild(img);
  };

  /**
   * le joueur perd la partie.
   */
  gameOver = (winner) => {
    let result = document.querySelector("#result");
    result.textContent = `${winner} a gagné !`;
    this.params.battleButton.disabled = "true";
    this.params.restart.style.display = "block";
    this.params.restart.addEventListener("click", this.restart);
  };

  /* Rechargement de la page. */
  restart = () => {
    window.location.reload();
  };

  /* Une fonction qui prend un tableau de choix et ajoute un écouteur d'événement à chaque élément du
  tableau. */
  getChoicePlayer = (choices) => {
    choices.forEach((item) => {
      item.addEventListener("click", (e) => {
        let finalChoice = item.id;
        console.log("Choix du joueur : " + finalChoice);
        this.player.blue.choice = finalChoice;
        this.highlight(finalChoice);
      });
    });
  };

  /* Suppression de la classe de surbrillance de tous les éléments avec la classe de surbrillance et
  ajout de la classe de surbrillance à l'élément avec l'id de finalChoice. */
  highlight = (finalChoice) => {
    let highlight = document.querySelectorAll(".highlight");
    highlight.forEach((element) => {
      element.classList.remove("highlight");
    });
    document.getElementById(finalChoice).classList.add("highlight");
  };
  /**
   * Il supprime l'image de la div avec l'id de "divIa".
   */
  removeImg = () => {
    let img = document.querySelector("#divIa");
    img.innerHTML = "";
  };

  /* Une fonction qui compare le choix du joueur et le choix de l'IA. */
  battle = () => {
    let result = document.querySelector("#result");
    let textResult;
    if (this.player.blue.choice == this.player.red.choice) {
      result.textContent = "Egalité";
    } else if (
      (this.player.blue.choice === "Feu" &&
        this.player.red.choice === "Plante") ||
      (this.player.blue.choice === "Eau" && this.player.red.choice === "Feu") ||
      (this.player.blue.choice === "Plante" && this.player.red.choice === "Eau")
    ) {
      textResult = "Vous avez gagné !!";
      result.textContent = textResult;
      this.player.blue.score++;
    } else {
      result.textContent = "Vous avez perdu !";
      this.player.red.score++;
    }
    this.displayScore();
  };

  /**
   * Il prend une liste d'objets, puis il définit le textContent de deux éléments sur les valeurs de deux
   * propriétés de deux objets de la liste.
   * @param list - nbPoint
   */
  displayScore = () => {
    let blue = document.querySelector("#score_blue");
    let red = document.querySelector("#score_red");
    blue.textContent = this.player.blue.score;
    red.textContent = this.player.red.score;
  };

  /**
   * Il renvoie un entier aléatoire entre 0 et le nombre passé.
   * @param max - Le nombre maximum que vous souhaitez générer.
   * @returns Une fonction qui prend un paramètre et renvoie un nombre aléatoire entre 0 et le paramètre.
   */
  getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  };
}
