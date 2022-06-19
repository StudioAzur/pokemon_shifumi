/* La classe Dresseur a un constructeur qui ne prend aucun argument et initialise les variables
d'instance choice et nbPoint à la chaîne vide et 0, respectivement. */
export default class Dresseur{
    constructor(name, color){
        this.name = name;
        this.color = color;
        this.choice = "";
        this.score = 0;
    }
}

const player1 = new Dresseur("Blue", "blue");
const player2 = new Dresseur("Red", "red");