class Computer {
  constructor(name, health) {
    this.name = name;
    this.health = health;
  }
  generateAttackDamage() {
    return getRandom(5)
  }
}

class Character extends Computer {
  constructor(name, health, healsRemaining) {
    super(name, health);
    this.healsRemaining = healsRemaining;
    this.wins = 0;
  }

  generateAttackDamage() {
    return getRandom(3);
  }


  heal() {
    this.health += getRandom(10);
    this.healsRemaining--;
  }
}

var TOTAL_WINS = 5;
var COMPUTER_STARTING_HEALTH = 10;

// var playing = false;
// var startButton;

// game.load.spritesheet('button', 'img/button.png', 120, 40);

// startButton = game.add.button(game.world.width*0.5, game.world.height*0.5, 'button', startGame, this, 1, 0, 2);
// startButton.anchor.set(0.5);

// function startGame() {
//   startButton.destroy();
//   ball.body.velocity.set(150, -150);
//   playing = true;
// }

// startGame();
//Globals
var userHealth = 40;
var grantHealth = 10;
var wins = 0;

// Hook up the start button
var startButton = document.getElementById("startButton");
startButton.onclick = function () {
  document.getElementById("game-wrapper").style.display = "block";
  document.getElementById("start-wrapper").style.display = "none";
  startGame();
}

// Define a function to update the player name
var playerName = document.getElementById("playerName");
function setPlayerName(user) {
  playerName.innerText = user;
}

// Hook up the attack button
var attackButton=document.getElementById("attackButton");
attackButton.onclick=attack;
function attack() {
  userHealth -= getDamage();
  grantHealth -= getDamage();
  console.log(`The user has ${userHealth} health remaining`);
  console.log(`Grant has ${grantHealth} health remaining`);

  var playerHeathProgressBar = document.getElementsByClassName("playerHealth")[0];
  playerHeathProgressBar.value = userHealth;

  if (grantHealth <= 0) {
    wins++;
    grantHealth = 10;
    var message = `The user has 1 victory`
    if (wins > 1) {
      var message = `The user has 1 victory`
    }
  }
}



function startGame() {
  var user = prompt('Please enter your name');
  setPlayerName(user);
  startCombat(user);
}


function startCombat(userName) {

  var user = new Character(userName, 40, 2);
  var grant = new Computer("grant", COMPUTER_STARTING_HEALTH);

  while (user.wins < TOTAL_WINS && user.health > 0) {
    var shouldAttack = prompt("attack, heal, or quit");

    if (shouldAttack === "quit") {
      console.log('thanks for playing')
      return;
    }

    if (shouldAttack === 'attack') {
      user.health -= user.generateAttackDamage();
      grant.health -= grant.generateAttackDamage();

    }

    if (shouldAttack === "heal") {
      user.heal()
      // grant.health -=user.generateAttackDamage();
      console.log(`${user.name} has healed and has ${user.health} health left`);
      console.log(`${user.name} + ' has' + ${user.health} + 'health left`);
      console.log(`${grant.name} 'has' ${grant.health} 'health left`);


      if (grant.health < 1) {
        user.wins++;
        grant.health = COMPUTER_STARTING_HEALTH;
        console.log(`${user.name} has ${user.wins} win(s)`);
      }
      if (user.healsRemaining === 0) {
        grant.generateAttackDamage();
        user.generateAttackDamage();
        console.log(`${user.name} has ${user.health} health left`);
        console.log(`Grant has ${grant.health} health left`);
      }
    }
    if (user.wins === TOTAL_WINS) {
      console.log(`${user.name} has ${user.wins} wins`);
    } else {
      console.log('Grant wins');
    }
  }
}

function getRandom(max) {
  return Math.floor(Math.random() * max) + 1;
}

function myFunction() {
  var btn = document.createElement("BUTTON");
  btn.appendChild(t);
  document.body.appendChild(btn);
}