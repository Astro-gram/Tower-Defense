export default class Tower {
    constructor(spotId, towerCost, tier = 1) {
        this.spotId = spotId;
        this.tier = tier;
        this.towerCost = towerCost;
        this.maxTiers = 5;
    }

    upgrade(coinCount) {
        if (coinCount >= (2 * this.tier) * this.towerCost && this.maxTiers >= this.tier) {
            this.tier++;
            console.log(`Spot: ${this.spotId} Leveled up to ${this.tier}!`)
        }
    }

    attack() {
        console.log(`attacked and did: ${(2 ^ tier) * this.towerCost} damage!`);
    }

    stats() {
        return {
            tier: this.tier,
            attackDamage: ((2 * this.tier) * this.towerCost),
            damagesAndUpgrades: {
                tier1: ((2 * 1) * this.towerCost),
                tier2: ((2 * 2) * this.towerCost),
                tier3: ((2 * 3) * this.towerCost),
                tier4: ((2 * 4) * this.towerCost),
                tier5: ((2 * 5) * this.towerCost)
            }
        }
    }
}