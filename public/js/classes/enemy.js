export default class Enemy {
    constructor(tier, startPosition = 1) {
        this.startPosition = startPosition;
        this.tier = tier;
        this.maxTier = 6;
        this.health = this.#setHealth();
        this.self = this.#spawn();
        this.previousHealth = 100;
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

        let healthBar = document.createElement("div");
        healthBar.classList.add("health-bar");

        let progress = document.createElement("div");
        progress.classList.add("health-bar__progress");
        progress.style.width = "100%";

        healthBar.appendChild(progress);
        enemy.appendChild(healthBar);

        enemy.classList.add("enemy-base", `enemy-${this.tier}`);
        document.getElementById(`track-${this.startPosition}`).appendChild(enemy);

        return enemy;
    }

    updateHealthBar(health) {
        let i = 0;

        let healthPercentage = (((health - 1) * (100 - 1)) / (this.#setHealth() - 1)) + 1;

        if (i == 0) {
            i = 1;
            let elem = this.self.childNodes[0].childNodes[0];
            let width = elem.style.width.replace(/[%]+/gi, "");
            let id = setInterval(function() {
                if (width <= healthPercentage) {
                    clearInterval(id);
                    i = 0;
                } 
                else {
                    width--;
                    elem.style.width = width + "%";
                }
            }, 5);
        }
    }
}