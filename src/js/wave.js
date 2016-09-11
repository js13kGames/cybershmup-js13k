/* global ENEMY dt makeEnemy makePath updateEnemy width height makeBatch hex2rgb
updateBatchItem drawBatch waves addExplosion trySpawningCollectible levels */

// create waves for the given difficulty level
function makeWaves(level) {
  var waves = [];
  var color = hex2rgb(levels[level][3]);

  // TODO
  waves.push(makeWave(1, 'sl', 's', 1, 2, 1, color));
  waves.push(makeWave(1, 'ts', '2', 1, 1, 1, color));
  waves.push(makeWave(3, 'tm', '3', 1, 1, 1, color));
  waves.push(makeWave(5, 'tl', '4', 1, 1, 1, color));
  return waves;
}

function makeWave(delay, type, path, count, speed, interval, color) {
  count = count || 1;
  path = makePath(path);

  var enemies = [];
  var x = path[0] * width;
  var y = path[1] * height;

  for (var i = 0; i < count; i++) {
    enemies.push(makeEnemy(type, x, y, speed, color));
  }

  var image = ENEMY[type][1];

  return [
    delay, // delay before the wave starts
    enemies, // wave's enemies
    makeBatch(image, count),
    [], // wave's active enemies
    path, // wave's path
    0, // delay before next enemy
    interval || 0 // enemy spawning interval
  ];
}

function updateWaves() {
  waves.forEach(updateWave);
}

function updateWave(wave) {
  // wave spawn timer
  if (wave[0] > 0) {
    wave[0] -= dt / 1000;
    return;
  }

  var enemy;

  if (wave[5] <= 0 && wave[1].length) {
    wave[5] = wave[6];
    enemy = wave[1].pop();
    wave[3].push(enemy);
  }

  var d = 0;

  for (var i = 0, len = wave[3].length; i < len; i++) {
    enemy = wave[3][i];

    updateEnemy(enemy, wave[4]);

    if (enemy[3] > 0) {
      updateBatchItem(wave[2], i, enemy[1][0], enemy[1][1], 0, 1, 1, 1, enemy[7]);
    } else {
      // don't explode when leaving the screen
      if (enemy[3] > -1000) {
        addExplosion(enemy[1][0], enemy[1][1], ENEMY[enemy[0]][0]);
        trySpawningCollectible(enemy[1]);
      }
      wave[3].splice(i, 1);
      len--;
      i--;
    }
  }

  wave[5] -= dt / 1000;
}

function wavesHaveActiveShips() {
  return waves.some(function (wave) {
    return wave[3].length > 0;
  });
}

function drawWaves() {
  waves.forEach(drawWave);
}

function drawWave(wave) {
  drawBatch(wave[2], wave[3].length);
}

function checkWavesComplete() {
  return !waves.some(function (wave) {
    return wave[1].length || wave[3].some(function (enemy) {
      return enemy[3] > 0;
    });
  });
}