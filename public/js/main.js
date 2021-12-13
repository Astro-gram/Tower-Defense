import Enemy from "./classes/enemy.js";
import { moveEnemies, updateEnemyMap ,getTowerHitboxes, killEnemy } from "./track.js";
import { getTowerMap, changeCoinCount } from "./placeTower.js";
import { getBaseEnemyMap } from "./setup.js";

localStorage.setItem("coinCount", 500000);
document.querySelector(".coinCount").innerHTML = `$${localStorage.getItem("coinCount")}`;

let play = false;

let enemyMap = getBaseEnemyMap();

let playBtn = document.getElementById("play");

playBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (playBtn.getAttribute("operation") === "1") {
        playBtn.src = "../extras/pauseIcon.svg";
        playBtn.setAttribute("operation", "0");
        play = false;
    }

    else {
        playBtn.src = "../extras/playIcon.svg";
        playBtn.setAttribute("operation", "1");
        play = true;
    }
})

function main() {
    if (play) {
        let towers = getTowerMap();

        for (let tower in towers) {
            if (towers[tower] !== null) {
                let hitbox = getTowerHitboxes(tower);

                for (let i = 0; i < hitbox.length; i++) {
                    let enemy = Object.values(enemyMap)[hitbox[i] - 2];

                    if (enemy !== null && enemy !== undefined) { //Check if enemy is in tower hitbox
                        enemy.health -= towers[tower].attackDamage;
                        changeCoinCount(Math.round(towers[tower].attackDamage), 1);
                        console.log(Math.round(towers[tower].attackDamage));

                        console.log(enemy.health)

                        if (enemy.health <= 0) {
                            killEnemy(enemyMap, Object.keys(enemyMap)[hitbox[i] - 2]);
                        }
                    }
                }
            }
        }

        moveEnemies(enemyMap); //Visually move enemy through the track
        updateEnemyMap(enemyMap); //Virtually move enemies within the enemy map
    }

    setTimeout(function () { main() }, 500);
}

let tempEnemy = new Enemy(6);
enemyMap[1] = tempEnemy;

main();