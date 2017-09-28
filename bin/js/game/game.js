var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>
var k2016Game;
(function (k2016Game) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Preloader.prototype.preload = function () {
            this.game.load.onLoadStart.add(function () { }, this);
            this.game.load.onFileComplete.add(this.fileComplete, this);
            this.game.load.onLoadComplete.add(function () {
                this.loadingBar.visible = false;
                this.loadingPerc.visible = false;
                this.startBtn.visible = true;
                this.game.input.onDown.addOnce(function () { k2016Game.goState("Menu", this.game); }, this);
            }, this);
            //start button
            //--------------------------
            this.startBtn = this.game.add.sprite(this.game.world.width / 2, this.game.world.height / 2, this.game.cache.getBitmapData('startBtn'));
            this.startBtn.anchor.setTo(0.5);
            var _spriteText = this.game.add.text(0, 0, 'START', { fill: '#ffffff' });
            _spriteText.anchor.set(0.5);
            this.startBtn.addChild(_spriteText);
            this.startBtn.visible = false;
            // this.loadingContainer.addChild(this.startBtn);
            //Loading container
            //--------------------------
            this.loadingBar = this.game.add.sprite(this.game.world.width / 2, this.game.world.height / 2, this.game.cache.getBitmapData('loadingBar'));
            this.loadingBar.anchor.setTo(0.5);
            this.loadingPerc = this.game.add.text(0, 0, '0%', { wordWrap: true, wordWrapWidth: this.loadingBar.width, fill: '#ffffff', stroke: '#0096ff', strokeThickness: 5 });
            this.loadingPerc.anchor.set(0.5);
            this.loadingBar.addChild(this.loadingPerc);
            this.game.load.setPreloadSprite(this.loadingBar);
            //Assets Load
            //--------------------------	
            // IMAGES		
            for (var i = 0; i < gameData.assets.images.length; i++) {
                this.game.load.image(gameData.assets.images[i].name, gameData.assets.images[i].path);
            }
            // SPRITESHEETS		
            for (var i = 0; i < gameData.assets.spritesheets.length; i++) {
                this.game.load.spritesheet(gameData.assets.spritesheets[i].name, gameData.assets.spritesheets[i].path, gameData.assets.spritesheets[i].width, gameData.assets.spritesheets[i].height, gameData.assets.spritesheets[i].frames);
            }
            //bitmap fonts
            for (var i = 0; i < gameData.assets.bitmapfont.length; i++) {
                this.game.load.bitmapFont(gameData.assets.bitmapfont[i].name, gameData.assets.bitmapfont[i].imgpath, gameData.assets.bitmapfont[i].xmlpath);
            }
            // SOUNDS
            for (var i = 0; i < gameData.assets.sounds.length; i++) {
                this.game.load.audio(gameData.assets.sounds[i].name, gameData.assets.sounds[i].paths);
            }
            this.game.load.script('webfont', 'js/libs/webfonts.js');
        };
        Preloader.prototype.fileComplete = function (progress, cacheKey, success, totalLoaded, totalFiles) { this.loadingPerc.text = progress + "%"; };
        return Preloader;
    }(Phaser.State));
    k2016Game.Preloader = Preloader;
})(k2016Game || (k2016Game = {}));
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>
var k2016Game;
(function (k2016Game) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Boot.prototype.preload = function () {
            var bmd = this.game.add.bitmapData(200, 50);
            bmd.ctx.fillStyle = '#0096ff';
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 200, 50);
            bmd.ctx.fill();
            this.game.cache.addBitmapData('loadingBar', bmd);
            bmd = this.game.add.bitmapData(200, 200);
            bmd.ctx.beginPath();
            bmd.ctx.fillStyle = "#FFFFFF";
            bmd.ctx.strokeStyle = "#FFF";
            bmd.ctx.lineWidth = 20;
            bmd.ctx.arc(bmd.width / 2, bmd.height / 2, 50, 0, 2 * Math.PI);
            bmd.ctx.closePath();
            bmd.ctx.fill();
            bmd.ctx.stroke();
            this.game.cache.addBitmapData('circleBtn', bmd);
            bmd = this.game.add.bitmapData(200, 50);
            bmd.ctx.fillStyle = '#0096ff';
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 200, 50);
            bmd.ctx.fill();
            this.game.cache.addBitmapData('startBtn', bmd);
            bmd = this.game.add.bitmapData(200, 50);
            bmd.ctx.fillStyle = '#0096ff';
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 200, 50);
            bmd.ctx.fill();
            this.game.cache.addBitmapData('button', bmd);
            bmd = this.game.add.bitmapData(50, 50);
            bmd.ctx.fillStyle = '#000000';
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 50, 50);
            bmd.ctx.fill();
            this.game.cache.addBitmapData('bonus', bmd);
            bmd = this.game.add.bitmapData(2000, 50);
            bmd.ctx.fillStyle = '#000000';
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 2000, 50);
            bmd.ctx.fill();
            this.game.cache.addBitmapData('ground', bmd);
            bmd = this.game.add.bitmapData(1024, 600);
            bmd.ctx.fillStyle = '#000000';
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 1024, 600);
            bmd.ctx.fill();
            this.game.cache.addBitmapData('layer', bmd);
            bmd = this.game.add.bitmapData(1024, 600);
            bmd.ctx.fillStyle = '#ffffff';
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 1024, 600);
            bmd.ctx.fill();
            this.game.cache.addBitmapData('layerWhite', bmd);
            bmd = this.game.add.bitmapData(700, 40);
            bmd.ctx.fillStyle = '#ffffff';
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 700, 40);
            bmd.ctx.fill();
            this.game.cache.addBitmapData('energy', bmd);
            bmd = this.game.add.bitmapData(1024, 50);
            bmd.ctx.fillStyle = '#000000';
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 1024, 20);
            bmd.ctx.fill();
            this.game.cache.addBitmapData('collider', bmd);
            bmd = this.game.add.bitmapData(1024, 150);
            bmd.ctx.fillStyle = '#ff0000';
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 1024, 150);
            bmd.ctx.fill();
            this.game.cache.addBitmapData('tieAlert', bmd);
            bmd = this.game.add.bitmapData(50, 50);
            bmd.ctx.fillStyle = '#ff0000';
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 50, 50);
            bmd.ctx.fill();
            this.game.cache.addBitmapData('core', bmd);
            bmd = this.game.add.bitmapData(138, 82);
            bmd.ctx.fillStyle = '#ff0000';
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 138, 82);
            bmd.ctx.fill();
            this.game.cache.addBitmapData('player', bmd);
            bmd = this.game.add.bitmapData(210, 65);
            bmd.ctx.fillStyle = '#ff0000';
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 210, 65);
            bmd.ctx.fill();
            this.game.cache.addBitmapData('enemy', bmd);
            bmd = this.game.add.bitmapData(50, 300);
            bmd.ctx.fillStyle = '#ffffff';
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 50, 300);
            bmd.ctx.fill();
            this.game.cache.addBitmapData('end', bmd);
        };
        Boot.prototype.create = function () {
            if (this.game.device.touch && (this.game.device.iOS || this.game.device.android || this.game.device.windowsPhone)) {
                k2016Game.setDevice(true);
            }
            else {
                k2016Game.setDevice(false);
            }
            this.game.stage.backgroundColor = '#000000';
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.stage.smoothed = false;
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;
            this.game.state.start('Preloader');
        };
        return Boot;
    }(Phaser.State));
    k2016Game.Boot = Boot;
})(k2016Game || (k2016Game = {}));
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>
var k2016Game;
(function (k2016Game) {
    var Menu = (function (_super) {
        __extends(Menu, _super);
        function Menu() {
            var _this = _super.call(this) || this;
            _this.pCounter = 0;
            _this.pStep = Math.PI * 3 / 270;
            _this._countDownDate = new Date("jun 17, 2017 10:30:00").getTime();
            _this.max = 0;
            return _this;
        }
        Menu.prototype.preload = function () {
        };
        Menu.prototype.create = function () {
            var _this = this;
            //this.game.time.advancedTiming = true;
            k2016Game.setUpGame(this.game);
            k2016Game.setScore(0);
            this.game.world.setBounds(0, 0, 1024, 600);
            this.game.camera.x = 0;
            this.bgPenguins = this.game.add.tileSprite(0, 0, 1024, 800, "introSky");
            this.introRocks = this.game.add.tileSprite(0, 298, 1024, 96, 'introRocks');
            this.game.add.tileSprite(0, 331, 1024, 109, 'street1');
            this.game.add.tileSprite(0, 440, 1024, 32, 'street2');
            this.game.add.tileSprite(0, 472, 1024, 53, 'street3');
            this.game.add.tileSprite(0, 523, 1024, 77, 'street4');
            this.cloud1 = this.game.add.tileSprite(0, 0, 1024, 300, 'cloud1');
            this.cloud1.fixedToCamera = true;
            this.cloud2 = this.game.add.tileSprite(0, 0, 1024, 300, 'cloud2');
            this.cloud2.fixedToCamera = true;
            this.deluca = this.game.add.sprite(-300, 600, 'delucaMenu');
            this.deluca.pivot.set(0, this.deluca.height);
            this.game.add.tween(this.deluca).to({ x: 0 }, 1000, Phaser.Easing.Sinusoidal.InOut, true, 2000, 0, false);
            this.bunnieBig = this.game.add.sprite(1200, 600, 'evilTraffic');
            this.bunnieBig.pivot.set(0, this.bunnieBig.height);
            this.game.add.tween(this.bunnieBig).to({ x: 800 }, 1000, Phaser.Easing.Sinusoidal.InOut, true, 2000, 0, false);
            this.game.physics.arcade.gravity.y = 0;
            this.vs = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'vs');
            this.vs.alpha = 0;
            this.vs.anchor.set(0.5);
            this.vs.scale.set(0.75);
            this.game.add.tween(this.vs).to({ y: this.game.world.centerY + 50, alpha: 1 }, 1500, Phaser.Easing.Sinusoidal.InOut, true, 1500, 0, false).onComplete.add(function () {
                _this.game.add.tween(_this.vs.scale).to({ y: +.8, x: +.8 }, 3500, Phaser.Easing.Sinusoidal.InOut, true, 0, -1, true);
            });
            //TITLE
            var _style = { font: 'normal 50px', fill: '#ffffff', stroke: '#000000', strokeThickness: 10 };
            this.gameTitle = this.game.add.text(this.game.world.centerX, 0, "THE WRONG DIRECTION", _style);
            this.gameTitle.anchor.set(.5);
            this.gameTitle.alpha = 0;
            this.gameTitle.font = 'Press Start 2P';
            //SUBTITLE
            _style = { font: 'normal 25px', fill: '#ff0000', stroke: '#000000', strokeThickness: 8 };
            this.gameSubTitle = this.game.add.text(this.game.world.centerX - 100, 140, "Saint Matthew's carnage", _style);
            this.gameSubTitle.anchor.set(.5);
            this.gameSubTitle.alpha = 0;
            this.gameSubTitle.font = 'Press Start 2P';
            //fishfries
            /*  this.fishfries = this.game.add.image(840, -140, "fishfries");
              this.fishfries.anchor.set(.5);
              this.fishfries.alpha = 0;
              
  */
            this.buttonsGroup = this.game.add.group();
            //date
            _style = { font: 'normal 25px', fill: '#ffffff', stroke: '#000000', strokeThickness: 8 };
            var _date = this.game.add.text(this.game.world.centerX, 190, "Every 21 September in Salerno", _style);
            _date.anchor.set(.5);
            _date.alpha = 0;
            _date.font = 'Press Start 2P';
            this.game.add.tween(_date).to({ alpha: 1 }, 1500, Phaser.Easing.Sinusoidal.InOut, true, 1500, 0, false);
            _style = { font: 'normal 27px', fill: '#ff0000', stroke: '#ffffff', strokeThickness: 5 };
            var _deluca = this.game.add.text(200, 390, "THE\n GOVERNOR", _style);
            _deluca.anchor.set(0.5);
            _deluca.alpha = 0;
            _deluca.font = 'Press Start 2P';
            this.game.add.tween(_deluca).to({ alpha: 1, x: 350 }, 1500, Phaser.Easing.Sinusoidal.InOut, true, 1500, 0, false).onComplete.add(function () {
                _this.game.add.tween(_deluca).to({ x: _deluca.x - 30 }, 1500, Phaser.Easing.Sinusoidal.InOut, true, 0, -1, true);
            });
            _style = { font: 'normal 27px', fill: '#ff0000', stroke: '#ffffff', strokeThickness: 5 };
            var _enemyB = this.game.add.text(800, 300, "EVIL\n TRAFFIC", _style);
            _enemyB.anchor.set(0.5);
            _enemyB.alpha = 0;
            _enemyB.font = 'Press Start 2P';
            this.game.add.tween(_enemyB).to({ alpha: 1, x: 660 }, 1500, Phaser.Easing.Sinusoidal.InOut, true, 1500, 0, false)
                .onComplete.add(function () {
                _this.game.add.tween(_enemyB).to({ x: _enemyB.x + 30 }, 1500, Phaser.Easing.Sinusoidal.InOut, true, 0, -1, true);
            });
            //btn Green
            this.btnGreen = this.game.add.sprite(300, 680, "btnGreen");
            this.btnGreen.anchor.setTo(0.5);
            _style = { font: 'normal 18px', fill: '#ffffff', stroke: '#368005', strokeThickness: 6 };
            var _spriteText = this.game.add.text(0, 4, 'PLAY', _style);
            _spriteText.font = 'Press Start 2P';
            _spriteText.anchor.set(0.5);
            this.btnGreen.addChild(_spriteText);
            this.btnGreen.inputEnabled = true;
            this.btnGreen.events.onInputDown.add(function () {
                k2016Game.stopSound(k2016Game.gameSound.intro);
                k2016Game.goState("Game", this.game);
            }, this);
            //btn Blue
            this.btnBlue = this.game.add.sprite(500, 650, "btnBlue");
            this.btnBlue.anchor.setTo(0.5);
            _style = { font: 'normal 17px', fill: '#ffffff', stroke: '#00577f', strokeThickness: 6 };
            var _spriteText = this.game.add.text(0, 4, 'HOW2PLAY', _style);
            _spriteText.font = 'Press Start 2P';
            _spriteText.anchor.set(0.5);
            this.btnBlue.addChild(_spriteText);
            this.btnBlue.inputEnabled = true;
            this.btnBlue.events.onInputDown.add(function () {
                this.openHow2play();
            }, this);
            //btn Purple
            this.btnPurple = this.game.add.sprite(700, 650, "btnPurple");
            this.btnPurple.anchor.setTo(0.5);
            _style = { font: 'normal 15px', fill: '#ffffff', stroke: '#5c0077', strokeThickness: 6 };
            var _spriteText = this.game.add.text(0, 4, 'TOP BOORS', _style);
            _spriteText.font = 'Press Start 2P';
            _spriteText.anchor.set(0.5);
            this.btnPurple.addChild(_spriteText);
            this.btnPurple.inputEnabled = true;
            this.btnPurple.events.onInputDown.add(function () {
                this.openCredits();
            }, this);
            this.buttonsGroup.add(this.btnBlue);
            this.buttonsGroup.add(this.btnPurple);
            this.buttonsGroup.add(this.btnGreen);
            /*
              _style = { font: 'normal 15px', fill: '#ffffff', stroke: '#000000', strokeThickness: 5 };
            this._ticketText = this.game.add.text(this.game.world.centerX, 565, "Play, share your score on FB, the best will win 1 free Ticket!!", _style);
            this._ticketText.anchor.set(.5);
            this._ticketText.alpha = 0;
            this._ticketText.font = 'Press Start 2P';
             this.game.add.tween( this._ticketText).to({alpha: 1 }, 2000, Phaser.Easing.Cubic.Out, true, 3000);

             this._timerText = this.game.add.text(this.game.world.centerX, 590, "", _style);
              this._timerText.anchor.set(.5);
            this._timerText.alpha = 0;
            this._timerText.font = 'Press Start 2P';
             this.game.add.tween( this._timerText).to({alpha: 1 }, 2000, Phaser.Easing.Cubic.Out, true, 4000);
*/
            //how2play screen start
            //------------------------------------------
            this.how2playGroup = this.game.add.group();
            this.how2playGroup.inputEnableChildren = false;
            var layer = this.game.add.image(0, 0, "howToPlay");
            layer.inputEnabled = true;
            layer.events.onInputDown.add(function () {
                this.closeHow2play();
            }, this);
            var player = this.game.add.sprite(this.game.world.centerX, 150, "playerEmpty");
            var car = this.game.add.sprite(0, 0, "playerCar");
            car.anchor.set(.5);
            var deluca = this.game.add.sprite(8, -33, "playerDeluca");
            deluca.anchor.set(.5);
            deluca.scale.set(2);
            deluca.frame = 2;
            this.game.add.tween(deluca).to({ y: deluca.y - 3 }, 200, Phaser.Easing.Quadratic.Out, true, 0, -1, true);
            var sirena = this.game.add.sprite(-20, -40, "playerSirena");
            sirena.anchor.set(.5);
            sirena.animations.add("run", [0, 1, 2, 3], 20, true).play();
            this.game.add.tween(sirena).to({ y: sirena.y - 3.5 }, 200, Phaser.Easing.Quadratic.Out, true, 0, -1, true);
            this.game.add.tween(car).to({ y: car.y - 3.5 }, 200, Phaser.Easing.Quadratic.Out, true, 0, -1, true);
            var wheels = [];
            wheels.push(this.game.add.sprite(-20, 25, "playerWheel"));
            wheels.push(this.game.add.sprite(45, 25, "playerWheel"));
            wheels[0].anchor.set(.5);
            wheels[1].anchor.set(.5);
            player.addChild(wheels[0]);
            player.addChild(wheels[1]);
            player.addChild(deluca);
            player.addChild(car);
            player.addChild(sirena);
            var boor = this.game.add.sprite(this.game.world.centerX, 290, "scooter");
            boor.animations.add("run", [0, 1], 10, true).play();
            boor.anchor.set(.5);
            this.game.add.tween(boor).to({ y: boor.y - 2.8 }, 170, Phaser.Easing.Quadratic.Out, true, 0, -1, true);
            this.how2playGroup.add(layer);
            this.how2playGroup.add(player);
            this.how2playGroup.add(boor);
            /*this.how2playGroup.add(deluca);
            this.how2playGroup.add(bunnie);
            this.how2playGroup.add(bunnie2);*/
            this.how2playGroup.x = -1024;
            this.how2playGroup.alpha = 0;
            //how2play screen end
            //------------------------------------------
            //credits screen start
            //------------------------------------------
            /*    this.creditGroup = this.game.add.group();
                this.creditGroup.inputEnableChildren = false;
    
                var info = this.game.add.image(0, 0, "info");
                info.inputEnabled = true;
                info.events.onInputDown.add(function () {
                    this.closeCredits();
                }, this);
    
    
                this.creditGroup.add(info);
                this.creditGroup.x = -1024;
                this.creditGroup.alpha = 0;
    */
            //credits screen end
            //------------------------------------------
            //setFirstTime(false);
            this.openCurtain();
            // this.countDown();
            // if (getFirstTime()) { this.textWriter(0); } else { this.openCurtain() }
            //this.game.time.events.loop(Phaser.Timer.SECOND, this.countDown, this);
        };
        Menu.prototype.countDown = function () {
            var now = new Date().getTime();
            // Find the distance between now an the count down date
            var distance = this._countDownDate - now;
            // Time calculations for days, hours, minutes and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            // Output the result in an element with id="demo"
            this._timerText.text = days + " DAYS, " + hours + " HOURS, "
                + minutes + " MINUTES, " + seconds + " SECONDS TO THE EVENT!";
            // If the count down is over, write some text 
            if (distance < 0) {
                this._timerText.text = "ON FLY!";
            }
        };
        Menu.prototype.render = function () {
            // this.game.debug.text(this.game.time.fps + "", 2, 14, "#00ff00");
        };
        Menu.prototype.openCredits = function () {
            var win = window.open("/halloffame.html", '_blank');
            win.focus();
            /*
                    this.game.time.events.add(300, function () { playSound(gameSound.lightsaber); }, this);
                    this.buttonsGroup.ignoreChildInput = true;
                    var tween = this.game.add.tween(this.creditGroup).to({ x: 0, alpha: 1 }, 500, Phaser.Easing.Cubic.Out, true, 600);
                    tween.onComplete.add(function () {
        
                        this.creditGroup.ignoreChildInput = false;
        
                    }, this);
                    */
        };
        Menu.prototype.closeCredits = function () {
            this.game.time.events.add(300, function () { k2016Game.playSound(k2016Game.gameSound.cafone); }, this);
            this.creditGroup.ignoreChildInput = true;
            var tween = this.game.add.tween(this.creditGroup).to({ x: -1024, alpha: 0 }, 500, Phaser.Easing.Cubic.Out, true, 600);
            tween.onComplete.add(function () {
                this.buttonsGroup.ignoreChildInput = false;
            }, this);
        };
        Menu.prototype.openHow2play = function () {
            this.game.time.events.add(500, function () { k2016Game.playSound(k2016Game.gameSound.chebello); }, this);
            this.buttonsGroup.ignoreChildInput = true;
            var tween = this.game.add.tween(this.how2playGroup).to({ x: 0, alpha: 1 }, 500, Phaser.Easing.Cubic.Out, true, 0);
            tween.onComplete.add(function () {
                this.how2playGroup.ignoreChildInput = false;
            }, this);
        };
        Menu.prototype.closeHow2play = function () {
            //this.game.time.events.add(300, function () { playSound(gameSound.bestia); }, this);
            this.how2playGroup.ignoreChildInput = true;
            var tween = this.game.add.tween(this.how2playGroup).to({ x: -1024, alpha: 0 }, 500, Phaser.Easing.Cubic.Out, true, 0);
            tween.onComplete.add(function () {
                this.buttonsGroup.ignoreChildInput = false;
            }, this);
        };
        Menu.prototype.openCurtain = function () {
            k2016Game.setFirstTime(false);
            k2016Game.playSound(k2016Game.gameSound.intro);
            this.game.add.tween(this.gameTitle).to({ y: 80, alpha: 1 }, 1000, Phaser.Easing.Cubic.Out, true);
            this.game.add.tween(this.gameSubTitle).to({ x: this.game.world.centerX, alpha: 1 }, 1000, Phaser.Easing.Cubic.Out, true, 800);
            //this.game.add.tween(this.fishfries).to({ y: 150, alpha: 1 }, 1000, Phaser.Easing.Bounce.Out, true, 1400);
            this.game.add.tween(this.btnGreen).to({ y: 550 }, 1000, Phaser.Easing.Cubic.Out, true, 3000);
            this.game.add.tween(this.btnBlue).to({ y: 550 }, 1000, Phaser.Easing.Cubic.Out, true, 3200);
            this.game.add.tween(this.btnPurple).to({ y: 550 }, 1000, Phaser.Easing.Cubic.Out, true, 3400);
        };
        Menu.prototype.update = function () {
            this.cloud1.tilePosition.x -= 0.3;
            this.cloud2.tilePosition.x -= 0.1;
        };
        return Menu;
    }(Phaser.State));
    k2016Game.Menu = Menu;
})(k2016Game || (k2016Game = {}));
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>
var k2016Game;
(function (k2016Game) {
    var GameState = (function (_super) {
        __extends(GameState, _super);
        function GameState() {
            var _this = _super.call(this) || this;
            _this.realScore = 0;
            _this.level = 0;
            _this.velLevel = 0;
            _this.readyOnce = false;
            _this.ratio = 0;
            _this.enemyType = [
                {
                    sprite: "block1",
                    frame: 0,
                    //animation: { frames: [0], rate: 20 },
                    damage: 200,
                    destroyable: true
                },
                {
                    sprite: "block1",
                    frame: 2,
                    damage: 150,
                    destroyable: true
                },
                {
                    sprite: "block1",
                    frame: 1,
                    damage: 100,
                    destroyable: true
                },
                {
                    sprite: "block1",
                    frame: 3,
                    damage: 50,
                    destroyable: true
                }
            ];
            return _this;
        }
        GameState.prototype.preload = function () {
        };
        GameState.prototype.create = function () {
            //   console.log(getScore())
            //   console.log("setscore")
            k2016Game.setScore({ score: 0, ratio: 0, path: 0, energy: 0 });
            this.realScore = 0;
            this.back1 = 0;
            this.back2 = 0;
            this.back3 = 0;
            this.back4 = 0;
            this.back5 = 0;
            this.level = 0;
            this.gameTimer = this.game.time.create(false);
            this.gameTimer.loop(10000, this.updateLevel, this);
            this.randomBonusSpawnTime = this.game.time.now;
            this.randomEnemySpawnTime = this.game.time.now;
            this.game.stage.backgroundColor = "#4488AA";
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.physics.arcade.gravity.y = 2000;
            this.introSky = this.game.add.tileSprite(0, -50, 1024, 650, 'introSky');
            this.introSky.fixedToCamera = true;
            this.introCloud1 = this.game.add.tileSprite(0, 0, 1024, 300, 'cloud1');
            this.introCloud1.fixedToCamera = true;
            this.introCloud1.tilePosition.x = 0;
            this.introCloud2 = this.game.add.tileSprite(0, 0, 1024, 300, 'cloud2');
            this.introCloud2.fixedToCamera = true;
            this.introCloud2.tilePosition.x = 0;
            this.introRocks = this.game.add.tileSprite(0, 298, 1024, 96, 'introRocks');
            this.introRocks.fixedToCamera = true;
            this.street1 = this.game.add.tileSprite(0, 331, 1024, 109, 'street1');
            this.street1.fixedToCamera = true;
            this.street2 = this.game.add.tileSprite(0, 440, 1024, 32, 'street2');
            this.street2.fixedToCamera = true;
            this.street3 = this.game.add.tileSprite(0, 472, 1024, 53, 'street3');
            this.street3.fixedToCamera = true;
            this.street4 = this.game.add.tileSprite(0, 523, 1024, 77, 'street4');
            this.street4.fixedToCamera = true;
            this.ground = this.game.add.sprite(this.game.world.centerX, 510, this.game.cache.getBitmapData('ground'));
            this.physics.arcade.enable(this.ground);
            this.ground.anchor.setTo(0.5, 0.5);
            this.ground.body.immovable = true;
            this.ground.fixedToCamera = true;
            this.ground.visible = false;
            this.ground.body.allowGravity = false;
            var _style = { font: 'normal 40px', fill: '#ffffff', stroke: '#1d5779', strokeThickness: 10 };
            this.readyText = this.game.add.text(this.game.world.width / 2, this.game.world.height / 2, 'Tap to start!', _style);
            this.readyText.font = 'Press Start 2P';
            this.readyText.anchor.set(0.5);
            this.groupAll = this.game.add.group();
            this.groupHud = this.game.add.group();
            this.energyObj = new k2016Game.gameEnergy(this.game);
            this.energyObj.signal.add(this.gameOver, this);
            _style = { font: 'normal 25px', fill: '#ffffff', stroke: '#aaaaaa', strokeThickness: 5 };
            this.score = this.game.add.text(85, 60, '0', _style);
            this.score.font = 'Press Start 2P';
            this.score.anchor.set(0);
            this.groupHud.add(this.score);
            this.groupHud.fixedToCamera = false;
            this.player = new k2016Game.PlayerCar(this.game, this);
            this.groupAll.add(this.player);
            k2016Game.stopSound(k2016Game.gameSound.intro);
            k2016Game.playSound(k2016Game.gameSound.ingame);
            this.game.input.onDown.addOnce(function () { this.start = true; }, this);
        };
        GameState.prototype.update = function () {
            this.introCloud1.tilePosition.x -= 0.07;
            this.introCloud2.tilePosition.x -= 0.03;
            //make it only one time                
            if (this.start) {
                if (!this.readyOnce) {
                    this.gameTimer.start();
                    this.energyObj.start();
                    this.readyOnce = true;
                    this.readyText.text = "GO!!!!";
                    this.game.add.tween(this.readyText).to({ alpha: 0 }, 500, Phaser.Easing.Quadratic.In, true, 0);
                    this.tweenScroll({ back1: 0, back2: 0, back3: 0, back4: 0, back5: 0 }, { back1: 13, back2: 13, back3: 13.5, back4: 14, back5: 1 }, 1000);
                    // this.tweenScroll({ back1: 0, back2: 0, back3: 0, back4: 0, back5: 0 }, { back1: 30, back2: 30, back3: 30.5, back4: 31, back5: 1 }, 100000);
                    this.player.start();
                    this.randomBonusSpawnTime = this.game.time.now + 2000;
                }
                this.game.physics.arcade.overlap(this.groupAll, this.player, this.collisionHandler, null, this);
                this.spawn();
            }
            this.groupAll.sort('y', Phaser.Group.SORT_ASCENDING);
            this.updateBackckgroud();
        };
        GameState.prototype.updateLevel = function () {
            // console.log("update level")
            if (this.start) {
                this.level++;
                this.velLevel = this.level;
                if (this.velLevel == 9)
                    this.velLevel = 8;
                // console.log("level:", this.level, this.velLevel);
                var _mol = .15;
                this.tweenScroll({ back1: this.back1, back2: this.back2, back3: this.back3, back4: this.back4, back5: 1 }, { back1: this.back1 + (this.velLevel * _mol), back2: this.back2 + (this.velLevel * _mol), back3: this.back3 + (this.velLevel * _mol), back4: this.back4 + (this.velLevel * _mol), back5: 1 }, 5000);
            }
        };
        GameState.prototype.spawn = function () {
            if ((this.randomBonusSpawnTime < this.game.time.now) && this.start) {
                this.randomBonusSpawnTime = this.game.time.now + this.getSpawnLevel();
                //let type: any = this.enemyType[this.game.rnd.integerInRange(0, this.enemyType.length - 1)];
                if (this.game.rnd.integerInRange(0, 100) > 80) {
                    this.groupAll.add(new k2016Game.Bonus(this.game, this));
                    this.ratio++;
                }
                else {
                    var type = this.enemyType[this.game.rnd.integerInRange(0, this.enemyType.length - 1)];
                    this.groupAll.add(new k2016Game.Enemy(this.game, this, type));
                }
            }
        };
        GameState.prototype.getSpawnLevel = function () {
            var _s = Math.abs((550 - (this.level * 37)));
            if (_s < 100)
                _s = 100;
            // console.log(_s)
            return _s;
        };
        GameState.prototype.collisionHandler = function (_player, _enemy) {
            //return;
            //console.log(_player.currentLane, _enemy.lane)
            if (_player.lane == _enemy.lane) {
                if (_enemy.name == "bonus") {
                    this.tweenScore(100);
                    _enemy.kill();
                    _enemy.destroy();
                    var bonusS = this.game.rnd.integerInRange(0, 2);
                    if (bonusS == 0) {
                        k2016Game.playSound(k2016Game.gameSound.bonus);
                    }
                    else if (bonusS == 1) {
                        k2016Game.playSound(k2016Game.gameSound.cafone);
                    }
                    else {
                        k2016Game.playSound(k2016Game.gameSound.cafonemotorizzato);
                    }
                    var blood = this.game.add.sprite(_enemy.x - 50, _enemy.y - 50, "blood");
                    blood.animations.add("schizzo", [0, 1, 2, 3, 4, 5, 6, 7], 30, false).onComplete.add(function (sprite) { sprite.kill(); sprite.destroy(); }, blood);
                    blood.play("schizzo");
                    blood.anchor.set(.5);
                }
                else {
                    if (_enemy.isDestroyable) {
                        // this.tweenScore(_enemy.score);
                        this.energyObj.removeEnergy(_enemy.playerDamage);
                        //this.energyObj.removeEnergy(1)
                        this.game.camera.flash();
                        k2016Game.playSound(k2016Game.gameSound.explosion);
                        this.game.time.events.add(150, function () { k2016Game.playSound(k2016Game.gameSound.bestia); }, this);
                        this.groupAll.add(new k2016Game.Explosion(this.game, this, _enemy.x, _enemy.y, "exp3", _enemy.name));
                        _enemy.explode();
                    }
                    else if (!_enemy.isDestroyable) {
                        this.gameOver(_enemy);
                    }
                }
            }
        };
        GameState.prototype.tweenScore = function (end) {
            var obj = this.score;
            var scoreValue = { score: 0, end: end, start: this.realScore };
            this.realScore = this.realScore + end;
            var scoreTween = this.game.add.tween(scoreValue).to({ score: scoreValue.end }, 200, Phaser.Easing.Quadratic.Out);
            scoreTween.onUpdateCallback(function () { obj.text = (scoreValue.start + Math.round(scoreValue.score)) + ""; });
            scoreTween.onComplete.add(function () { obj.text = "" + (scoreValue.start + scoreValue.end); }, this);
            scoreTween.start();
        };
        ;
        GameState.prototype.render = function () {
            //this.game.debug.text('Elapsed seconds: ' +   this.game.time.elapsedSecondsSince(this.game.time.now), 32, 32);
            // this.game.debug.bodyInfo(this.player, 32, 32);
            //this.game.debug.body(this.player);
        };
        GameState.prototype.updateBackckgroud = function () {
            this.street1.tilePosition.x -= this.back1;
            this.street2.tilePosition.x -= this.back2;
            this.street3.tilePosition.x -= this.back3;
            this.street4.tilePosition.x -= this.back4;
            this.introRocks.tilePosition.x -= this.back5;
        };
        GameState.prototype.win = function () {
            var _this = this;
            console.log("win");
            this.game.tweens.remove(this.backTween);
            this.gameTimer.destroy();
            this.start = false;
            this.readyOnce = false;
            var vals = this.energyObj.getValues();
            ((parseInt(this.score.text) / 100) * 100) / this.ratio;
            k2016Game.setScore({ score: parseInt(this.score.text), ratio: parseInt(((parseInt(this.score.text) / 100) * 100) / this.ratio), path: vals.path, energy: vals.energy });
            console.log(k2016Game.getScore());
            this.game.time.events.add(1000, function () {
                _this.tweenScroll({ back1: _this.back1, back2: _this.back2, back3: _this.back3, back4: _this.back4, back5: 1 }, { back1: 0, back2: 0, back3: 0, back4: 0, back5: 0 }, 3000);
                _this.groupAll.add(new k2016Game.End(_this.game, _this));
                _this.game.add.tween(_this.player).to({ x: 1100 }, 2000, Phaser.Easing.Quadratic.In, true, 0, 0, false).onComplete.add(function () {
                    _this.game.camera.fade(0xffffff, 1000, true);
                    _this.game.time.events.add(1000, function () {
                        k2016Game.stopSound(k2016Game.gameSound.ingame);
                        k2016Game.goState("Gamewin", _this.game);
                    });
                }, _this);
                // this.player.win();
            }, this);
            //this.tweenScroll({ back1: this.back1, back2: this.back2, back3: this.back3, back4: this.back4, back5: 1 }, { back1: 0, back2: 0, back3: 0, back4: 0, back5: 0 }, 3000);
            //this.player.tweenAngle(22, 0, 1000, 0);
        };
        GameState.prototype.gameOver = function (_enemy) {
            var _this = this;
            console.log("gameover");
            this.start = false;
            this.readyOnce = false;
            this.game.tweens.remove(this.backTween);
            this.gameTimer.destroy();
            /* if (_enemy != undefined) {
                     this.groupAll.add(new Explosion(this.game, this, _enemy.x, _enemy.y, "exp3", "player"));
                     _enemy.kill();
                     _enemy.destroy()
             }*/
            //this.gameTheme.stop();
            this.start = false;
            this.groupAll.add(new k2016Game.Explosion(this.game, this, this.player.x + 30, this.player.y + 50, "exp3", "player"));
            this.player.gameOver();
            this.tweenScroll({ back1: this.back1, back2: this.back2, back3: this.back3, back4: this.back4, back5: 1 }, { back1: 0, back2: 0, back3: 0, back4: 0, back5: 0 }, 1000);
            var vals = this.energyObj.getValues();
            ((parseInt(this.score.text) / 100) * 100) / this.ratio;
            k2016Game.setScore({ score: parseInt(this.score.text), ratio: parseInt(((parseInt(this.score.text) / 100) * 100) / this.ratio), path: vals.path, energy: vals.energy });
            console.log(k2016Game.getScore());
            this.game.time.events.add(1000, function () {
                k2016Game.stopSound(k2016Game.gameSound.ingame);
                k2016Game.goState("Gameover", _this.game);
            });
            //goState("Gameover", this.game);
        };
        ;
        GameState.prototype.tweenScroll = function (_start, _end, _time) {
            // console.log("tweenscroll",_end)
            var backValue = _start;
            var backEnd = _end;
            this.backTween = this.game.add.tween(backValue).to(backEnd, _time, Phaser.Easing.Quadratic.Out);
            this.backTween.onUpdateCallback(function () {
                this.back1 = backValue.back1;
                this.back2 = backValue.back2;
                this.back3 = backValue.back3;
                this.back4 = backValue.back4;
                this.back5 = backValue.back5;
            }, this);
            this.backTween.start();
        };
        return GameState;
    }(Phaser.State));
    k2016Game.GameState = GameState;
})(k2016Game || (k2016Game = {}));
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>
var k2016Game;
(function (k2016Game) {
    var GameOver = (function (_super) {
        __extends(GameOver, _super);
        function GameOver() {
            var _this = _super.call(this) || this;
            _this.insulti = [
                "Personaggetto!",
                "Cafone!",
                "Consumatore abusivo di ossigeno!",
                "Imbecille!",
                "Imbecille e cafone!",
                "Personaggetto col sorrisetto!",
                "Cialtrone!",
                "Affannato mentale!",
                "Cialtroneria pura!",
                "Ti devono ammazzare!",
                "Sei peggio di Travaglio!",
                "Sei come GIGGINO o webmaster!",
                "La Bindi ti fa un baffo!",
                "Sei il congiuntivo di\nDi Battista!"
            ];
            return _this;
        }
        GameOver.prototype.create = function () {
            //this.game.world.setBounds(0, 0, 1200, 600);
            //this.game.world.x=0;  
            this.game.add.tileSprite(0, 0, 1024, 800, "introSky");
            this.cloud1 = this.game.add.tileSprite(0, 0, 1024, 300, 'cloud1');
            this.cloud1.fixedToCamera = true;
            this.cloud2 = this.game.add.tileSprite(0, 0, 1024, 300, 'cloud2');
            this.cloud2.fixedToCamera = true;
            this.game.add.tileSprite(0, 298, 1024, 96, 'introRocks');
            this.game.add.tileSprite(0, 331, 1024, 109, 'street1');
            this.game.add.tileSprite(0, 440, 1024, 32, 'street2');
            this.game.add.tileSprite(0, 472, 1024, 53, 'street3');
            this.game.add.tileSprite(0, 523, 1024, 77, 'street4');
            var _podium = this.game.add.sprite(this.game.world.centerX + 50, this.game.world.centerY + 200, 'podium');
            _podium.anchor.set(.5);
            var _del = this.game.add.sprite(0, 0, 'delGameover');
            _del.anchor.set(.5);
            _del.animations.add("cry", [2, 0, 1, 0], 5, true).play();
            var _win1 = this.game.add.sprite(562, 380, 'winners');
            _win1.anchor.set(.5);
            _win1.frame = this.game.rnd.integerInRange(0, 4);
            var _win2 = this.game.add.sprite(630, 440, 'winners');
            _win2.anchor.set(.5);
            _win2.frame = this.game.rnd.integerInRange(0, 4);
            this.game.add.sprite(this.game.world.centerX, this.game.world.centerY + 70, 'cup1');
            this.game.add.sprite(this.game.world.centerX - 70, this.game.world.centerY + 135, 'cup2');
            this.game.add.sprite(this.game.world.centerX + 120, this.game.world.centerY + 155, 'cup3');
            var _style = { font: 'normal 60px', fill: '#ffffff', stroke: '#000000', strokeThickness: 10 };
            var _gameOverText = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 130, 'GAME OVER', _style);
            _gameOverText.font = 'Press Start 2P';
            _gameOverText.anchor.set(0.5);
            var deluca = this.game.add.sprite(0, 600, 'delucaMenu');
            deluca.pivot.set(0, deluca.height);
            //btn Green
            this.btnGreen = this.game.add.sprite(900, 40, "btnGreen");
            this.btnGreen.anchor.setTo(0.5);
            _style = { font: 'normal 18px', fill: '#ffffff', stroke: '#368005', strokeThickness: 6 };
            var _spriteText = this.game.add.text(0, 4, 'PLAY', _style);
            _spriteText.font = 'Press Start 2P';
            _spriteText.anchor.set(0.5);
            this.btnGreen.addChild(_spriteText);
            this.btnGreen.inputEnabled = true;
            this.btnGreen.events.onInputDown.add(function () {
                // stopSound(gameSound.gameover);
                k2016Game.setScore(0);
                k2016Game.stopSound(k2016Game.gameSound.gameover);
                k2016Game.goState("Game", this.game);
            }, this);
            /*  //btn Blue
              this.btnBlue = this.game.add.sprite(900, 90, "btnBlue");
              this.btnBlue.anchor.setTo(0.5);
              _style = { font: 'normal 18px', fill: '#ffffff', stroke: '#00577f', strokeThickness: 6 };
              var _spriteText = this.game.add.text(0, 4, 'SHARE', _style);
              _spriteText.font = 'Press Start 2P';
              _spriteText.anchor.set(0.5);
              this.btnBlue.addChild(_spriteText);
              this.btnBlue.inputEnabled = true;
              this.btnBlue.events.onInputDown.add(function () {
                 // getLoginStatus();
              }, this);
  
              */
            //btn Red
            this.btnRed = this.game.add.sprite(900, 100, "btnRed");
            this.btnRed.anchor.setTo(0.5);
            _style = { font: 'normal 18px', fill: '#ffffff', stroke: '#851600', strokeThickness: 6 };
            var _spriteText = this.game.add.text(0, 4, 'MENU', _style);
            _spriteText.font = 'Press Start 2P';
            _spriteText.anchor.set(0.5);
            this.btnRed.addChild(_spriteText);
            this.btnRed.inputEnabled = true;
            this.btnRed.events.onInputDown.add(function () {
                k2016Game.stopSound(k2016Game.gameSound.gameover);
                k2016Game.goState("Menu", this.game);
            }, this);
            k2016Game.playSound(k2016Game.gameSound.gameover);
            _style = { font: 'normal 25px', fill: '#ffffff', stroke: '#000000', strokeThickness: 5 };
            //console.log(getScore())
            var _score = k2016Game.getScore();
            var numC = (_score.score / 100);
            var _text = "";
            if (numC == 0) {
                _text = 'Non hai arrotato nessun cafone!\n';
                _del.x = 640;
                _del.y = 440;
                _win2.x = 480;
                _win2.y = 430;
            }
            else if (numC == 1) {
                _text = 'Hai arrotato un solo cafone!\n';
                _del.x = 640;
                _del.y = 440;
                _win2.x = 480;
                _win2.y = 430;
            }
            else {
                _text = 'Hai arrotato solo ' + numC + ' cafoni!\n';
                _win2.x = 630;
                _win2.y = 440;
                _del.x = 500;
                _del.y = 430;
            }
            _text = _text + this.insulti[this.game.rnd.integerInRange(0, this.insulti.length - 1)];
            var _gameOverSpeech = this.game.add.text(210, 250, _text, _style);
            _gameOverSpeech.font = 'Press Start 2P';
            var _anonymous = k2016Game.getUrlParameter("anonymous") ? true : false;
            if (!_anonymous) {
                k2016Game.saveScore();
            }
        };
        GameOver.prototype.update = function () {
            this.cloud1.tilePosition.x -= 0.3;
            this.cloud2.tilePosition.x -= 0.1;
        };
        return GameOver;
    }(Phaser.State));
    k2016Game.GameOver = GameOver;
})(k2016Game || (k2016Game = {}));
/// <reference path="Lib/phaser.d.ts"/>
/// <reference path="Lib/jquery.d.ts"/>
/// <reference path="Lib/firebase.d.ts"/>
/// <reference path="States/Preloader.ts"/>
/// <reference path="States/Boot.ts"/>
/// <reference path="States/Menu.ts"/>
/// <reference path="States/Game.ts"/>
/// <reference path="States/GameOver.ts"/>
var k2016Game;
(function (k2016Game) {
    var _newGame;
    var _playerScore = 0;
    var _firstTime = true;
    var _level = 2;
    var _game;
    var _gameSetup = false;
    var _gameSounds = [];
    var _ismobile = true;
    function setFirstTime(_val) { _firstTime = _val; }
    k2016Game.setFirstTime = setFirstTime;
    function getFirstTime() { return _firstTime; }
    k2016Game.getFirstTime = getFirstTime;
    function getScore() { return _playerScore; }
    k2016Game.getScore = getScore;
    function setScore(val) { _playerScore = val; }
    k2016Game.setScore = setScore;
    function setGame(game) { _game = game; }
    k2016Game.setGame = setGame;
    function getGame() { return _game; }
    k2016Game.getGame = getGame;
    function getSound(_sound) {
        return _gameSounds[_sound];
    }
    k2016Game.getSound = getSound;
    function playSound(_sound) {
        _gameSounds[_sound].play();
    }
    k2016Game.playSound = playSound;
    function stopSound(_sound) {
        _gameSounds[_sound].stop();
    }
    k2016Game.stopSound = stopSound;
    function pauseSound(_sound) {
        _gameSounds[_sound].stop();
    }
    k2016Game.pauseSound = pauseSound;
    function setSoundVolume(_sound, _volume) {
        _gameSounds[_sound].volume = _volume;
    }
    k2016Game.setSoundVolume = setSoundVolume;
    var gameSound;
    (function (gameSound) {
        gameSound[gameSound["intro"] = 0] = "intro";
        gameSound[gameSound["ingame"] = 1] = "ingame";
        gameSound[gameSound["gameover"] = 2] = "gameover";
        gameSound[gameSound["win"] = 3] = "win";
        gameSound[gameSound["explosion"] = 4] = "explosion";
        gameSound[gameSound["bonus"] = 5] = "bonus";
        gameSound[gameSound["bestia"] = 6] = "bestia";
        gameSound[gameSound["cafonemotorizzato"] = 7] = "cafonemotorizzato";
        gameSound[gameSound["cafone"] = 8] = "cafone";
        gameSound[gameSound["chebello"] = 9] = "chebello";
        gameSound[gameSound["imbecille"] = 10] = "imbecille";
        gameSound[gameSound["ehhh"] = 11] = "ehhh";
    })(gameSound = k2016Game.gameSound || (k2016Game.gameSound = {}));
    function setUpGame(_game) {
        if (!_gameSetup) {
            setGame(_game);
            var _sound;
            for (var i = 0; i < gameData.assets.sounds.length; i++) {
                _sound = _game.add.audio(gameData.assets.sounds[i].name, gameData.assets.sounds[i].volume, gameData.assets.sounds[i].loop);
                _sound.allowMultiple = true;
                _gameSounds.push(_sound);
            }
            _gameSetup = true;
        }
    }
    k2016Game.setUpGame = setUpGame;
    function isMobile() {
        return _ismobile;
    }
    k2016Game.isMobile = isMobile;
    function setDevice(isMobile) {
        _ismobile = isMobile;
    }
    k2016Game.setDevice = setDevice;
    function getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)), sURLVariables = sPageURL.split('&'), sParameterName, i;
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    }
    k2016Game.getUrlParameter = getUrlParameter;
    ;
    function goState(_state, _game) {
        var st = _game.plugins.add(Phaser.Plugin.StateTransition);
        if (isMobile()) {
            st.configure({
                duration: 1000,
                ease: Phaser.Easing.Exponential.InOut,
                properties: { alpha: 0 }
            });
        }
        else {
            st.configure({
                duration: 1000,
                ease: Phaser.Easing.Exponential.InOut,
                properties: { alpha: 0, scale: { x: 1.5, y: 1.5 } }
            });
        }
        st.to(_state);
    }
    k2016Game.goState = goState;
    function saveScore() {
        console.log(getScore());
        $.ajax({
            url: "http://www.zero89.it/api/jsonp/scores/core.aspx",
            data: { who: "save", game: "twd", name: "Anonimous", callback: "gamescores", score: JSON.stringify(getScore()) },
            dataType: "jsonp",
            type: "POST",
            jsonpCallback: "gamescores",
            context: document.body
        }).done(function (data) { }).fail(function (err) { console.log(err); });
    }
    k2016Game.saveScore = saveScore;
    var initGame = (function () {
        function initGame(width, height) {
            var dpr = 1;
            try {
                if (devicePixelRatio != undefined) {
                    dpr = devicePixelRatio || 1;
                    if (!width) {
                        width = screen.width * dpr;
                    }
                    if (!height) {
                        height = screen.height * dpr;
                    }
                }
            }
            catch (err) { }
            this.game = new Phaser.Game(width, height, Phaser.CANVAS, "", null, false, true);
            this.game.state.add("Boot", k2016Game.Boot, false);
            this.game.state.add("Preloader", k2016Game.Preloader, false);
            this.game.state.add("Menu", k2016Game.Menu, false);
            this.game.state.add("Game", k2016Game.GameState, false);
            this.game.state.add("Gameover", k2016Game.GameOver, false);
            this.game.state.add("Gamewin", k2016Game.Gamewin, false);
            this.game.state.start("Boot");
        }
        return initGame;
    }());
    k2016Game.initGame = initGame;
    window.onresize = function () { };
    window.onload = function () { _newGame = new initGame(1024, 600); };
})(k2016Game || (k2016Game = {}));
// when the page has finished loading, create our game
var WebFontConfig = {
    active: function () { },
    google: {
        families: ['Press Start 2P']
    }
};
var gameData = {
    assets: {
        spritesheets: [
            { name: "exp3", path: "assets/images/game/explosion2.png", width: 80, height: 80, frames: 28 },
            { name: "playerDeluca", path: "assets/images/game/player/playerDeluca.png", width: 27, height: 26, frames: 10 },
            { name: "playerSirena", path: "assets/images/game/player/playerSirena.png", width: 20, height: 23, frames: 4 },
            { name: "scooter", path: "assets/images/game/vehicles/scooter.png", width: 86, height: 91, frames: 4 },
            { name: "blood", path: "assets/images/game/blood.png", width: 126, height: 126, frames: 8 },
            { name: "block1", path: "assets/images/game/vehicles/block1.png", width: 113, height: 86, frames: 4 },
            { name: "delGameover", path: "assets/images/game/gameover.png", width: 66, height: 132, frames: 4 },
            { name: "winners", path: "assets/images/game/winners.png", width: 100, height: 150, frames: 5 },
        ],
        images: [
            { name: "introSky", path: "assets/images/game/sky.png" },
            { name: "introRocks", path: "assets/images/game/rocks.png" },
            { name: "energyLayer1", path: "assets/images/game/energy/energy-layer1.png" },
            { name: "energyLayer2", path: "assets/images/game/energy/energy-layer2.png" },
            { name: "smallCar", path: "assets/images/game/energy/car.png" },
            { name: "cloud1", path: "assets/images/game/cloud1.png" },
            { name: "cloud2", path: "assets/images/game/cloud2.png" },
            { name: "street1", path: "assets/images/game/street1.png" },
            { name: "street2", path: "assets/images/game/street2.png" },
            { name: "street3", path: "assets/images/game/street3.png" },
            { name: "street4", path: "assets/images/game/street4.png" },
            { name: "vs", path: "assets/images/game/menu/vs.png" },
            { name: "howToPlay", path: "assets/images/game/menu/howToPlay.png" },
            { name: "delucaMenu", path: "assets/images/game/menu/deluca-pixelated.png" },
            { name: "btnBlue", path: "assets/images/game/menu/btn-blue.png" },
            { name: "btnRed", path: "assets/images/game/menu/btn-red.png" },
            { name: "btnPurple", path: "assets/images/game/menu/btn-purple.png" },
            { name: "btnGreen", path: "assets/images/game/menu/btn-green.png" },
            { name: "evilTraffic", path: "assets/images/game/menu/evilTraffic.png" },
            { name: "gameoverBg", path: "assets/images/game/menu/bg-halloffame.jpg" },
            { name: "playerEmpty", path: "assets/images/game/player/playerEmpty.png" },
            { name: "playerCar", path: "assets/images/game/player/playerCar.png" },
            { name: "playerWheel", path: "assets/images/game/player/playerWheel.png" },
            { name: "podium", path: "assets/images/game/podium.png" },
            { name: "cup1", path: "assets/images/game/cup1.png" },
            { name: "cup2", path: "assets/images/game/cup2.png" },
            { name: "cup3", path: "assets/images/game/cup3.png" },
            { name: "goal", path: "assets/images/game/goal.png" },
        ],
        sounds: [
            { name: "intro", paths: ["assets/sounds/intro.ogg", "assets/sounds/intro.m4a"], volume: .3, loop: false },
            { name: "ingame", paths: ["assets/sounds/ingame.ogg", "assets/sounds/ingame.m4a"], volume: .5, loop: true },
            { name: "gameover", paths: ["assets/sounds/gameover.ogg", "assets/sounds/gameover.m4a"], volume: .5, loop: true },
            { name: "win", paths: ["assets/sounds/win.ogg", "assets/sounds/win.m4a"], volume: 1, loop: true },
            { name: "explosion", paths: ["assets/sounds/explosion.ogg", "assets/sounds/explosion.m4a"], volume: .2, loop: false },
            { name: "bonus", paths: ["assets/sounds/bonus.ogg", "assets/sounds/bonus.m4a"], volume: 1, loop: false },
            { name: "bestia", paths: ["assets/sounds/bestia.ogg", "assets/sounds/bestia.m4a"], volume: 1, loop: false },
            { name: "cafone-motorizzato", paths: ["assets/sounds/cafone-motorizzato.ogg", "assets/sounds/cafone-motorizzato.m4a"], volume: 1, loop: false },
            { name: "cafone", paths: ["assets/sounds/cafone.ogg", "assets/sounds/cafone.m4a"], volume: 1, loop: false },
            { name: "chebello", paths: ["assets/sounds/chebello.ogg", "assets/sounds/chebello.m4a"], volume: 1, loop: false },
            { name: "imbecille", paths: ["assets/sounds/imbecille.ogg", "assets/sounds/imbecille.m4a"], volume: 1, loop: false },
            { name: "ehhh", paths: ["assets/sounds/ehhh.ogg", "assets/sounds/ehhh.m4a"], volume: 1, loop: false }
        ],
        bitmapfont: []
    }
};
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>
/// <reference path="../States/Game.ts"/>
var k2016Game;
(function (k2016Game) {
    var Bonus = (function (_super) {
        __extends(Bonus, _super);
        function Bonus(game, gameState) {
            var _this = _super.call(this, game, game.camera.x + 1024 + 100, 0, "scooter") || this;
            _this.lanes = [460, 510, 570];
            _this.lane = 0;
            _this.isDestroyable = false;
            _this.game = game;
            _this.gameState = gameState;
            _this.game.physics.arcade.enable(_this);
            _this.body.immovable = false;
            _this.body.allowGravity = false;
            _this.anchor.setTo(.5, 1);
            _this.name = "bonus";
            _this.lane = _this.game.rnd.integerInRange(0, 2);
            if (_this.lane == 0) {
                _this.vel = 10;
            }
            else if (_this.lane == 1) {
                _this.vel = 10.5;
            }
            else {
                _this.vel = 11;
            }
            _this.y = _this.lanes[_this.lane];
            _this.animations.add("run", [0, 1], 10, true).play();
            _this.game.add.tween(_this).to({ y: _this.y - 3 }, 200, Phaser.Easing.Quadratic.Out, true, 0, -1, true);
            game.add.existing(_this);
            return _this;
        }
        Bonus.prototype.setValues = function () {
        };
        Bonus.prototype.update = function () {
            if (this.lane == 0) {
                this.vel = this.gameState.back2;
            }
            else if (this.lane == 1) {
                this.vel = this.gameState.back3;
            }
            else {
                this.vel = this.gameState.back4;
            }
            this.x -= this.vel;
            if (this.x < this.game.camera.x - 130) {
                this.kill();
                this.destroy();
            }
        };
        Bonus.prototype.explode = function () {
            this.kill();
            this.destroy();
        };
        return Bonus;
    }(Phaser.Sprite));
    k2016Game.Bonus = Bonus;
})(k2016Game || (k2016Game = {}));
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>
/// <reference path="../States/Game.ts"/>
var k2016Game;
(function (k2016Game) {
    var End = (function (_super) {
        __extends(End, _super);
        function End(game, gameState) {
            var _this = _super.call(this, game, 1024 + 100, 410, "goal") || this;
            _this.game = game;
            _this.gameState = gameState;
            game.add.existing(_this);
            return _this;
        }
        End.prototype.update = function () {
            this.x -= this.gameState.back4;
        };
        return End;
    }(Phaser.Sprite));
    k2016Game.End = End;
})(k2016Game || (k2016Game = {}));
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>
/// <reference path="../States/Game.ts"/>
var k2016Game;
(function (k2016Game) {
    var Enemy = (function (_super) {
        __extends(Enemy, _super);
        function Enemy(game, gameState, typeObj) {
            var _this = _super.call(this, game, game.camera.x + 1024 + 100, 0, typeObj.sprite) || this;
            _this.lanes = [465, 517, 580];
            _this.lane = 0;
            _this.isDestroyable = false;
            _this.type = typeObj;
            _this.game = game;
            _this.gameState = gameState;
            _this.frame = _this.type.frame;
            _this.game.physics.arcade.enable(_this);
            _this.body.immovable = false;
            _this.body.allowGravity = false;
            _this.anchor.setTo(.5, 1);
            _this.playerDamage = _this.type.damage;
            _this.name = _this.type.sprite;
            _this.score = _this.type.score;
            _this.isDestroyable = _this.type.destroyable;
            _this.lane = _this.game.rnd.integerInRange(0, 2);
            _this.y = _this.lanes[_this.lane];
            game.add.existing(_this);
            return _this;
        }
        Enemy.prototype.setValues = function () {
        };
        Enemy.prototype.update = function () {
            if (this.lane == 0) {
                this.vel = this.gameState.back2;
            }
            else if (this.lane == 1) {
                this.vel = this.gameState.back3;
            }
            else {
                this.vel = this.gameState.back4;
            }
            this.x -= this.vel;
            if (this.x < this.game.camera.x - 130) {
                this.kill();
                this.destroy();
            }
        };
        Enemy.prototype.explode = function () {
            this.kill();
            this.destroy();
        };
        return Enemy;
    }(Phaser.Sprite));
    k2016Game.Enemy = Enemy;
})(k2016Game || (k2016Game = {}));
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>
var k2016Game;
(function (k2016Game) {
    var gameEnergy = (function (_super) {
        __extends(gameEnergy, _super);
        function gameEnergy(game) {
            var _this = _super.call(this, game, 62, 20, 'energyLayer1') || this;
            _this.signal = new Phaser.Signal();
            _this.currentState = _this.game.state.getCurrentState();
            _this.energySprite = _this.game.add.sprite(188, 22, "energyLayer2");
            _this.energySprite.visible = true;
            _this.energySprite.alpha = .9;
            _this.addChild(_this.energySprite);
            _this.carSprite = _this.game.add.sprite(188, 42, "smallCar");
            _this.addChild(_this.carSprite);
            _this.currentState.groupHud.add(_this);
            return _this;
            // this.energySprite.width=100;
        }
        gameEnergy.prototype.getValues = function () {
            //(850-188):100=(this.carSprite.x)-188:x
            //700:100=this.energySprite.width
            return { energy: parseInt(((this.energySprite.width) * 100) / 700), path: parseInt((((this.carSprite.x - 188) * 100) / (850 - 188))) };
        };
        gameEnergy.prototype.start = function () {
            var _this = this;
            this.carTween = this.game.add.tween(this.carSprite).to({ x: 850 }, 100000, Phaser.Easing.Default, true, 0, 0, false);
            this.carTween.onComplete.add(function () {
                _this.currentState.win();
            });
        };
        gameEnergy.prototype.addEnergy = function (amount) {
            var _this = this;
            var total = 0;
            if ((this.energySprite.width + amount) >= 700) {
                total = 700;
            }
            else {
                total = this.energySprite.width + amount;
            }
            this.tween = this.game.add.tween(this.energySprite).to({ width: total }, 200, Phaser.Easing.Quadratic.Out, true, 0, 0, false);
            this.tween.onComplete.add(function () {
                if (_this.energySprite.width > 700)
                    _this.energySprite.width = 700;
            }, this);
        };
        gameEnergy.prototype.removeEnergy = function (amount) {
            //console.log(amount)
            var total = 0;
            if ((this.energySprite.width - amount) <= 0) {
                total = 0;
            }
            else {
                total = this.energySprite.width - amount;
            }
            if (total == 0) {
                this.energySprite.width = 0;
                this.signal.dispatch();
                this.carTween.stop();
            }
            else {
            }
            this.tween = this.game.add.tween(this.energySprite).to({ width: total }, 200, Phaser.Easing.Quadratic.Out, true, 0, 0, false);
        };
        return gameEnergy;
    }(Phaser.Sprite));
    k2016Game.gameEnergy = gameEnergy;
})(k2016Game || (k2016Game = {}));
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>
/// <reference path="../States/Game.ts"/>
var k2016Game;
(function (k2016Game) {
    var Explosion = (function (_super) {
        __extends(Explosion, _super);
        function Explosion(game, gameState, x, y, name, type) {
            var _this = _super.call(this, game, x, y, name) || this;
            _this.game = game;
            _this.gameState = gameState;
            // playSound(gameSound.explosion);
            _this.anchor.set(.5, 1);
            _this.scale.set(2);
            var anim = _this.animations.add('boom', null, 20, false).play();
            anim.onComplete.add(function () { this.kill(); this.destroy(); }, _this);
            game.add.existing(_this);
            return _this;
            /*
           if (type == "player") {

                if(!isMobile()){

               
                for (var i = 0; i < 5; i++) {

                    this.gameState.groupAll.add(new ExplosionPiece(this.game, this.gameState, x, y, "trash" + (i + 1), "enemy"));

                }
            }

                this.gameState.groupAll.add(new ExplosionPiece(this.game, this.gameState, x, y, "expDelucaArm", "player"));
                this.gameState.groupAll.add(new ExplosionPiece(this.game, this.gameState, x, y, "expDelucaArm", "player"));
                this.gameState.groupAll.add(new ExplosionPiece(this.game, this.gameState, x, y, "expDelucaBody", "player"));
                this.gameState.groupAll.add(new ExplosionPiece(this.game, this.gameState, x, y, "expDelucaHead", "player"));
                this.gameState.groupAll.add(new ExplosionPiece(this.game, this.gameState, x, y, "expDelucaLeg", "player"));
                this.gameState.groupAll.add(new ExplosionPiece(this.game, this.gameState, x, y, "expDelucaLeg", "player"));

                this.gameState.groupAll.add(new ExplosionPiece(this.game, this.gameState, x, y, "expDelucaShip1", "player"));
                this.gameState.groupAll.add(new ExplosionPiece(this.game, this.gameState, x, y, "expDelucaShip2", "player"));
                this.gameState.groupAll.add(new ExplosionPiece(this.game, this.gameState, x, y, "expDelucaShip2", "player"));
                this.gameState.groupAll.add(new ExplosionPiece(this.game, this.gameState, x, y, "expDelucaShip3", "player"));
                this.gameState.groupAll.add(new ExplosionPiece(this.game, this.gameState, x, y, "expDelucaShip4", "player"));



            }
*/
        }
        Explosion.prototype.update = function () {
            this.x -= this.gameState.back3;
        };
        return Explosion;
    }(Phaser.Sprite));
    k2016Game.Explosion = Explosion;
})(k2016Game || (k2016Game = {}));
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>
/// <reference path="../States/Game.ts"/>
var k2016Game;
(function (k2016Game) {
    var PlayerCar = (function (_super) {
        __extends(PlayerCar, _super);
        function PlayerCar(game, gameState) {
            var _this = _super.call(this, game, 120, 475, "playerEmpty") || this;
            _this.onGround = false;
            _this.lane = 1;
            _this.currentLane = 1;
            _this.started = false;
            _this.lanes = [425, 475, 535];
            _this.wAngle = 0;
            _this.car = _this.game.add.sprite(0, 0, "playerCar");
            _this.car.anchor.set(.5);
            _this.lane = 1;
            _this.currentLane = 1;
            _this.deluca = _this.game.add.sprite(8, -33, "playerDeluca");
            _this.deluca.anchor.set(.5);
            _this.deluca.scale.set(2);
            _this.deluca.frame = 2;
            //this.deluca.animations.add("run",[0,1,2,3,4,5],20,true);
            _this.game.add.tween(_this.deluca).to({ y: _this.deluca.y - 3 }, 200, Phaser.Easing.Quadratic.Out, true, 0, -1, true);
            _this.sirena = _this.game.add.sprite(-20, -40, "playerSirena");
            _this.sirena.anchor.set(.5);
            _this.sirena.frame = 0;
            _this.sirena.animations.add("run", [0, 1, 2, 3], 20, true);
            _this.game.add.tween(_this.sirena).to({ y: _this.sirena.y - 3.5 }, 200, Phaser.Easing.Quadratic.Out, true, 0, -1, true);
            _this.game.add.tween(_this.car).to({ y: _this.car.y - 3.5 }, 200, Phaser.Easing.Quadratic.Out, true, 0, -1, true);
            _this.wheels = [];
            _this.wheels.push(_this.game.add.sprite(-20, 25, "playerWheel"));
            _this.wheels.push(_this.game.add.sprite(45, 25, "playerWheel"));
            _this.wheels[0].anchor.set(.5);
            _this.wheels[1].anchor.set(.5);
            _this.addChild(_this.wheels[0]);
            _this.addChild(_this.wheels[1]);
            _this.addChild(_this.deluca);
            _this.addChild(_this.car);
            _this.addChild(_this.sirena);
            _this.gameState = gameState;
            _this.game.physics.arcade.enableBody(_this);
            _this.anchor.setTo(.5, 1);
            _this.alive = false;
            _this.onGround = false;
            _this.body.allowGravity = false;
            _this.body.collideWorldBounds = false;
            _this.body.setSize(30, 45, 140, 50);
            _this.animations.add('fly', [1, 2, 3, 4], 12, true);
            _this.animations.add('idle', [5, 6, 7, 8], 25, true);
            _this.events.onKilled.add(_this.onKilled, _this);
            _this.lane = 1;
            if (_this.game.device.touch && (_this.game.device.iOS || _this.game.device.android || _this.game.device.windowsPhone)) {
                _this.swipe = new Swipe(_this.game);
            }
            else {
                _this.cursors = _this.game.input.keyboard.createCursorKeys();
                _this.downButton = _this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
                _this.downButton.onDown.add(_this.goDown, _this);
                _this.upButton = _this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
                _this.upButton.onDown.add(_this.goUp, _this);
            }
            _this.game.add.existing(_this);
            return _this;
        }
        PlayerCar.prototype.start = function () {
            this.tweenAngle(0, 22, 500, 0);
            this.deluca.frame = 6;
            this.sirena.play("run");
            //this.deluca.play("run");
        };
        PlayerCar.prototype.gameOver = function () {
            this.alpha = 0;
            //this.kill();
            //this.destroy();
        };
        PlayerCar.prototype.update = function () {
            this.wheels[0].angle += this.wAngle;
            this.wheels[1].angle += this.wAngle;
            if (this.game.device.touch && (this.game.device.iOS || this.game.device.android || this.game.device.windowsPhone)) {
                var direction = this.swipe.check();
                if (direction !== null) {
                    // direction= { x: x, y: y, direction: direction }
                    switch (direction.direction) {
                        case this.swipe.DIRECTION_UP:
                            this.goUp();
                            break;
                        case this.swipe.DIRECTION_DOWN:
                            this.goDown();
                            break;
                    }
                }
            }
            // console.log(this.lane)
        };
        PlayerCar.prototype.goUp = function () {
            if (!this.started)
                return;
            //console.log("up")
            this.lane--;
            if (this.lane < 0)
                this.lane = 0;
            this.goToLane();
        };
        PlayerCar.prototype.goDown = function () {
            if (!this.started)
                return;
            //console.log("down")
            this.lane++;
            if (this.lane > 2)
                this.lane = 2;
            this.goToLane();
        };
        PlayerCar.prototype.goToLane = function () {
            if (this.currentLane == this.lane)
                return;
            this.currentLane = this.lane;
            // this.game.tweens.remove(this.carTween);
            this.carTween = this.game.add.tween(this).to({ y: this.lanes[this.lane] }, 100, Phaser.Easing.Quadratic.Out, true, 0, 0, false);
        };
        PlayerCar.prototype.onKilled = function () {
            // this.gameState.playerKilled();
        };
        ;
        PlayerCar.prototype.tweenAngle = function (start, end, duration, delay) {
            var _this = this;
            var _angle = { value: start, end: end };
            var _tweenA = this.game.add.tween(_angle).to({ value: _angle.end }, duration, Phaser.Easing.Quadratic.InOut, true, delay, 0, false);
            _tweenA.onComplete.add(function () { _this.started = true; });
            _tweenA.onUpdateCallback(function (tween) {
                _this.wAngle = _angle.value;
            });
        };
        return PlayerCar;
    }(Phaser.Sprite));
    k2016Game.PlayerCar = PlayerCar;
})(k2016Game || (k2016Game = {}));
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>
var k2016Game;
(function (k2016Game) {
    var Gamewin = (function (_super) {
        __extends(Gamewin, _super);
        function Gamewin() {
            var _this = _super.call(this) || this;
            _this.insulti = [
                "Personaggetto!",
                "Cafone!",
                "Consumatore abusivo di ossigeno!",
                "Imbecille!",
                "Imbecille e cafone!",
                "Personaggetto col sorrisetto!",
                "Cialtrone!",
                "Affannato mentale!",
                "Cialtroneria pura!",
                "Ti devono ammazzare!",
                "Sei peggio di Travaglio!",
                "Sei come GIGGINO o webmaster!",
                "La Bindi ti fa un baffo!",
                "Sei il congiuntivo di\nDi Battista!"
            ];
            return _this;
        }
        Gamewin.prototype.create = function () {
            //this.game.world.setBounds(0, 0, 1200, 600);
            //this.game.world.x=0;  
            this.game.add.tileSprite(0, 0, 1024, 800, "introSky");
            this.cloud1 = this.game.add.tileSprite(0, 0, 1024, 300, 'cloud1');
            this.cloud1.fixedToCamera = true;
            this.cloud2 = this.game.add.tileSprite(0, 0, 1024, 300, 'cloud2');
            this.cloud2.fixedToCamera = true;
            this.game.add.tileSprite(0, 298, 1024, 96, 'introRocks');
            this.game.add.tileSprite(0, 331, 1024, 109, 'street1');
            this.game.add.tileSprite(0, 440, 1024, 32, 'street2');
            this.game.add.tileSprite(0, 472, 1024, 53, 'street3');
            this.game.add.tileSprite(0, 523, 1024, 77, 'street4');
            var _podium = this.game.add.sprite(this.game.world.centerX + 50, this.game.world.centerY + 200, 'podium');
            _podium.anchor.set(.5);
            var _del = this.game.add.sprite(570, 390, 'delGameover');
            _del.anchor.set(.5);
            _del.frame = 3;
            this.game.add.tween(_del).to({ y: _del.y - 10 }, 400, Phaser.Easing.Quadratic.InOut, true, 0, -1, true);
            //_del.animations.add("cry",[2,0,1,0],5, true).play();
            var _win1 = this.game.add.sprite(480, 430, 'winners');
            _win1.anchor.set(.5);
            _win1.frame = this.game.rnd.integerInRange(0, 4);
            var _win2 = this.game.add.sprite(630, 440, 'winners');
            _win2.anchor.set(.5);
            _win2.frame = this.game.rnd.integerInRange(0, 4);
            this.game.add.sprite(this.game.world.centerX, this.game.world.centerY + 70, 'cup1');
            this.game.add.sprite(this.game.world.centerX - 70, this.game.world.centerY + 135, 'cup2');
            this.game.add.sprite(this.game.world.centerX + 120, this.game.world.centerY + 155, 'cup3');
            var _style = { font: 'normal 60px', fill: '#ffffff', stroke: '#000000', strokeThickness: 10 };
            var _gameOverText = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 130, 'YOU WIN!!', _style);
            _gameOverText.font = 'Press Start 2P';
            _gameOverText.anchor.set(0.5);
            var deluca = this.game.add.sprite(0, 600, 'delucaMenu');
            deluca.pivot.set(0, deluca.height);
            //btn Green
            this.btnGreen = this.game.add.sprite(900, 40, "btnGreen");
            this.btnGreen.anchor.setTo(0.5);
            _style = { font: 'normal 18px', fill: '#ffffff', stroke: '#368005', strokeThickness: 6 };
            var _spriteText = this.game.add.text(0, 4, 'PLAY', _style);
            _spriteText.font = 'Press Start 2P';
            _spriteText.anchor.set(0.5);
            this.btnGreen.addChild(_spriteText);
            this.btnGreen.inputEnabled = true;
            this.btnGreen.events.onInputDown.add(function () {
                k2016Game.stopSound(k2016Game.gameSound.win);
                k2016Game.setScore(0);
                k2016Game.goState("Game", this.game);
            }, this);
            //btn Blue
            /*    this.btnBlue = this.game.add.sprite(900, 90, "btnBlue");
                this.btnBlue.anchor.setTo(0.5);
                _style = { font: 'normal 18px', fill: '#ffffff', stroke: '#00577f', strokeThickness: 6 };
                var _spriteText = this.game.add.text(0, 4, 'SHARE', _style);
                _spriteText.font = 'Press Start 2P';
                _spriteText.anchor.set(0.5);
                this.btnBlue.addChild(_spriteText);
                this.btnBlue.inputEnabled = true;
                this.btnBlue.events.onInputDown.add(function () {
                   // getLoginStatus();
                }, this);
    
                */
            //btn Red
            this.btnRed = this.game.add.sprite(900, 100, "btnRed");
            this.btnRed.anchor.setTo(0.5);
            _style = { font: 'normal 18px', fill: '#ffffff', stroke: '#851600', strokeThickness: 6 };
            var _spriteText = this.game.add.text(0, 4, 'MENU', _style);
            _spriteText.font = 'Press Start 2P';
            _spriteText.anchor.set(0.5);
            this.btnRed.addChild(_spriteText);
            this.btnRed.inputEnabled = true;
            this.btnRed.events.onInputDown.add(function () {
                k2016Game.stopSound(k2016Game.gameSound.win);
                k2016Game.goState("Menu", this.game);
            }, this);
            k2016Game.playSound(k2016Game.gameSound.win);
            _style = { font: 'normal 25px', fill: '#ffffff', stroke: '#000000', strokeThickness: 5 };
            var _score = k2016Game.getScore();
            var numC = (_score.score / 100);
            var _text = "";
            _text = 'Hai arrotato ' + numC + ' cafoni!\n';
            _text = _text + "Personaggione!!!";
            var _gameOverSpeech = this.game.add.text(210, 250, _text, _style);
            _gameOverSpeech.font = 'Press Start 2P';
            var _anonymous = k2016Game.getUrlParameter("anonymous") ? true : false;
            if (!_anonymous) {
                k2016Game.saveScore();
            }
        };
        Gamewin.prototype.update = function () {
            this.cloud1.tilePosition.x -= 0.3;
            this.cloud2.tilePosition.x -= 0.1;
        };
        return Gamewin;
    }(Phaser.State));
    k2016Game.Gamewin = Gamewin;
})(k2016Game || (k2016Game = {}));
