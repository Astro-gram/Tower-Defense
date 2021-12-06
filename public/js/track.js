function moveEnemies() {
    let trackSpotsWithEnemies = [];

    document.querySelectorAll(".game-track").forEach((element) => {
        if (element.childElementCount >= 1) {
            trackSpotsWithEnemies.unshift(element);
        }
    })

    for (let i = 0; i < trackSpotsWithEnemies.length; i++) {
        let trackPos = Number(trackSpotsWithEnemies[i].getAttribute("id").replace(/[^1-90]+/gi, ""));

        if (trackPos !== 32) {
            document.getElementById(`track-${trackPos + 1}`).appendChild(trackSpotsWithEnemies[i].childNodes[0]);
        }
        else {
            trackSpotsWithEnemies[i].childNodes[0].remove();
        }
    }
}

function getTowerHitboxes(tower) {
    let xPos = Number(tower.substr(2, 2));
    let yPos = Number(tower.substr(0, 2).replace(/[\-]+/gi, ""));

    console.log(xPos, yPos)

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
        
    }

    console.log(poses)

    return poses;
}

export { moveEnemies, getTowerHitboxes };