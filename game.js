function game() {
  var TITLE = 'The Odul Mages';
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  canvas.width = 960;
  canvas.height = 540;
  //canvas.style.backgroundColor = 'rgb(0,0,0)';
  var centre = getCanvasCentre();
  var time = {
    elapsed: 0,
    start: new Date().getTime(),
    now: new Date().getTime(),
    getElapsed: this.now - this.start,
    started: false,
    lastCall: new Date().getTime()
  };

  var sounds = new Sounds();

  var availableKeys = new AvailableKeys();
  var keyStroke = new KeyStroke(availableKeys.getKey());
  var p2Keys = new KeyStroke(availableKeys.getKey());
  var p1 = player(240, canvas.height / 2 + 100, keyStroke);
  var p2 = player(720, canvas.height / 2 + 100, p2Keys);
  var attacks = new Attack(ctx);

  var frame = 0;
  var offsets = {
    yOffset: canvas.height * 1.25,
    medYOffset: canvas.height * 1.25 * 0.1,
    slowYOffset: canvas.height * 1.25 * 0.05
  };
  var offsetSpeeds = {
    fast: 2,
    med: 2 * 0.1,
    slow: 2 * 0.05
  };
  var _game = {
  		state: 'menu',
  		attackingPlayer: null,
  		playerOneHealth: 100,
  		playerTwoHealth: 100,
      playerOneReversed: 0,
      playerTwoReversed: 0,
  		tossWinner: null,
  		chosenAttack: null,
  		defender: null,
  		start: false
  };
  var MAXHEALTH = 100;
  var DEBUGHEALTH = 50;
  var powers = {
  		water: {
  			type: 'water',
  			speed: 7,
  			damage: 30,
  			colour: 'rgb(0,0,255)',
        time: 4900
  		},
  		fire: {
  			type: 'fire',
  			speed: 10,
  			damage: 40,
  			colour: 'rgb(255,0,0)',
        time: 6000
  		},
  		electric: {
  			type: 'electric',
  			speed: 4,
  			damage: 15,
  			colour: 'rgb(255,255,0)',
        time: 3750
  		},
  		special: {
  			type: 'special',
  			speed: 5,
  			damage: 50,
  			colour: 'rbg(255,0,255)',
        time: 4000
  		}
  };

  var sprites = {
    stars: starField(ctx, 30, offsets, offsetSpeeds),
    ball: attackBall(ctx, 180, 320 - 30, 40, 5, 1),
    g: ground(ctx, 0, 400 - 30, offsets.yOffset),
    ps1: playerSprite(ctx, 150, 370 - 30, offsets.yOffset), //this.g.y - 30)
    ps2: playerSprite(ctx, 810, 370 - 30, offsets.yOffset, 2),
    w: water(ctx, 0, 410 - 30, offsets.yOffset),
    mod: modesty(ctx, 0, 380, offsets.yOffset),
    m: moon(ctx, 800, 100, offsets.medYOffset)
  };

  window.requestAnimationFrame(loop);
  window.addEventListener("keydown", function (event) {
    if (_game.state === 'menu') {
      if (event.keyCode === 32) {
        //_game.start = true;
        _game.state = 'intro';
      }
    }
    else if (_game.state === 'toss') {
      // player 1
      if (event.keyCode === keyStroke.currentLetter) {
        availableKeys.keys[keyStroke.currentLetter - 65].available = true;
        keyStroke.assignLetter(availableKeys.getKey());
        p1.updateScore(10);
        sounds.playSuccess(Math.round(p1.getScore()/10 - 1), 1);
      }
      // player 2
      else if (event.keyCode === p2Keys.currentLetter) {
        availableKeys.keys[p2Keys.currentLetter - 65].avaialble = true;
        p2Keys.assignLetter(availableKeys.getKey());
        p2.updateScore(10);
        sounds.playSuccess(Math.round(p2.getScore()/10 - 1), 2);
      }
    }
    else if (_game.state === 'attackIncoming') {
      if (event.keyCode === keyStroke.currentLetter) {
        availableKeys.keys[keyStroke.currentLetter - 65].available = true;
        keyStroke.assignLetter(availableKeys.getKey());
        p1.updateScore(10);
        sounds.playSuccess(Math.round(p1.getScore()/10 - 1), 1);
      }
      else if (event.keyCode === p2Keys.currentLetter) {
        availableKeys.keys[p2Keys.currentLetter - 65].available = true;
        p2Keys.assignLetter(availableKeys.getKey());
        p2.updateScore(10);
        sounds.playSuccess(Math.round(p2.getScore()/10 - 1), 2);
      }
    }
    else if (_game.state === 'attackSelection') {
      if (attacks.available) {
        switch (event.keyCode) {
          case 87:
            attacks.available = false;
            _game.state = 'attack';
            _game.chosenAttack = powers.water;
            break;
          case 70:
            attacks.available = false;
            _game.state = 'attack';
            _game.chosenAttack = powers.fire;
            break;
          case 69:
            attacks.available = false;
            _game.state = 'attack';
            _game.chosenAttack = powers.electric;
            break;
          case 83:
            // this might need to be >= 2
            if ((_game.defender === 1 && _game.playerTwoReversed >= 3) ||
                (_game.defender === 2 && _game.playerOneReversed >= 3)) {

                attacks.available = false;
                _game.state = 'attack';
                _game.chosenAttack = powers.special;

                _game.playerTwoReversed = _game.defender === 2 ? 0 : _game.playerTwoReversed;
                _game.playerOneReversed = _game.defender === 1 ? 0 : _game.playerOneReversed;

                // play bad sound...
            }
            break;
          }
        }
      }
    });

  function loop() {
    clear();
    draw();
    //sprites.ball.update();

    // timing - update now counter at beginning of every loop
    time.now = new Date().getTime();
    //console.log('ELAPSED: ' + time.elapsed);

    // logic
    ctx.fillStyle = 'black';

    if (_game.state === 'menu') {
      text(TITLE.toUpperCase(), centre.x, centre.y -50, 'center', '52px');
      text('press [space]', centre.x, centre.y + 20, 'center');
    }
    else if (_game.state === 'intro') {
      text('INTRO', centre.x, centre.y + 100, 'center');
      sprites.g.reduceOffset(offsetSpeeds.fast);
      sprites.mod.reduceOffset(offsetSpeeds.fast);
      sprites.w.reduceOffset(offsetSpeeds.fast);
      sprites.ps1.reduceOffset(offsetSpeeds.fast);
      sprites.ps2.reduceOffset(offsetSpeeds.fast);
      sprites.m.reduceOffset(offsetSpeeds.med);
      sprites.stars.forEach(function (item) {
        item.reduceOffset();
      });
      if (sprites.ps1.scrollComplete) {
        _game.start = true;
      }
      if (_game.start) {
        _game.state = 'toss';
      }
    }
    else if (_game.state === 'toss') {
      if (p1.getScore() < DEBUGHEALTH && p2.getScore() < DEBUGHEALTH) {
        p1.draw(ctx);
        p2.draw(ctx);
        time.start = new Date().getTime();
      }
      else {
        if (!time.started) {
          time.elapsed = 0;
          time.start = new Date().getTime();
          time.started = true;
        }
        time.elapsed = time.now - time.start;
        var winner = '';
        //console.log(time.elapsed);
        if (time.elapsed < 1500) {//if (frame < 120) {
          //console.log('1.5 seconds have passed!');
          frame++;
          winner = p1.getScore() >= DEBUGHEALTH ? 'player one' : 'player two';
          _game.tossWinner = p1.getScore() >= DEBUGHEALTH ? 1 : 2;
          _game.defender = _game.tossWinner === 1 ? 2 : 1;
          sprites.ball.setPlayer(_game.tossWinner);
          winner += ' has the power';
        }
        else if (time.elapsed < 3000) {//frame < 240) {
          //console.log('2.2 seconds have passed');
          winner = 'choose your attack';
          frame++;
        }
        else {
          winner = null;
        }

        if (winner !== null) {
          text(winner, centre.x, centre.y, 'center');
        }
        else {
          _game.state = 'attackSelection';
          time.started = false;
        }
      }
    }
    else if (_game.state == 'attackSelection') {
      var specialAvailable = false;
      // might need to be >= 3
      if ((_game.defender === 1 && _game.playerTwoReversed >= 2) ||
          (_game.defender === 2 && _game.playerOneReversed >= 2)) {

          specialAvailable = true;
      }
      attacks.displayAttacks(centre, specialAvailable);
      reset();
    }
    else if (_game.state == 'attack') {
      // reset the time
      if (!time.started) {
        time.elapsed = 0;
        time.start = new Date().getTime();
        time.started = true;
      }
      time.elapsed = time.now - time.start;
      sprites.ball.setAttack(_game.chosenAttack);
      var aMsg = 'player ' + _game.tossWinner + ' does a ' + _game.chosenAttack.type + ' attack';
      text(aMsg, centre.x, centre.y, 'center');
      frame++;
      if (time.elapsed > 1500) {//frame >= 120) {
        //console.log('1500 milliseconds have passed!');
        time.started = false;
        reset({state:'defense'});
      }
    }
    else if (_game.state == 'defense') {
      text('player ' + _game.defender + ', reverse it!!', centre.x, centre.y, 'center');
      frame++;
      // reset the time
      if (!time.started) {
        time.elapsed = 0;
        time.start = new Date().getTime();
        time.started = true;
      }
      time.elapsed = time.now - time.start;

      if (time.elapsed > 1500) {//frame >= 120) {
        //console.log('moving into attackincoming phase...');
        time.started = false;
        reset({state:'attackIncoming'});
        time.lastCall = new Date().getDate();
      }
    }
    else if (_game.state == 'attackIncoming') {
      // reset the time
      if (!time.started) {
        time.start = new Date().getTime();
        time.started = true;
        time.lastCall = time.start;
      }

      time.elapsed = new Date().getTime() - time.lastCall;

      // how much time is left??
      var endTime = new Date().getTime() + _game.chosenAttack.time;
      var timeLeft = _game.chosenAttack.time - (endTime - time.start - _game.chosenAttack.time);

      if (timeLeft > 0) {
        // how far is left to go?
        var distanceToCover = 600;
        //var endPoint = sprites.ball.initialX + distanceToCover;
        var endPoint = 0;
        var remainingDistance = 0;
        if (_game.defender === 2) {
          sprites.ball.initialX = 180;
          endPoint = sprites.ball.initialX + distanceToCover;
          remainingDistance = endPoint - sprites.ball.x;
        }
        else {
          sprites.ball.initialX = 780;
          endPoint = sprites.ball.initialX - distanceToCover;
          remainingDistance = sprites.ball.x - endPoint;
        }

        // how many pixels should x move at the current speed?
        var ppms = remainingDistance / timeLeft;

        // display the ball!
        sprites.ball.show = true;
        if (_game.defender === 2) {
          sprites.ball.x += ppms * time.elapsed;
        }
        else {
          sprites.ball.x -= ppms * time.elapsed;
        }
      }
      else {
        // attack successful!
        console.log('ouch...');
        sprites.ball.show = false;
        _game.state = 'attackSuccess';
      }

      switch (_game.defender) {
        case 1:
          p1.draw(ctx);
          if (p1.getScore() >= DEBUGHEALTH) {//100) {
            _game.state = 'reversing'; //'attackFail';
            _game.playerOneReversed++;

            time.started = false;
          }
          break;
        case 2:
          p2.draw(ctx);
          if (p2.getScore() >= DEBUGHEALTH) {//100) {
            _game.state = 'reversing'; //'attackFail';
            _game.playerTwoReversed++;

            time.started = false;
          }
          break;
      }

      // update the last call time
      time.lastCall = new Date().getTime();
    }
    else if(_game.state == 'reversing') {
      if (!time.started) {
        time.start = new Date().getTime();
        time.started = true;
        time.lastCall = time.start;
      }
      time.elapsed = new Date().getTime() - time.lastCall;

      // how much time is left??
      var reversalTime = 2000;
      var _endTime = new Date().getTime() + reversalTime;
      var _timeLeft = reversalTime - (_endTime - time.start - reversalTime);
      var _distanceToCover = 0;
      if (_game.defender === 1) {
        _distanceToCover = sprites.ball.initialX - sprites.ball.x;
      }
      else {
        _distanceToCover = sprites.ball.x - sprites.ball.initialX;
      }

      if (_timeLeft > 0) {
        var _endPoint = 0;
        var _remainingDistance = 0;
        if (_game.defender === 1) {
          _endPoint = 780;
          _remainingDistance = _endPoint - sprites.ball.x;
        }
        else {
          _endPoint = 180;
          _remainingDistance = sprites.ball.x - _endPoint;
        }
        var _ppms = _remainingDistance / _timeLeft;
        if (_game.defender === 1) {
          sprites.ball.x += _ppms * time.elapsed;
        }
        else {
          sprites.ball.x -= _ppms * time.elapsed;
        }
      }
      else {
        sprites.ball.show = false;
        _game.state = 'attackFail';
      }

      time.lastCall = new Date().getTime();
    }
    else if (_game.state == 'attackFail') {
      reset();
      sprites.ball.show = false;
      if (_game.defender === 1) {
        _game.playerTwoHealth -= _game.chosenAttack.damage / 2;
        sprites.ps2.health = _game.playerTwoHealth;
        if (_game.playerTwoHealth <= 0) {
          _game.playerTwoHealth = 0;
          sprites.ps2.health = _game.playerTwoHealth;
          reset({state:'gameOver'});
        }
        else {
          _game.state = 'toss';
        }
      }
      else {
        _game.playerOneHealth -= _game.chosenAttack.damage / 2;
        sprites.ps1.health = _game.playerOneHealth;
        if (_game.playerOneHealth <= 0) {
          _game.playerOneHealth = 0;
          sprites.ps1.health = _game.playerOneHealth;
          _game.state = 'gameOver';
        }
        else {
          _game.state = 'toss';
        }
      }
    }
    else if (_game.state == 'attackSuccess') {
      sprites.ball.show = false;
      var _continue = true;
      if (_game.defender === 1) {
        _game.playerOneHealth -= _game.chosenAttack.damage;
        sprites.ps1.health = _game.playerOneHealth;
        if (_game.playerOneHealth <= 0) {
          _game.playerOneHealth = 0;
          sprites.ps1.health = _game.playerOneHealth;
          _game.state = 'gameOver';
          frame = 0;
          _continue = false;
        }
      }
      else {
        _game.playerTwoHealth -= _game.chosenAttack.damage;
        sprites.ps2.health = _game.playerTwoHealth;
        if (_game.playerTwoHealth <= 0) {
          _game.playerTwoHealth = 0;
          sprites.ps2.health = _game.playerTwoHealth;
          _game.state = 'gameOver';
          frame = 0;
          _continue = false;
        }
      }

      if (_continue) {
        reset({state:'toss'});
      }
    }
    else if (_game.state == 'gameOver') {
      var msg = _game.playerOneHealth <= 0 ? 'Player 2' : 'Player 1';
      msg += ' wins';
      text(msg, centre.x, centre.y, 'center');
      frame++;
      if (frame >= 120) {
        _game.start = false;
        reset({state:'menu',health:true});
      }
    }

    window.requestAnimationFrame(loop);

  }

  function clear() {
  		ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function player(x, y, _keystroke) {
  		var score = 0;

  		return {
  			draw: function() {
          ctx.lineWidth = 3;
          ctx.strokeStyle = 'black';
          text(_keystroke.getLetter(), x, y, 'center', '400px', 'rgba(255,255,255,0.8)');
          ctx.strokeText(_keystroke.getLetter(), x, y);
          ctx.lineWidth = 0;
  			},
  			getScore: function() {
  				return score;
  			},
  			updateScore: function(inc) {
  				score += inc;
  			},
  			resetScore: function() {
  				score = 0;
  			}
  		};

  }

  function getCanvasCentre() {
  		return {
  			x: canvas.width / 2,
  			y: canvas.height / 2
  		};
  }

  function reset(options) {
    frame = 0;
    p1.resetScore();
    p2.resetScore();
    if (options === undefined) {
      return;
    }
    if (options.health !== undefined) {
      _game.playerOneHealth = _game.playerTwoHealth = MAXHEALTH;
    }
    if (options.state !== undefined) {
      _game.state = options.state;
    }
  }

  function text(msg, x, y, align, size, colour) {
    if (align !== undefined) {
      ctx.textAlign = align;
    }

    if (colour === undefined) {
      ctx.fillStyle = 'rgb(255,255,255)';
      ctx.shadowColor = 'white';
    }
    else {
      ctx.fillStyle = colour;
      ctx.shadowColor = colour;
    }

    ctx.font = (size === undefined ? '22px' : size) + ' sans-serif';
    ctx.shadowBlur = 10;
    ctx.fillText(msg, x, y);
    ctx.shadowBlur = 0;
  }

  function draw() {
    //backgroundOne(ctx);
    //backgroundTwo(ctx);

    // stars
    sprites.stars.forEach(function (s) {
      s.draw();
    });
    sprites.mod.draw();
    sprites.ball.draw();
    sprites.ball.drawReflection();
    sprites.m.draw();
    sprites.g.draw();

    sprites.ps1.draw(_game.playerOneReversed, _game.playerOneHealth);
    sprites.ps1.drawReflection();

    sprites.ps2.draw(_game.playerTwoReversed, _game.playerTwoHealth);
    sprites.ps2.drawReflection();

    sprites.w.draw();
  }
}
