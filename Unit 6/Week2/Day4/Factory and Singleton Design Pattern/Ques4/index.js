class Character {
    constructor(name) {
        this.name = name;
    }

    getStats() {
        throw new Error("Method 'getStats()' must be implemented.");
    }
}

class Warrior extends Character {
    constructor(name) {
        super(name);
        this.strength = 90;
        this.agility = 50;
    }

    getStats() {
        return `Warrior ${this.name} - Strength: ${this.strength}, Agility: ${this.agility}`;
    }
}

class Archer extends Character {
    constructor(name) {
        super(name);
        this.agility = 80;
        this.strength = 40;
    }

    getStats() {
        return `Archer ${this.name} - Agility: ${this.agility}, Strength: ${this.strength}`;
    }
}

class Mage extends Character {
    constructor(name) {
        super(name);
        this.intelligence = 90;
        this.mana = 100;
    }

    getStats() {
        return `Mage ${this.name} - Intelligence: ${this.intelligence}, Mana: ${this.mana}`;
    }
}

class CharacterFactory {
    static createCharacter(type, name) {
        switch (type) {
            case "Warrior":
                return new Warrior(name);
            case "Archer":
                return new Archer(name);
            case "Mage":
                return new Mage(name);
            default:
                throw new Error("Unknown character type");
        }
    }
}

const archer = CharacterFactory.createCharacter("Archer", "Eldrin");
console.log(archer.getStats());

const mage = CharacterFactory.createCharacter("Mage", "Gandalf");
console.log(mage.getStats());
