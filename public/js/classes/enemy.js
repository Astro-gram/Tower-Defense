export default class Enemy {
    constructor(tier) {
        this.tier = tier;
        this.health = this.#setHealth();
    }

    #setHealth() {
        if (this.tier === 1) {
            return 500;
        }
        else if (this.tier === 2) {
            return 4500;
        }
        else if (this.tier === 3) {
            return 15500;
        }
        else if (this.tier === 4) {
            return 32500;
        }
        else if (this.tier === 5) {
            return 100000;
        }
        else {
            return null;
        }
    }
}