function moveEnemies(enemyMap) {
    for (let i = 1; i < Object.keys(enemyMap).length + 1; i++) {
        if (enemyMap[i] !== null) {
            if (i !== 32) {
                document.getElementById(`track-${i + 1}`).appendChild(document.getElementById(`track-${i}`).childNodes[0]);
            }
            else {
                document.getElementById(`track-${i}`).childNodes[0].remove();
            }
        }
    }
}

function updateEnemyMap(enemyMap) {
    for (let i = Object.keys(enemyMap).length; i > 0; i--) {
        if (enemyMap[i] !== null) {
            if (i !== 32) {
                enemyMap[i + 1] = enemyMap[i];
                enemyMap[i] = null;
            }
            else {
                enemyMap[i] = null;
            }
        }
    }
}

function killEnemy(enemyMap, position) {
    enemyMap[position] = null;
    document.getElementById(`track-${position}`).childNodes[0].remove();
}

function getTowerHitboxes(tower) {
    let xPos = Number(tower.substr(2, 2));
    let yPos = Number(tower.substr(0, 2).replace(/[\-]+/gi, ""));

    let poses = [];

    if (yPos === 2) {
        let underxPos = 22 - xPos; //For getting boxes under the tower

        //First Row
        if (xPos > 1 && xPos !== 9) {
            poses.push(xPos - 1, xPos, xPos + 1);
            poses.push(underxPos - 1, underxPos, underxPos + 1);
        }
    
        else if (xPos === 1) {
            poses.push(xPos, xPos + 1);
            poses.push(underxPos - 1, underxPos);
        }

        else if (xPos === 9) {
            poses.push(xPos, xPos + 1);
            poses.push(underxPos - 1, underxPos);
            poses.push(underxPos - 2);
        }
    }
    else {
        let overxPos = xPos + 2;
        let underxPos = 32 - xPos + 10;

        if (xPos > 10 && xPos !== 18) {
            poses.push(overxPos + 1, overxPos, overxPos - 1);
            poses.push(underxPos + 1, underxPos, underxPos - 1);
        }

        else if (xPos === 10) {
            poses.push(overxPos, overxPos + 1);
            poses.push(underxPos, underxPos - 1);
        }

        else if (xPos === 18) {
            poses.push(overxPos + 1, overxPos);
            poses.push(underxPos, underxPos - 1);
            poses.push(underxPos - 2);

        }
    }

    return poses;
}

export { moveEnemies, updateEnemyMap, getTowerHitboxes, killEnemy };