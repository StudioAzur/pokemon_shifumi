import Dresseur from "./dresseur.js";
/* La classe Game est une classe qui contient une liste de joueurs et une fonction qui renvoie le
joueur actuel. */
export default class Game {
    constructor() {
        this.listPlayer = [];
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

let battleButton = document.querySelector("#battle");
const choices = document.querySelectorAll(".choice__player");
let restart = document.querySelector("#restart");

restart.addEventListener("click", () => {
    location.reload();
});

/**
 * Cette fonction supprime l'image, crée une nouvelle image et enregistre le choix de l'IA.
 * @param choice - le choix de l'IA
 * @param list - la liste des choix
 */
const displayChoiceIa = (choice) => {
    removeImg();
    createImage(choice);
    console.log(`Choix de l'IA :  ${choice}`);
};

/**
 * Il crée un élément d'image, définit son id et src, et l'ajoute à la div avec l'id divIa.
 * @param choice - le choix de l'IA
 */
const createImage = (choice) => {
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
 * Cette fonction initialise le jeu en obtenant le choix du joueur, en ajoutant un écouteur d'événement
 * au bouton de combat et en affichant le score.
 * @param list - un tableau d'objets
 */
const initGame = (list) => {
    const elements = ["Feu", "Eau", "Plante"];
    getChoicePlayer(choices, list);
    battleButton.addEventListener("click", () => {
        let choiceIa = getRandomInt(elements.length);
        let choicePlayer2;
        choicePlayer2 = list[1].choice = elements[choiceIa];
        displayChoiceIa(choicePlayer2);
        battle(list[0].choice, list[1].choice, list);

        if (list[0].nbPoint == 2 || list[1].nbPoint == 2) {
            let winner;
            if (list[0].nbPoint == 2) {
                winner = "Blue";
            } else {
                winner = "Red";
            }
            gameOver(winner);
        }
        displayScore(list);
    });
};

/**
 * le joueur perd la partie.
 */
const gameOver = (winner) => {
    let result = document.querySelector("#result");
    result.textContent = `${winner} a gagné !`;
    battleButton.disabled = "true";
    restart.style.visibility = "visible";
};

/**
 * Il ajoute un écouteur d'événement à chacun des trois choix, et lorsque l'un d'eux est cliqué, il
 * supprime la classe de surbrillance de tous les choix et l'ajoute à celui qui a été cliqué.
 * @param choices - la liste des choix (pierre, papier, ciseaux)
 * @param list - un tableau contenant le choix du joueur et le choix de l'ordinateur
 */
const getChoicePlayer = (choices, list) => {
    choices.forEach((item) => {
        item.addEventListener("click", (e) => {
            let finalChoice = item.id;
            console.log("Choix du joueur : " + finalChoice);
            list[0].choice = finalChoice;
            let highlight = document.querySelectorAll(".highlight");
            highlight.forEach((element) => {
                element.classList.remove("highlight");
            });
            document.getElementById(finalChoice).classList.add("highlight");
        });
    });
};

/**
 * Il supprime l'image de la div avec l'id de "divIa".
 */
const removeImg = () => {
    let img = document.querySelector("#divIa");
    img.innerHTML = "";
};

/**
 * La fonction prend trois arguments, dont deux sont des chaînes et le troisième est un tableau. La
 * fonction compare les deux chaînes et si elles sont égales, elle définit le textContent de l'élément
 * avec l'id de "result" sur "Egalité". Si les chaînes ne sont pas égales, il les compare à un ensemble
 * de trois conditions et si l'une de ces conditions est remplie, il définit le textContent de
 * l'élément avec l'id de "result" sur "Vous avez gagné !!" et incrémente de un la propriété nbPoint du
 * premier objet du tableau. Si aucune des conditions n'est remplie, il définit le textContent de
 * l'élément avec l'id de "result" sur "Vous avez perdu !" et incrémente de un la propriété nbPoint du
 * deuxième objet du tableau.
 * @param player1 - le choix du joueur
 * @param player2 - "Plante"
 * @param list - [{
 */
const battle = (player1, player2, list) => {
    let result = document.querySelector("#result");
    let textResult;
    if (player1 == player2) {
        result.textContent = "Egalité";
    } else if (
        (player1 === "Feu" && player2 === "Plante") ||
        (player1 === "Eau" && player2 === "Feu") ||
        (player1 === "Plante" && player2 === "Eau")
    ) {
        textResult = "Vous avez gagné !!";
        result.textContent = textResult;
        list[0].nbPoint++;
    } else {
        result.textContent = "Vous avez perdu !";
        list[1].nbPoint++;
    }
};

/**
 * Il prend une liste d'objets, puis il définit le textContent de deux éléments sur les valeurs de deux
 * propriétés de deux objets de la liste.
 * @param list - nbPoint
 */
const displayScore = (list) => {
    let blue = document.querySelector("#score_blue");
    let red = document.querySelector("#score_red");
    red.textContent = list[1].nbPoint;
    blue.textContent = list[0].nbPoint;
};

/**
 * Il renvoie un entier aléatoire entre 0 et le nombre passé.
 * @param max - Le nombre maximum que vous souhaitez générer.
 * @returns Une fonction qui prend un paramètre et renvoie un nombre aléatoire entre 0 et le paramètre.
 */
const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
};
