import Enemy from "./classes/enemy.js";
import { moveEnemies, updateEnemyMap ,getTowerHitboxes, killEnemy } from "./track.js";
import { getTowerMap, changeCoinCount } from "./placeTower.js";
import { getBaseEnemyMap } from "./setup.js";

localStorage.setItem("coinCount", 500);
document.querySelector(".coinCount").innerHTML = `$${localStorage.getItem("coinCount")}`;

let playBtn = document.getElementById("play");

let play = false;
let cheatsEnabled = false;
let enemyMap = getBaseEnemyMap();

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

document.addEventListener("keydown", (e) => {
    if (e.key === "`") {
        if (cheatsEnabled) {
            alert("Cheats Have Been Disabled. :(");
            cheatsEnabled = false;
        }
        else {
            cheatsEnabled = true;
            alert("Cheats Have Been Enabled!\n\nPress 1-6 for enemys\nPress 'c' for money\n\nEnjoy!");
        }
    }

    if (cheatsEnabled) {
        if (enemyMap[1] === null) {
            if (e.key === "1") {
                let enemy = new Enemy(1);
                enemyMap[1] = enemy;
            }
            else if (e.key === "2") {
                let enemy = new Enemy(2);
                enemyMap[1] = enemy;
            }
            else if (e.key === "3") {
                let enemy = new Enemy(3);
                enemyMap[1] = enemy;
            }
            else if (e.key === "4") {
                let enemy = new Enemy(4);
                enemyMap[1] = enemy;
            }
            else if (e.key === "5") {
                let enemy = new Enemy(5);
                enemyMap[1] = enemy;
            }
            else if (e.key === "6") {
                let enemy = new Enemy(6);
                enemyMap[1] = enemy;
            }
        }
    
        if (e.key === "c") {
            changeCoinCount(100000, 1);
        }
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
                        towers[tower].attack();
                        changeCoinCount(Math.round(towers[tower].attackDamage / ((enemy.maxTier + 1) - towers[tower].tier)), 1);
                        //console.log(Math.round(towers[tower].attackDamage / ((enemy.maxTier + 1) - towers[tower].tier)));
                        
                        enemy.updateHealthBar(enemy.health);

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

let tempEnemy = new Enemy(1);
enemyMap[1] = tempEnemy;

main();