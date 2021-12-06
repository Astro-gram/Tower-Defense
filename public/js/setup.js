export default function getBaseTowerMap() {
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