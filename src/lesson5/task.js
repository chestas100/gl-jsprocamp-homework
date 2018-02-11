/* eslint-disable no-use-before-define */

const GameCharacter = function GameCharacter(charClass) {
  this.charClass = charClass.charAt(0).toUpperCase() + charClass.slice(1).toLowerCase();

  this.getCharInitData = function getCharInitData(type) {
    const data = {
      warrior: {
        life: 30,
        damage: 4,
      },
      rogue: {
        life: 25,
        damage: 3,
      },
      sorcerer: {
        life: 20,
        damage: 5,
      },
      zombie: {
        life: 8,
        damage: 4,
      },
      skeleton: {
        life: 10,
        damage: 6,
      },
      holem: {
        life: 15,
        damage: 6,
      },
    };
    const charToSend = data[this.charClass.toLowerCase()];
    if (charToSend) {
      return charToSend[type];
    }
    throw new Error('Incorrect character class provided');
  };

  this.life = this.getCharInitData('life');
  this.damage = this.getCharInitData('damage');

  this.getName = function getName() {
    if (this.name) {
      return this.name;
    }
    return `I am ${this.charClass} I don\`t have name`;
  };

  this.getCharClass = function getCharClass() {
    return this.charClass;
  };

  this.attack = function attack(target) {
    const attackerRole = this instanceof Hero ? 'Hero' : 'Monster';
    const targetRole = target instanceof Hero ? 'Hero' : 'Monster';

    if (attackerRole !== targetRole) {
      target.life -= this.damage;
      if (target.life <= 0) {
        target.life = 0;
        return `${attackerRole} attacked, ${target.charClass} killed`;
      }
      return `${attackerRole} attacked, done ${this.damage} damage to ${target.charClass}`;
    }
    return `I will attack only ${attackerRole === 'Hero' ? 'monsters' : 'Hero'}`;
  };
};

const Game = function Game() {
  this.status = 'Idle';
  this.hero = undefined;
  this.monsters = [];

  this.beginJourney = function beginJourney() {
    if (this.hero && this.monsters.length === 2) {
      this.status = 'In progress';
      return 'Your journey has started, fight monsters';
    }
    throw new Error('Cannot start journey, populate the world with hero and monsters first');
  };

  this.finishJourney = function finishJourney() {
    if (this.hero.life === 0) {
      this.status = 'Finished';
      return 'The Game is finished. Hero is dead :(';
    } else if (this.monsters[0].life === 0 && this.monsters[1].life === 0) {
      this.status = 'Finished';
      return 'The Game is finished. Monsters are dead. Congratulations';
    }
    return 'Don`t stop. Some monsters are still alive. Kill`em all';
  };

  this.addHero = function addHero(hero) {
    if (!this.hero) {
      if (hero instanceof Hero) {
        this.hero = hero;
        return `Hero created, welcome ${this.hero.getName()}`;
      }
      throw new Error('Only hero instance can be hero');
    }
    throw new Error('Only one hero can exist');
  };

  this.addMonster = function addMonster(monster) {
    if (this.monsters.length < 2) {
      if (monster instanceof Monster) {
        this.monsters.push(monster);
        return `Monster Created, ${monster.charClass} appeared in the world`;
      }
      throw new Error('Only monster Instances can become monsters');
    }
    throw new Error('Only 2 monsters can exist');
  };

  this.fight = function fight() {
    if (this.status !== 'In progress') {
      throw new Error('Begin your journey to start fighting monsters');
    }
    const currentMonster = this.monsters[0].life > 0 ? 0 : 1;
    for (let i = 1; ; i += 1) {
      if (i % 2 === 0) {
        this.monsters[currentMonster].attack(this.hero);
        if (this.hero.life === 0) {
          return 'Monsters win';
        }
      } else {
        this.hero.attack(this.monsters[currentMonster]);
        if (this.monsters[currentMonster].life === 0) {
          return 'Hero win';
        }
      }
    }
  };
};

const Hero = function Hero(name, charClass) {
  if (!name && !charClass) {
    throw new Error('Incorrect character class provided');
  }
  GameCharacter.call(this, charClass);
  this.name = name;
};
Hero.prototype = Object.create(GameCharacter.prototype);
Hero.prototype.constructor = Hero;

const Monster = function Monster(charClass) {
  if (!charClass) {
    throw new Error('Incorrect character class provided');
  }
  GameCharacter.call(this, charClass);
};
Monster.prototype = Object.create(GameCharacter.prototype);
Monster.prototype.constructor = Monster;

/* Game Population mechanism should go below */

/* End of your solution for Game Population mechanism */

export default {
  Game,
  Hero,
  Monster,
};
