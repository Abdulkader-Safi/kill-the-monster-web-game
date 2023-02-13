let MonsterHeath = document.getElementById("MonsterHeath");
let YourHeath = document.getElementById("YourHeath");
let BattleLog = document.getElementById("BattleLog");
let Logs = document.getElementById("logs");
let GameOver = document.getElementById("GameOver");
let Status = document.getElementById("Status");
let Buttons = document.getElementById("buttons");

let monsterHeath = "100";
let yourHeath = "100";
let healLimit = 3;
let specialAttackLimit = true;

window.onload = function () {
  GameOver.style.display = "none";
  MonsterHeath.style.width = `${monsterHeath}%`;
  YourHeath.style.width = `${yourHeath}%`;
};

let attack = () => {
  playerAttack(5, 10);
  monsterAttack(5, 12);

  if (monsterHeath <= 0 && yourHeath <= 0) {
    gameOver("It's a draw!");
    MonsterHeath.style.width = `0%`;
    YourHeath.style.width = `0%`;
  } else if (monsterHeath <= 0) {
    gameOver("You Won!");
    MonsterHeath.style.width = `0%`;
  } else if (yourHeath <= 0) {
    gameOver("You Lose!");
    YourHeath.style.width = `0%`;
  }
  healLimit = 3;
  specialAttackLimit = false;
};

let specialAttack = () => {
  if (specialAttackLimit === true) {
    playerAttack(10, 20);
    monsterAttack(7, 12);
    specialAttackLimit = false;
  }
  if (yourHeath > monsterHeath) {
    let percent = (yourHeath * 100) / monsterHeath; // to get the percentage
    console.log(percent);
    if (percent <= 20) {
      playerAttack(10, 20);
      monsterAttack(7, 12);
    }
    return;
  }
};

let heal = () => {
  if (healLimit <= 0 || yourHeath >= 100) {
    return;
  }
  let healValue = randomNum(10, 20);
  yourHeath += healValue;
  YourHeath.style.width = `${yourHeath}%`;
  logMove(true, "heal", healValue);

  healLimit--;

  monsterAttack(5, 12);
};

let giveUp = () => {
  yourHeath = 0;
  YourHeath.style.width = `${yourHeath}%`;

  gameOver("You Give Up!");
};

let randomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

let restart = () => {
  window.location.reload();
};

const logMove = (isPlayer, move, value) => {
  let name = isPlayer === true ? "Player" : "Monster";
  let moveName =
    move === "attack"
      ? `attacks and deals <span class='cred'>${value}</span>`
      : `heals himself for <span class='cgreen'>${value}</span>`;

  Logs.innerHTML += `
  <p><span class=${name}>${name}</span> ${moveName}</p>
  `;
};

let gameOver = (msg) => {
  GameOver.style.display = "block";
  BattleLog.style.display = "none";
  Buttons.style.display = "none";
  Status.innerHTML = msg;
};

let playerAttack = (min, max) => {
  let attackPowerPlayer = randomNum(min, max);
  monsterHeath -= attackPowerPlayer;
  MonsterHeath.style.width = `${monsterHeath}%`;
  logMove(true, "attack", attackPowerPlayer);
};

let monsterAttack = (min, max) => {
  let attackPowerMonster = randomNum(min, max);
  yourHeath -= attackPowerMonster;
  YourHeath.style.width = `${yourHeath}%`;
  logMove(false, "attack", attackPowerMonster);
};
