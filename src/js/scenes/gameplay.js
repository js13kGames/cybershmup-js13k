/* global makeButton changeScene isMobile drawButton a1: true a2: true a3: true
clicked:true handleButtonClick mx my levels makeBackground makeGauge makeLabel
drawBackground drawGauge drawLabel updateGauge updateLabel health energy
weapon score padZero PLAYER updatePlayer makePlayer updateBackground drawBody */

var gameplay = [
  // 0 init
  function (level) {
    // menu button
    if (isMobile) {
      gameplay[4] = makeButton(430, 50, 60, 60, 'x', 4, '0cf', '024', 0, function () {
        // go to the select scene
        changeScene(1, 1);
      }, 1);
    }
    // background
    gameplay[5] = makeBackground(getBackgroundColor(levels[level][4]), 1 + level * 0.1);
    // gauges
    gameplay[6] = [
      // hp
      makeGauge(-20, 430, 300, '0d0', '020', 5, health, -1.6),
      // wp
      makeGauge(490, 440, 300, 'f0c', '202', 7, weapon, -1.55, 1),
      // energy
      makeGauge(260, 630, 480, '0cf', '022', 10, energy, -0.05)
    ];
    // labels
    gameplay[7] = [
      makeLabel(20, 20, padZero(0), 'fff', 4),
      makeLabel(3, 295, 'hp', '0d0', 2),
      makeLabel(463, 240, 'wp', 'f0c', 2),
      makeLabel(375, 565, 'glitch', '0cf', 3)
    ];

    // player
    gameplay[8] = makePlayer();

    // waves.push(makeWave(1, 'ss', 'z', 10));
    // waves.push(makeWave(1, 'ss', 'zm', 10));
    // waves.push(makeWave(9, 'ss', 'c', 10));
    // waves.push(makeWave(9, 'ss', 'cm', 10));
    // waves.push(makeWave(14, 'ss', 's', 10));
    // waves.push(makeWave(14, 'ss', 'sm', 10));
    // waves.push(makeWave(20, 'ss', 'a', 10));
    // waves.push(makeWave(20, 'ss', 'am', 10));
    // waves.push(makeWave(27, 'ss', 'ux', 10));
    // waves.push(makeWave(27, 'ss', 'umx', 10));
    // waves.push(makeWave(33, 'ss', '1', 10));
    // waves.push(makeWave(34, 'ss', '2', 10));
    // waves.push(makeWave(35, 'ss', '3', 10));
    // waves.push(makeWave(36, 'ss', '4', 10));
    // waves.push(makeWave(37, 'ss', '5', 10));
    // waves.push(makeWave(38, 'ss', '6', 10));
    // waves.push(makeWave(39, 'ss', '7', 10));

    // waves.push(makeWave(1, 'ss', '1', 30));
    // waves.push(makeWave(1, 'ss', '2', 30));
    // waves.push(makeWave(1, 'ss', '3', 30));
    // waves.push(makeWave(1, 'ss', '4', 30));
    // waves.push(makeWave(1, 'ss', '5', 30));
    // waves.push(makeWave(1, 'ss', '6', 30));
    // waves.push(makeWave(1, 'ss', '7', 30));
  },
  // 1 update
  function () {
    updateGauge(gameplay[6][0], health);
    updateGauge(gameplay[6][1], weapon);
    updateGauge(gameplay[6][2], energy);
    updateLabel(gameplay[7][0], padZero(score));

    updatePlayer(gameplay[8]);

    updateBackground(gameplay[5], gameplay[8][2][0], gameplay[8][2][1]);
    // enableGaugeGlow(gameplay[6][2]);
    // disableGaugeGlow(gameplay[6][2]);
  },
  // 2 input
  function () {
    if (!isMobile) {
      // if enter or space try using glitch
      if (a1 || a2) {
        // use glitch
        a1 = a2 = 0;
      }

      // escape - show pause menu
      if (a3) {
        changeScene(1, 1);
        a3 = 0;
      }

      return;
    }

    if (clicked) {
      if (handleButtonClick(mx, my, gameplay[4])) {
        clicked = false;
        return true;
      }
    }
  },
  // 3 render
  function () {
    if (isMobile) drawButton(gameplay[4]);

    drawBackground(gameplay[5]);
    gameplay[6].forEach(drawGauge);
    gameplay[7].forEach(drawLabel);

    drawBody(gameplay[8]);
  }
];

function getBackgroundColor(color) {
  return color.split('').map(function (c) {
    c = parseInt(c, 10);
    return c ? c + 2 : c;
  }).join('');
}