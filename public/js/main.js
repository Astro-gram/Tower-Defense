import Enemy from "./classes/enemy.js";
import { moveEnemies, getTowerHitboxes } from "./track.js";
import { getTowerMap } from "./placeTower.js";

localStorage.setItem("coinCount", 1000000000000);
document.querySelector(".coinCount").innerHTML = `$${localStorage.getItem("coinCount")}`;

function main() {
    moveEnemies();
    let towers = getTowerMap();

    for (let tower in towers) {
        if (towers[tower] !== null) {
            getTowerHitboxes(tower);
            console.log(towers[tower].stats())
        }
    }

    setTimeout(function() { main() }, 1000);
}

main();