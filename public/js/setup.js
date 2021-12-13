function getBaseTowerMap() {
    let towerMap = {};
    let firstTimeThrough = true;

    for (let x = 2; x <= 4; x += 2) {
        if (firstTimeThrough) {
            for (let y = 1; y <= 9; y++) {
                towerMap[x.toString() + "-" + y.toString()] = null;
            }
        }
        else {
            for (let y = 2; y <= 10; y++) {
                towerMap[x.toString() + "-" + y.toString()] = null;
            }
        }

        firstTimeThrough = false;
    }

    return towerMap;
}

function getBaseEnemyMap() {
    let enemyMap = {};
    let trackLength = 32;

    for (let i = 1; i < trackLength + 1; i++) {
        enemyMap[i] = null;
    }

    return enemyMap;
}

export { getBaseTowerMap, getBaseEnemyMap };