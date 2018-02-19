/* eslint-disable no-use-before-define, linebreak-style, no-mixed-operators */
// helper. May be useful when need to select random monster, if you need it
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);
}

const GameCharacter = function GameCharacter(charClass) {
  this.charClass = charClass.charAt(0).toUpperCase() + charClass.slice(1).toLowerCase();
  this.life = this.getCharInitData('life');
  this.damage = this.getCharInitData('damage');
};

GameCharacter.prototype.getCharInitData = function getCharInitData(type) {
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
  return 'Incorrect character class provided';
};

GameCharacter.prototype.getCharClass = function getCharClass() {
  return this.charClass;
};

GameCharacter.prototype.attack = function attack(target) {
  const attackerRole = this instanceof Hero ? 'Hero' : 'Monster';
  const targetRole = target instanceof Hero ? 'Hero' : 'Monster';

  if (attackerRole !== targetRole) {
    target.life -= this.damage;
    if (target.life <= 0) {
      target.life = 0;
      return addLogMsg(`${attackerRole} attacked, ${target.charClass} killed`);
    }
    return addLogMsg(`${attackerRole} attacked, done ${this.damage} damage to ${target.charClass}`);
  }
  return addLogMsg(`I will attack only ${attackerRole === 'Hero' ? 'monsters' : 'Hero'}`);
};

const Game = function Game() {
  this.status = 'Idle';
  this.hero = undefined;
  this.monsters = [];
};

Game.prototype.beginJourney = function beginJourney() {
  if (this.hero && this.monsters.length === 2) {
    this.status = 'In progress';
    return 'Your journey has started, fight monsters';
  }
  return 'Cannot start journey, populate the world with hero and monsters first';
};

Game.prototype.finishJourney = function finishJourney() {
  if (this.hero.life === 0) {
    this.status = 'Finished';
    return 'The Game is finished. Hero is dead :(';
  } else if (this.monsters[0].life === 0 && this.monsters[1].life === 0) {
    this.status = 'Finished';
    return 'The Game is finished. Monsters are dead. Congratulations';
  }
  return 'Don`t stop. Some monsters are still alive. Kill`em all';
};

Game.prototype.addHero = function addHero(hero) {
  if (!this.hero) {
    if (hero instanceof Hero) {
      this.hero = hero;
      return `Hero created, welcome ${this.hero.getName()}`;
    }
    return 'Only hero instance can be hero';
  }
  return 'Only one hero can exist';
};

Game.prototype.addMonster = function addMonster(monster) {
  if (this.monsters.length < 2) {
    if (monster instanceof Monster) {
      this.monsters.push(monster);
      return `Monster Created, ${monster.charClass} appeared in the world`;
    }
    return 'Only monster Instances can become monsters';
  }
  return 'Only 2 monsters can exist';
};

Game.prototype.fight = function fight() {
  if (this.status !== 'In progress') {
    return 'Begin your journey to start fighting monsters';
  }
  const currentMonster = this.monsters[0].life > 0 ? 0 : 1;
  if (this.monsters[currentMonster].life === 0) {
    return 'No more monsters to fight. It\'s time to finish game';
  } else if (this.hero.life === 0) {
    return 'Hero is died. It\'s time to finish game';
  }
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

const Hero = function Hero(name, charClass) {
  if (!name && !charClass) {
    return 'Incorrect character class provided';
  }
  GameCharacter.call(this, charClass);
  this.name = name;
};
Hero.prototype = Object.create(GameCharacter.prototype);
Hero.prototype.constructor = Hero;
Hero.prototype.getName = function getName() {
  return this.name;
};

const Monster = function Monster(charClass) {
  if (!charClass) {
    return 'Incorrect character class provided';
  }
  GameCharacter.call(this, charClass);
};
Monster.prototype = Object.create(GameCharacter.prototype);
Monster.prototype.constructor = Monster;
Monster.prototype.getName = function getName() {
  return `I am ${this.charClass} I don\`t have name`;
};

/* Game Population mechanism should go below */
/* eslint-disable no-undef */
const logWrap = document.getElementsByClassName('log')[0];

const startGameButton = document.getElementsByClassName('startGame')[0];
const addHeroButton = document.getElementsByClassName('addHero')[0];
const addMonsterButton = document.getElementsByClassName('addMonster')[0];
const fightButton = document.getElementsByClassName('fight')[0];
const finishGameButton = document.getElementsByClassName('finishGame')[0];
const resetButton = document.getElementsByClassName('reset')[0];
const randomButton = document.getElementsByClassName('random')[0];

const heroSelect = document.getElementsByClassName('heroSelect')[0];
const heroName = document.getElementsByClassName('heroName')[0];
const monsterSelect = document.getElementsByClassName('monsterSelect')[0];

const game = new Game();
addLogMsg('Welcome to the RPG game!');

startGameButton.addEventListener('click', () => addLogMsg(game.beginJourney()));
resetButton.addEventListener('click', () => resetGame());
addHeroButton.addEventListener('click', () => addHero());
finishGameButton.addEventListener('click', () => addLogMsg(game.finishJourney()));
addMonsterButton.addEventListener('click', () => addMonster());
fightButton.addEventListener('click', () => addLogMsg(game.fight()));

function resetGame() {
  game.status = 'Idle';
  game.hero = undefined;
  game.monsters = [];
  addLogMsg('Now you can start new game');
}

function addHero() {
  if (heroName.value) {
    const hero = new Hero(heroName.value, heroSelect.value);
    addLogMsg(game.addHero(hero));
  } else {
    addLogMsg('Hero needs a name');
  }
}

function addMonster() {
  const monster = new Monster(monsterSelect.value);
  addLogMsg(game.addMonster(monster));
}

randomButton.addEventListener('click', () => {
  const heros = ['warrior', 'rogue', 'sorcerer'];
  const monsters = ['zombie', 'skeleton', 'holem'];
  const heroIndex = getRandomInt(0, 2);
  const monsterIndex1 = getRandomInt(0, 2);
  const monsterIndex2 = getRandomInt(0, 2);
  resetGame();
  heroName.value = heros[heroIndex];
  heroSelect.value = heros[heroIndex];
  addHero();
  monsterSelect.value = monsters[monsterIndex1];
  addMonster();
  monsterSelect.value = monsters[monsterIndex2];
  addMonster();
  addLogMsg(game.beginJourney());
  game.fight();
  game.fight();
  addLogMsg(game.finishJourney());
});

function addLogMsg(text) {
  const logElement = document.createElement('p');
  const time = new Date();
  const timeToShow = `${time.getHours()} : ${time.getMinutes()} : ${time.getSeconds()}`;
  logElement.innerHTML = `${timeToShow} <mark>${text}<mark>`;
  logWrap.insertAdjacentElement('afterbegin', logElement);
}
/* eslint-enable no-undef */
/* End of your solution for Game Population mechanism */
