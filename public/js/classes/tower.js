export default class Tower {
    constructor(spotId, towerCost, tier = 1) {
        this.spotId = spotId;
        this.tier = tier;
        this.towerCost = towerCost;
        this.attackDamage = Math.round((((2 * this.tier) * this.towerCost) / 1.5));
    }

    upgradeTower(coinCount) {
        if (coinCount >= (2 * this.tier * this.towerCost)) {
            if (5 > this.tier) {
                this.tier++;
                this.attackDamage = Math.round((((2 * this.tier) * this.towerCost) / 1.5));
                console.log(this.attackDamage)

                return {
                    success: true
                };
            }
            else {
                return {
                    success: false,
                    errorCode: 2
                }
            }
            
        }
        else {
            return {
                success: false,
                errorCode: 1
            }
        }
    }

    attack() {
        console.log(`attacked and did: ${this.attackDamage} damage!`);
    }

    stats() {
        return {
            tier: this.tier,
            attackDamage: this.attackDamage,
            upgradeCost: {
                tier1: ((2 * 1) * this.towerCost),
                tier2: ((2 * 2) * this.towerCost),
                tier3: ((2 * 3) * this.towerCost),
                tier4: ((2 * 4) * this.towerCost),
                tier5: ((2 * 5) * this.towerCost)
            }
        }
    }
}