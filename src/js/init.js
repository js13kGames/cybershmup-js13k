/* global width height sc:true PLAYER:true ENEMY renderShip BULLET renderBullet
dis gameplay home select make2DProjection */

var cm = document.getElementById('m');
var cfx = document.getElementById('fx');
var cui = document.getElementById('ui');
var wrapper = document.getElementById('w');

cm.width = cui.width = cfx.width = width;
cm.height = cui.height = cfx.height = height;

var ctx = cm.getContext('2d');
var ctxUI = cui.getContext('2d');
var gl = cfx.getContext('webgl') || cfx.getContext('experimental-webgl');

// pre-render shapes
PLAYER = [PLAYER[0], renderShip(PLAYER)];

for (var enemy in ENEMY) {
  ENEMY[enemy] = [ENEMY[enemy][0], renderShip(ENEMY[enemy])];
}

for (var bullet in BULLET) {
  BULLET[bullet] = [BULLET[bullet][0], renderBullet(BULLET[bullet])];
}

var projectionMatrix = make2DProjection(width, height);

var scenes = [gameplay, home, select];

var currentScene = 1;
var loaded = false;

// TODO load from local storage
var unlockedLevel = 9;
var health = 100;
var maxHealth = 100;
var energy = 0;
var maxEnergy = 100;
var weapon = 0;
var maxWeapon = 100;
var highscore = 0;
var score = 0;
