export default class Enemy {
    constructor(tier, startPosition = 1) {
        this.startPosition = startPosition;
        this.tier = tier;
        this.health = this.#setHealth();
        this.#spawn();
    }

    #setHealth() {
        if (this.tier === 1) {
            return 500;
        }
        else if (this.tier === 2) {
            return 1200;
        }
        else if (this.tier === 3) {
            return 5000;
        }
        else if (this.tier === 4) {
            return 8000;
        }
        else if (this.tier === 5) {
            return 15000;
        }
        else if (this.tier === 6) {
            return 1000000;
        }
        else {
            return Infinity;
        }
    }

    #spawn() {
        let enemy = document.createElement("div");
        enemy.classList.add("enemy-base", `enemy-${this.tier}`);
        document.getElementById(`track-${this.startPosition}`).appendChild(enemy);
    }
}